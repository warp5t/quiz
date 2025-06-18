import { motion } from 'framer-motion';
import styles from './Confetti.module.css';

export const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 10 + 5}px`,
    rotate: Math.random() * 360,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 1,
    borderRadius: Math.random() > 0.5 ? '50%' : '0',
  }));

  return (
    <div className={styles.container}>
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            y: -50,
            x: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: [0, window.innerHeight],
            x: [0, (Math.random() - 0.5) * 200],
            opacity: [1, 0],
            rotate: piece.rotate,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeOut',
          }}
          className={styles.piece}
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.borderRadius,
          }}
        />
      ))}
    </div>
  );
};
