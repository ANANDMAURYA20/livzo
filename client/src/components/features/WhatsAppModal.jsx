import { useState } from 'react';
import { Copy, RefreshCw, MessageCircle, Check, Sparkles } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { aiService } from '../../services/aiService';
import toast from 'react-hot-toast';

const WhatsAppModal = ({ isOpen, onClose, inquiry }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const data = await aiService.generateWhatsApp({
        name: inquiry?.name,
        branch: inquiry?.branch,
        visitDate: inquiry?.visitDate,
        budget: inquiry?.budget,
        mobile: inquiry?.mobile,
        status: inquiry?.status,
      });
      setMessage(data.message);
      setIsAI(data.isAI);
      setGenerated(true);
    } catch (err) {
      toast.error('Failed to generate message');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppOpen = () => {
    const phone = inquiry?.mobile?.replace(/\D/g, '');
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleClose = () => {
    setMessage('');
    setGenerated(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Generate WhatsApp Message" size="md">
      <div className="space-y-4">
        {/* Inquiry Info */}
        <div className="bg-panel rounded-btn p-3 border border-white/[0.06]">
          <div className="grid grid-cols-2 gap-y-1.5 text-xs">
            <span className="text-text-muted">Customer</span>
            <span className="text-text-primary font-medium">{inquiry?.name}</span>
            <span className="text-text-muted">Branch</span>
            <span className="text-text-primary">{inquiry?.branch}</span>
            <span className="text-text-muted">Mobile</span>
            <span className="text-text-primary">{inquiry?.mobile}</span>
            <span className="text-text-muted">Budget</span>
            <span className="text-text-primary">
              {inquiry?.budget ? `₹${Number(inquiry.budget).toLocaleString('en-IN')}` : '—'}
            </span>
          </div>
        </div>

        {/* Generated Message */}
        {generated ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="vf-label mb-0 flex items-center gap-1.5">
                {isAI ? (
                  <>
                    <Sparkles size={11} className="text-accent" />
                    AI Generated Message
                  </>
                ) : (
                  'Generated Message'
                )}
              </label>
              {!isAI && (
                <span className="text-xs text-text-muted">(No OpenAI key — template used)</span>
              )}
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="vf-input resize-none text-sm leading-relaxed"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center py-6 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <MessageCircle size={22} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Generate a follow-up message</p>
              <p className="text-xs text-text-muted mt-1">
                Powered by AI — personalized for this inquiry
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {!generated ? (
            <Button
              variant="accent"
              className="flex-1"
              onClick={generate}
              loading={loading}
              icon={Sparkles}
            >
              Generate Message
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={generate}
                loading={loading}
                icon={RefreshCw}
              >
                Regenerate
              </Button>
              <Button
                variant="secondary"
                onClick={handleCopy}
                icon={copied ? Check : Copy}
                className={copied ? 'text-success border-success/20' : ''}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleWhatsAppOpen}
                icon={MessageCircle}
              >
                Open WhatsApp
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WhatsAppModal;
