// Fill the available mobile width with each name, preserving desktop typography.
(() => {
  const heading = document.querySelector('.hero-heading h1');
  if (!heading) return;

  const lines = heading.querySelectorAll('.hero-name-line');
  const mobile = window.matchMedia('(max-width: 767.98px)');

  function fitName() {
    lines.forEach(line => line.style.removeProperty('font-size'));
    if (!mobile.matches || !heading.clientWidth) return;

    lines.forEach(line => {
      line.style.fontSize = '100px';
      const measuredWidth = line.getBoundingClientRect().width;
      if (measuredWidth > 0) {
        line.style.fontSize = `${100 * (heading.clientWidth - 1) / measuredWidth}px`;
      }
    });
  }

  fitName();
  window.addEventListener('resize', fitName);
  if (document.fonts) document.fonts.ready.then(fitName);
})();
