document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const progress = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = range > 0 ? window.scrollY / range : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });

const navLinks = [...document.querySelectorAll('.home-header nav a')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5] });
  sections.forEach((section) => navObserver.observe(section));
}

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.project-art').forEach((art) => {
    art.addEventListener('pointermove', (event) => {
      const rect = art.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 10;
      art.style.setProperty('--shift-x', `${x}px`);
      art.style.setProperty('--shift-y', `${y}px`);
    });
    art.addEventListener('pointerleave', () => {
      art.style.setProperty('--shift-x', '0px');
      art.style.setProperty('--shift-y', '0px');
    });
  });
}
