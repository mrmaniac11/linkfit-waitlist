import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLines from './AnimatedLines';

const sentences = [
  "Transform your Instagram influence into a profitable business venture today",
  "Create and curate stunning collections from your favorite luxury fashion brands",
  "Share your personally curated style directly through Instagram reels and posts",
  "Earn substantial commission from every purchase through your generated links"
];

const ValueProposition = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <AnimatedLines />
      <div className="space-y-8 mt-20">
        {sentences.map((sentence, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex items-start space-x-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3 }}
              className="flex-shrink-0 w-3 h-3 mt-1.5 bg-white rounded-full"
            />
            <span className="text-white text-lg font-medium leading-relaxed">
              {sentence}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ValueProposition;