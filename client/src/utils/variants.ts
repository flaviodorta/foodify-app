import { Variants } from 'framer-motion';

const modal: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    translateX: '-50%',
    translateY: '-50%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateX: '-50%',
    translateY: '-50%',
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    translateX: '-50%',
    translateY: '-50%',
  },
};

export const variants = {
  modal,
};
