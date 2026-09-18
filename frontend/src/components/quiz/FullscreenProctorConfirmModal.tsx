import React from 'react';
import { Maximize2, CheckCircle2, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullscreenProctorConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  domainName: string;
  isLoading?: boolean;
}

export const FullscreenProctorConfirmModal: React.FC<FullscreenProctorConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  domainName,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    // Request camera and microphone immediately on user click gesture
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let stream: MediaStream | null = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
            audio: true,
          });
        } catch (audioErr) {
          console.warn('Audio+Video request failed, trying video only:', audioErr);
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
            audio: false,
          });
        }
        if (stream) {
          (window as any).__prewarmedProctorStream = stream;
        }
      }
    } catch (err) {
      console.warn('Initial proctor permission notice:', err);
    }

    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Maximize2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              Confirm Full Screen & Proctoring
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {domainName} Assessment
            </p>
          </div>
        </div>

        {/* Simple clean points */}
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <span>The quiz will run in <strong>full screen mode</strong>.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <span><strong>Camera & microphone proctoring</strong> will be ON during the quiz.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <span>Proctoring and full screen <strong>automatically turn OFF</strong> when you submit.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer gap-1.5"
            id="confirm-fullscreen-proctor-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting...
              </>
            ) : (
              'Confirm & Start'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
