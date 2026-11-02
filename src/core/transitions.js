export function createTransitions(element) {
  if (!element) {
    return { fadeIn: () => {} };
  }

  const fadeIn = (duration = 1200) => {
    element.style.transitionDuration = duration + 'ms';
    element.style.opacity = '0';
  };

  return { fadeIn };
}