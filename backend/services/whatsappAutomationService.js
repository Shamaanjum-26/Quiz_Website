// WhatsApp Automation Service for Hadescore Assessment Platform
// Automatically sends WhatsApp invitations to candidates who completed a quiz but have NOT registered for the bootcamp yet.

const { supabaseFetch } = require('../lib/supabaseAdmin');

const DEFAULT_WHATSAPP_TEMPLATE = `Hi {{Candidate_Name}} 👋

Great job completing the quiz! 🎯

You’ve taken the first step toward building your skills. Now it’s time to take the next one — *join our {{quiz taken domain_Name}} Bootcamp* 🚀

In the bootcamp, you’ll get:
✅ Practical, hands-on learning
✅ Guidance from experienced mentors
✅ Real-world projects & activities
✅ An opportunity to strengthen your career skills

📅 *Bootcamp:* {{quiz_taken_domain_Name}}
🗓️ *Start Date:* {{Start_Date}}
⏰ *Time:* {{Time}}

Your quiz is complete, but *your bootcamp journey hasn’t started yet!*

👉 *Register now:* {{Registration_Link}}

Don’t miss the opportunity to take your learning to the next level. 🚀

*Secure your spot today!*
Hadescore Team`;

let automationConfig = {
  enabled: true,
  autoRemindIntervalMins: 15,
  lastRunAt: null,
  totalSent: 0,
  defaultStartDate: '',
  defaultTime: '7:00 PM - 9:00 PM IST',
  customTemplate: DEFAULT_WHATSAPP_TEMPLATE
};

/**
 * Compute the next upcoming cohort date (e.g. upcoming Saturday)
 */
function getUpcomingCohortDate() {
  const d = new Date();
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Format 10-digit Indian mobile number to international format (91...)
 */
function formatMobileNumber(mobile) {
  if (!mobile) return null;
  const cleaned = String(mobile).replace(/\D/g, '');
  if (cleaned.length === 10) return `91${cleaned}`;
  if (cleaned.length === 12 && cleaned.startsWith('91')) return cleaned;
  return cleaned;
}

/**
 * Render the official WhatsApp invitation template with candidate & domain details
 */
function renderWhatsAppMessage(student, domainName, options = {}) {
  const candidateName = (student && student.full_name) ? student.full_name.trim() : 'Candidate';
  const domain = domainName || 'Technology';
  const startDate = options.startDate || automationConfig.defaultStartDate || getUpcomingCohortDate();
  const time = options.time || automationConfig.defaultTime || '7:00 PM - 9:00 PM IST';
  const publicAppUrl = process.env.PUBLIC_APP_URL || 'http://localhost:5173';
  const regLink = options.registrationLink || `${publicAppUrl}/bootcamp/register?studentId=${student?.id || ''}&domain=${encodeURIComponent(domain)}`;

  const template = options.customTemplate || automationConfig.customTemplate || DEFAULT_WHATSAPP_TEMPLATE;

  // Interpolate placeholders supporting both user-specified syntax and standard aliases
  let message = template
    .replace(/\{\{\s*Candidate_Name\s*\}\}/gi, candidateName)
    .replace(/\{\{\s*name\s*\}\}/gi, candidateName)
    .replace(/\{\{\s*quiz taken domain_Name\s*\}\}/gi, domain)
    .replace(/\{\{\s*quiz_taken_domain_Name\s*\}\}/gi, domain)
    .replace(/\{\{\s*domain\s*\}\}/gi, domain)
    .replace(/\{\{\s*Start_Date\s*\}\}/gi, startDate)
    .replace(/\{\{\s*startDate\s*\}\}/gi, startDate)
    .replace(/\{\{\s*Time\s*\}\}/gi, time)
    .replace(/\{\{\s*time\s*\}\}/gi, time)
    .replace(/\{\{\s*Registration_Link\s*\}\}/gi, regLink)
    .replace(/\{\{\s*bootcampUrl\s*\}\}/gi, regLink);

  // Convert markdown double asterisks **bold** to WhatsApp's native *bold* if present
  message = message.replace(/\*\*(.*?)\*\*/g, '*$1*');

  return message;
}

/**
 * Dispatch automated WhatsApp message
 * Supports WhatsApp Cloud API / Webhook if configured, or direct simulation logging.
 */
async function sendWhatsAppMessage(mobile, messageText) {
  const formattedPhone = formatMobileNumber(mobile);
  if (!formattedPhone) {
    throw new Error(`Invalid mobile number format: ${mobile}`);
  }

  console.log(`\n======================================================`);
  console.log(`[WhatsApp Automation] 📲 Sending WhatsApp to +${formattedPhone}:`);
  console.log(`------------------------------------------------------`);
  console.log(messageText);
  console.log(`======================================================\n`);

  // If Meta WhatsApp Cloud API / Gateway is configured
  const waApiUrl = process.env.WHATSAPP_API_URL;
  const waToken = process.env.WHATSAPP_API_TOKEN;

  if (waApiUrl && waToken) {
    try {
      const response = await fetch(waApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${waToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: formattedPhone,
          type: 'text',
          text: { body: messageText }
        })
      });
      console.log(`[WhatsApp Automation] Delivered to +${formattedPhone} via WhatsApp Gateway. Status: ${response.status}`);
    } catch (apiErr) {
      console.warn(`[WhatsApp Automation] Gateway delivery warning: ${apiErr.message}`);
    }
  }

  return { delivered: true, recipient: formattedPhone, message: messageText };
}

/**
 * Scan candidates who completed assessment but have NOT registered for the bootcamp,
 * and automatically deliver enrollment invitations.
 */
async function processUnenrolledBootcampStudents(options = {}) {
  try {
    // 1. Fetch leads where has_registered_bootcamp is false
    let query = 'leads?has_registered_bootcamp=eq.false&select=id,student_id,has_completed_quiz,has_registered_bootcamp,lead_score,last_activity_at';
    if (options.studentId) {
      query += `&student_id=eq.${options.studentId}`;
    }

    const leads = await supabaseFetch(query);
    if (!Array.isArray(leads) || leads.length === 0) {
      return { success: true, sentCount: 0, message: 'No unenrolled candidates found.' };
    }

    const studentIds = leads.map(l => l.student_id).filter(Boolean);
    if (studentIds.length === 0) return { success: true, sentCount: 0, message: 'No valid students found.' };

    // 2. Fetch student details (name, mobile, domain)
    const students = await supabaseFetch(`students?id=in.(${studentIds.join(',')})&select=id,full_name,mobile,preferred_domain_id`);
    const domains = await supabaseFetch('domains?select=id,name');

    const domainMap = {};
    (domains || []).forEach(d => { domainMap[d.id] = d.name; });

    // 3. Fetch past WhatsApp activities within last 24h to prevent repetitive spamming
    const recentSentSet = new Set();
    try {
      const pastActivities = await supabaseFetch('lead_activities?activity_type=eq.whatsapp_sent&select=student_id,created_at&order=created_at.desc&limit=200');
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
      (pastActivities || []).forEach(act => {
        if (new Date(act.created_at).getTime() > twentyFourHoursAgo) {
          recentSentSet.add(act.student_id);
        }
      });
    } catch (actErr) {
      console.warn('[WhatsApp Automation] Activity check note:', actErr.message);
    }

    const sentResults = [];

    for (const student of (students || [])) {
      if (!student.mobile) continue;

      // Avoid spamming if sent within 24h unless force flag or specific studentId is passed
      if (!options.force && !options.studentId && recentSentSet.has(student.id)) {
        continue;
      }

      const domainName = domainMap[student.preferred_domain_id] || options.domainName || 'Technology';
      const messageText = renderWhatsAppMessage(student, domainName, options);

      // Dispatch WhatsApp message
      await sendWhatsAppMessage(student.mobile, messageText);

      // Record activity in DB
      try {
        await supabaseFetch('lead_activities', {
          method: 'POST',
          body: [{
            student_id: student.id,
            activity_type: 'whatsapp_sent',
            score_change: 5,
            activity_data: {
              type: 'bootcamp_enrollment_auto_invite',
              domain: domainName,
              recipient: student.mobile,
              message_preview: messageText.slice(0, 120),
              sent_at: new Date().toISOString()
            }
          }]
        });
      } catch (logErr) {
        console.warn('[WhatsApp Automation] Activity log note:', logErr.message);
      }

      sentResults.push({
        studentId: student.id,
        name: student.full_name,
        mobile: student.mobile,
        domain: domainName
      });
    }

    automationConfig.lastRunAt = new Date().toISOString();
    automationConfig.totalSent += sentResults.length;

    return {
      success: true,
      sentCount: sentResults.length,
      recipients: sentResults,
      timestamp: automationConfig.lastRunAt
    };
  } catch (err) {
    console.error('[WhatsApp Automation Error]:', err.message);
    throw err;
  }
}

module.exports = {
  getAutomationConfig: () => ({ ...automationConfig }),
  updateAutomationConfig: (updates) => {
    automationConfig = { ...automationConfig, ...updates };
    return automationConfig;
  },
  processUnenrolledBootcampStudents,
  sendWhatsAppMessage,
  renderWhatsAppMessage,
  formatMobileNumber,
  DEFAULT_WHATSAPP_TEMPLATE
};
