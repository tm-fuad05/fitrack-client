export const parentContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

export const cardNode = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
