import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const payload = formData.get('payload');
    
    setStatus('sending');

    const access_key = import.meta.env.VITE_CONTACT_KEY;
    
    if (!access_key) {
      console.error("VITE_CONTACT_KEY environment variable is missing!");
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: access_key,
          name: name,
          email: email,
          message: payload,
          subject: `New Project Brief from ${name}`,
        }),
      });

      if (response.ok) {
        setStatus('sent');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } else {
        console.error("Form submission failed");
        setStatus('idle');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('idle');
    }
  };

  return (
    <section aria-label="Contact" id="contact" className="w-full flex flex-col md:flex-row border-b border-[#fefefe] bg-[#111111] relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[100] bg-[#fefefe] text-[#111111] px-6 py-3 font-mono text-[13px] font-bold uppercase tracking-widest border border-transparent shadow shadow-[#fefefe]/20 pointer-events-none rounded-[4px] flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse"></span>
            Transmission Successful
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-24 border-b md:border-b-0 md:border-r border-[#fefefe] flex flex-col justify-center">
        <div className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-8 md:mb-auto">
          // Connection_Protocol
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase leading-[1.1] mb-6">
          Initiate<br />Sequence
        </h2>
        <div className="font-mono text-[13px] opacity-70 flex flex-col gap-2 mt-auto pt-12">
          <p>{">"} System standing by.</p>
          <p>{">"} Awaiting project parameters.</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-24 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div 
              key="sent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center font-mono text-[13px] opacity-80 h-full w-full"
            >
              <span className="system-dot mb-6"></span>
              <p>{`> Transmitting data...`}</p>
              <p>{`> Signal received. Communication established.`}</p>
              <p>{`> Default mail client triggered.`}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-2 border border-[#fefefe] rounded-[4px] font-bold uppercase tracking-widest hover:bg-[#fefefe] hover:text-[#111111] transition-colors"
              >
                Reset Sequence
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-10 w-full" 
              onSubmit={handleSubmit}
            >
              <div className="w-full border-b border-[#fefefe]">
                <input 
                  type="text" 
                  name="name"
                  required 
                  placeholder="NAME // CALL SIGN"
                  className="w-full bg-transparent py-3 outline-none font-bold uppercase tracking-widest text-sm placeholder:text-[#fefefe]/30 focus:placeholder:text-transparent transition-all"
                />
              </div>
              <div className="w-full border-b border-[#fefefe]">
                <input 
                  type="email" 
                  name="email"
                  required 
                  placeholder="COMMS // EMAIL"
                  className="w-full bg-transparent py-3 outline-none font-bold uppercase tracking-widest text-sm placeholder:text-[#fefefe]/30 focus:placeholder:text-transparent transition-all"
                />
              </div>
              <div className="w-full border-b border-[#fefefe]">
                <textarea 
                  name="payload"
                  required 
                  placeholder="PAYLOAD // PROJECT DETAILS"
                  rows={3}
                  className="w-full bg-transparent py-3 outline-none font-bold uppercase tracking-widest text-sm placeholder:text-[#fefefe]/30 focus:placeholder:text-transparent transition-all resize-none"
                ></textarea>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="bg-[#fefefe] text-[#111111] rounded-[4px] border border-transparent px-8 py-3 font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors text-xs w-full disabled:opacity-50"
                >
                  {status === 'sending' ? 'Transmitting...' : 'Send Transmission'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
