import React, { useState } from "react";
import { X, Calendar, Clock, Sparkles, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookCallDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookCallDialog({ isOpen, onClose }: BookCallDialogProps) {
  const [step, setStep] = useState(1);
  const wd = typeof window !== 'undefined' ? window.wpData : undefined;
  const bf = wd?.bookingForm;
  const dates = bf?.dates ?? [
    { value: "2026-05-25", display: "Mon, May 25" },
    { value: "2026-05-26", display: "Tue, May 26" },
    { value: "2026-05-27", display: "Wed, May 27" },
    { value: "2026-05-28", display: "Thu, May 28" },
  ];
  const times = bf?.times ?? ["10:00 UTC", "13:00 UTC", "15:00 UTC", "17:00 UTC", "20:00 UTC"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    tier: "growth",
    challenge: "",
    selectedDate: dates[0]?.value ?? "2026-05-25",
    selectedTime: times[0] ?? "15:00 UTC"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const restUrl = wd?.restUrl || '';
      const nonce   = wd?.nonce || '';
      const response = await fetch(`${restUrl}brandjo/v1/book-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          tier: formData.tier,
          challenge: formData.challenge,
          date: formData.selectedDate,
          time: formData.selectedTime,
        }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking submission failed:', err);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* dialog container */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-panel-heavy p-6 md:p-8 text-left shadow-2xl z-10">
        
        {/* Glow lighting decorative elements */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-brand-purple/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-brand-glow/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 relative">
          <div>
            <h3 className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-purple" />
              Secure Strategy Session
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Free 30-minute cinematic growth audit with Brandjo Directors</p>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content steps */}
        <div className="relative">
          {step === 1 && (
            <div>
              <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
                We design attention engines for high-caliber companies. Fill in minor details to customize our diagnostic framework for your session.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1">Select A Custom Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    {dates.map((date) => (
                      <button
                        key={date.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, selectedDate: date.value }))}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                          formData.selectedDate === date.value
                            ? "bg-brand-purple/20 border-brand-purple text-white shadow-lg shadow-brand-purple/10"
                            : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {date.display}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1">Select Preferred Time slot (UTC)</label>
                  <div className="flex flex-wrap gap-1.5">
                    {times.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, selectedTime: slot }))}
                        className={`py-1.5 px-3 text-xs rounded-full border transition-all ${
                          formData.selectedTime === slot
                            ? "bg-brand-purple border-brand-purple text-white font-medium"
                            : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-brand-purple hover:bg-brand-purple/90 text-white font-medium text-sm transition-all shadow-md shadow-brand-purple/40 hover:shadow-brand-purple/60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Enter Brand Details
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">Your Name</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email-input" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">Work Email</label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    placeholder="elena@synthetix.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="website-input" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">Brand Website</label>
                  <input
                    id="website-input"
                    type="url"
                    name="website"
                    required
                    placeholder="https://synthetix.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="tier-select" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">Target Budget tier</label>
                  <select
                    id="tier-select"
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-brand-purple transition-all appearance-none"
                  >
                    <option value="starter" className="bg-zinc-900 text-white">Starter ($4.5k / mo)</option>
                    <option value="growth" className="bg-zinc-900 text-white">Growth ($8.5k / mo)</option>
                    <option value="dominance" className="bg-zinc-900 text-white">Dominance ($15k / mo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="challenge-input" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5">What is your absolute biggest content bottleneck?</label>
                <textarea
                  id="challenge-input"
                  name="challenge"
                  rows={2}
                  placeholder="e.g. Editing quality feels average; we lack viral storylines or authentic authority."
                  value={formData.challenge}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-white/10 text-white hover:bg-white/5 rounded-lg text-sm transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-brand-purple hover:bg-brand-purple/90 text-white font-medium text-sm transition-all shadow-md shadow-brand-purple/40 hover:shadow-brand-purple/60 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Securing Slot...
                    </>
                  ) : (
                    <>
                      Confirm Integration Consultation
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-display font-medium text-white tracking-tight mb-2">
                Session Secured & Slot Allocated!
              </h4>
              <p className="text-sm text-zinc-300 max-w-sm mx-auto mb-6">
                Excellent, <span className="text-brand-glow font-bold">{formData.name}</span>. We've locked in your strategy audit for <span className="text-white font-semibold">{formData.selectedDate}</span> at <span className="text-white font-semibold">{formData.selectedTime}</span>.
              </p>

              <div className="glass-panel p-4 rounded-xl text-left text-xs text-zinc-400 space-y-2 mb-6">
                <div>
                  <span className="text-white font-semibold">Agenda:</span> Complete creative teardown, competitors organic loophole analysis, and a 3-concept dynamic storyboard blueprint.
                </div>
                <div>
                  <span className="text-white font-semibold">Video Link:</span> A personal luxury video link has been dispatched to <span className="text-white">{formData.email}</span>.
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full px-5 py-2.5 rounded-lg border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all text-center cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
