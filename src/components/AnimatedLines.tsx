import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLines = () => {
  return (
    <div className="absolute top-0 left-0 w-full">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-[2px] bg-white/30 mb-4 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: [0, 1, 1, 0],
            x: ["0%", "0%", "100%", "100%"]
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedLines;