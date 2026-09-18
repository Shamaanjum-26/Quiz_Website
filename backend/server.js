// Hadescore PVT LTD Local Backend Server
// Zero-Docker, Native Node.js HTTP Server with Gemini AI Quiz Engine

const http = require('http');
const https = require('https');
const quizEngine = require('./services/quizEngineService');
const whatsappAutomation = require('./services/whatsappAutomationService');
const { SUPABASE_URL, SUPABASE_KEY } = require('./lib/supabaseAdmin');

const PORT = process.env.PORT || 5000;

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Cap at 2MB payload
      if (body.length > 2 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  log(`${req.method} ${pathname}`);

  try {
    // ── Health Check ───────────────────────────────────────────
    if (pathname === '/' || pathname === '/health') {
      return sendJson(res, 200, {
        status: 'online',
        message: 'Hadescore SkillProbe Quiz Engine Service is Active',
        project: 'SkillProbe (ap-south-1)',
        supabaseUrl: SUPABASE_URL,
        geminiConfigured: !!(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
        timestamp: new Date().toISOString()
      });
    }

    // ── Supabase DB Status ─────────────────────────────────────
    if (pathname === '/api/status') {
      const checkUrl = `${SUPABASE_URL}/rest/v1/domains?select=id,name`;
      const clientReq = https.get(checkUrl, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }, (upstreamRes) => {
        let data = '';
        upstreamRes.on('data', chunk => data += chunk);
        upstreamRes.on('end', () => {
          try {
            const domains = JSON.parse(data);
            return sendJson(res, 200, {
              database: 'connected',
              activeDomains: Array.isArray(domains) ? domains.length : 0,
              domains
            });
          } catch {
            return sendJson(res, 200, { database: 'connected', raw: data });
          }
        });
      });

      clientReq.on('error', (err) => {
        return sendJson(res, 500, { database: 'error', error: err.message });
      });
      return;
    }

    // ── Quiz Configurations ────────────────────────────────────
    if (pathname === '/api/quiz/config') {
      if (req.method === 'GET') {
        const config = await quizEngine.getQuizConfig();
        // Mask API key for security (show only last 4 chars)
        const maskedKey = config.gemini_api_key
          ? `••••••••••••${config.gemini_api_key.slice(-4)}`
          : '';
        return sendJson(res, 200, { ...config, gemini_api_key_masked: maskedKey });
      }
      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const updated = await quizEngine.updateQuizConfig(body);
        return sendJson(res, 200, { success: true, config: updated });
      }
    }

    // ── Domain Question Bank Statistics ────────────────────────
    if (pathname === '/api/quiz/domain-stats' && req.method === 'GET') {
      const stats = await quizEngine.getDomainBankStats();
      return sendJson(res, 200, { success: true, stats });
    }

    // ── Generate Question Bank via Gemini API ───────────────────
    if (pathname === '/api/quiz/generate-bank' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const { domainId, domainName, apiKey } = body;

      if (!domainId) {
        return sendJson(res, 400, { error: 'domainId is required' });
      }

      log(`Triggered Question Bank generation for domain: ${domainName || domainId}`);
      const result = await quizEngine.generateAndStoreDomainBank(domainId, domainName, apiKey);
      return sendJson(res, 200, result);
    }

    // ── Start Quiz Attempt (Randomized, Shuffled, is_correct stripped)
    if (pathname === '/api/quiz/start' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const { studentId, domainId } = body;

      if (!studentId || !domainId) {
        return sendJson(res, 400, { error: 'studentId and domainId are required' });
      }

      const session = await quizEngine.startQuizAttempt(studentId, domainId);
      return sendJson(res, 200, { success: true, ...session });
    }

    // ── Submit Quiz Attempt (Strict Server-Side Grading) ────────
    if (pathname === '/api/quiz/submit' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const { attemptId, studentId, answers } = body;

      if (!attemptId || !studentId) {
        return sendJson(res, 400, { error: 'attemptId and studentId are required' });
      }

      const gradedResult = await quizEngine.submitQuizAttempt(attemptId, studentId, answers || {});
      return sendJson(res, 200, { success: true, result: gradedResult });
    }

    // ── WhatsApp Automation: Status & Unenrolled Counts ────────
    if (pathname === '/api/automation/whatsapp/status' && req.method === 'GET') {
      const config = whatsappAutomation.getAutomationConfig();
      let unenrolledCount = 0;
      try {
        const unenrolled = await require('./lib/supabaseAdmin').supabaseFetch('leads?has_registered_bootcamp=eq.false&select=id');
        unenrolledCount = Array.isArray(unenrolled) ? unenrolled.length : 0;
      } catch {}
      return sendJson(res, 200, {
        success: true,
        ...config,
        unenrolledCandidateCount: unenrolledCount
      });
    }

    // ── WhatsApp Automation: Trigger Auto-Reminders to Unenrolled ──
    if (pathname === '/api/automation/whatsapp/trigger' && req.method === 'POST') {
      const body = await parseJsonBody(req).catch(() => ({}));
      log('Triggering automated WhatsApp reminders for unenrolled bootcamp candidates...', body);
      const result = await whatsappAutomation.processUnenrolledBootcampStudents({
        force: body.force !== undefined ? body.force : true,
        studentId: body.studentId,
        startDate: body.startDate,
        time: body.time,
        domainName: body.domainName,
        customTemplate: body.customTemplate
      });
      return sendJson(res, 200, result);
    }

    // ── WhatsApp Automation: Update Configuration & Template ───
    if (pathname === '/api/automation/whatsapp/config' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const updated = whatsappAutomation.updateAutomationConfig(body);
      return sendJson(res, 200, { success: true, config: updated });
    }

    // ── 404 Catch-All ──────────────────────────────────────────
    sendJson(res, 404, { error: `Endpoint '${pathname}' not found` });
  } catch (error) {
    log(`[Error] ${req.method} ${pathname}: ${error.message}`);
    sendJson(res, 500, { error: error.message || 'Internal Server Error' });
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = Number(PORT) + 1;
    console.log(`⚠️  Port ${PORT} is in use. Trying port ${nextPort}...`);
    server.listen(nextPort);
  } else {
    console.error('Server error:', err.message);
  }
});

// ── Scheduled Background Domain Auto-Refill & WhatsApp Outreach Job ──
function initBackgroundAutoRefill() {
  const CHECK_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

  async function runBackgroundAutomations() {
    try {
      // 1. Question Bank Health Check & Auto-Refill
      log('Running scheduled background domain health & question bank check...');
      const stats = await quizEngine.getDomainBankStats();
      if (Array.isArray(stats) && stats.length > 0) {
        for (const d of stats) {
          if (d.total < 30) {
            log(`Domain "${d.domainName}" has ${d.total}/30 questions. Initiating background auto-refill...`);
            try {
              await quizEngine.generateAndStoreDomainBank(d.domainId, d.domainName);
              log(`Successfully auto-refilled question bank for "${d.domainName}".`);
            } catch (err) {
              log(`[Auto-Refill Note] Domain "${d.domainName}": ${err.message}`);
            }
          }
        }
      }

      // 2. WhatsApp Auto-Reminders for Unenrolled Bootcamp Students
      try {
        log('Checking for unenrolled bootcamp candidates to deliver automated WhatsApp invitations...');
        const waResult = await whatsappAutomation.processUnenrolledBootcampStudents();
        if (waResult.sentCount > 0) {
          log(`Delivered automated WhatsApp invitations to ${waResult.sentCount} unenrolled candidates.`);
        }
      } catch (waErr) {
        log(`[WhatsApp Automation Note] ${waErr.message}`);
      }
    } catch (err) {
      log(`[Background Task Error] ${err.message}`);
    }
  }

  // Initial check after 10s of server boot, then repeat every 15m
  setTimeout(runBackgroundAutomations, 10000);
  setInterval(runBackgroundAutomations, CHECK_INTERVAL_MS);
}

server.listen(PORT, '0.0.0.0', () => {
  const currentPort = server.address().port;
  console.log('\n============================================================');
  console.log('🚀  HADESCORE PVT LTD BACKEND SERVER IS RUNNING');
  console.log(`📡  Local URL:              http://localhost:${currentPort}`);
  console.log(`📱  Network URL:            http://0.0.0.0:${currentPort}`);
  console.log(`💓  Health Check:           http://localhost:${currentPort}/health`);
  console.log(`🧠  Gemini Question Gen:    http://localhost:${currentPort}/api/quiz/generate-bank`);
  console.log(`🎲  Quiz Engine Start:      http://localhost:${currentPort}/api/quiz/start`);
  console.log(`📊  Server-Side Submit:     http://localhost:${currentPort}/api/quiz/submit`);
  console.log(`☁️   Supabase Cloud:         ${SUPABASE_URL}`);
  console.log('============================================================\n');

  // Start background auto-refill
  initBackgroundAutoRefill();
});
