/* Git-Photos interaction animations: no framework required. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // Add a soft neon spotlight that follows the pointer.
  const spotlight = document.createElement('div');
  spotlight.className = 'pointer-spotlight';
  spotlight.setAttribute('aria-hidden', 'true');
  spotlight.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0;transition:opacity .35s ease;background:radial-gradient(260px circle at var(--pointer-x,50%) var(--pointer-y,50%),rgba(0,255,255,.09),transparent 70%);';
  document.body.appendChild(spotlight);
  window.addEventListener('pointermove', (event) => {
    spotlight.style.setProperty('--pointer-x', `${event.clientX}px`);
    spotlight.style.setProperty('--pointer-y', `${event.clientY}px`);
    spotlight.style.opacity = '1';
  }, { passive: true });
  window.addEventListener('pointerleave', () => { spotlight.style.opacity = '0'; });

  // Give cards a restrained 3D tilt on pointer-capable devices.
  document.querySelectorAll('.gallery-item, .section, .profile-preview').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  // Ripple feedback makes buttons feel responsive.
  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, .mood-btn, nav a');
    if (!target) return;
    const ripple = document.createElement('span');
    const box = target.getBoundingClientRect();
    const size = Math.max(box.width, box.height);
    ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${event.clientX-box.left-size/2}px;top:${event.clientY-box.top-size/2}px;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;transform:scale(0);animation:gitphotos-ripple 600ms ease-out;`;
    if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  const style = document.createElement('style');
  style.textContent = '@keyframes gitphotos-ripple{to{transform:scale(2.4);opacity:0}}';
  document.head.appendChild(style);
})();
