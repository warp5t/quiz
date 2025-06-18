import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WinAnimation.module.css';
import { WinAnimationProps } from './WinAnimationType';

export const WinAnimation: React.FC<WinAnimationProps> = ({ isVisible, setIsVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.winAnimation}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <motion.div
            className={styles.winAnimation_content}
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
            transition={{ duration: 0.8 }}
          >
            🎉 Right answer! 🎉
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
