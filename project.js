document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

const progress = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = range > 0 ? window.scrollY / range : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
