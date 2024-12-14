import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, AlertCircle } from 'lucide-react';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [errors, setErrors] = useState<{ email?: string; instagram?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInstagramId = (id: string) => {
    return id.trim().length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; instagram?: string } = {};

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Instagram ID
    if (!instagramId) {
      newErrors.instagram = 'Instagram handle is required';
    } else if (!validateInstagramId(instagramId)) {
      newErrors.instagram = 'Please enter a valid Instagram handle';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await fetch('https://linkfit.app/api/waitlist/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, instagramId }),
      });
      setSubmitSuccess(true);
      // Reset form
      setEmail('');
      setInstagramId('');
    } catch (error) {
      setErrors({ email: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (error?: string) => `
    w-full px-4 py-3 rounded-lg border 
    ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'} 
    focus:ring-2 focus:border-transparent transition-all
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join the Waitlist</h2>
        <p className="text-gray-600">Be among the first creators to monetize your fashion influence</p>
      </div>

      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg"
          >
            Thanks for joining! We'll be in touch soon.
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: undefined });
            }}
            className={inputClasses(errors.email)}
            placeholder="your@email.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-center text-sm text-red-600"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
            Instagram Handle
          </label>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="instagram"
              value={instagramId}
              onChange={(e) => {
                setInstagramId(e.target.value);
                setErrors({ ...errors, instagram: undefined });
              }}
              className={`pl-10 pr-4 ${inputClasses(errors.instagram)}`}
              placeholder="@yourusername"
            />
          </div>
          <AnimatePresence>
            {errors.instagram && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-center text-sm text-red-600"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.instagram}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Join Waitlist'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default WaitlistForm;