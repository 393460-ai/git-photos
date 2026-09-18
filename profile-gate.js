(() => {
  const profileForm = document.querySelector('.profile-form');
  const profileSection = profileForm?.closest('.section') ||
    [...document.querySelectorAll('.section')].find((section) => /profile/i.test(section.textContent));
  const profileDisplay = document.querySelector('.user-profile-display');

  if (!profileSection || !profileDisplay) return;

  // Keep the profile completely out of the document flow until explicitly opened.
  profileSection.classList.add('profile-gated');
  profileSection.setAttribute('aria-hidden', 'true');

  const accessButton = document.createElement('button');
  accessButton.type = 'button';
  accessButton.className = 'profile-access-button';
  accessButton.setAttribute('aria-controls', 'profile-page');
  accessButton.setAttribute('aria-expanded', 'false');
  accessButton.innerHTML = `${profileDisplay.innerHTML}<span>Open profile</span>`;

  profileDisplay.replaceChildren(accessButton);
  profileDisplay.classList.add('profile-access-control');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'profile-close-button';
  closeButton.textContent = 'Close profile';
  closeButton.setAttribute('aria-label', 'Close profile page');
  profileSection.prepend(closeButton);
  profileSection.id = 'profile-page';

  const setProfileOpen = (isOpen) => {
    profileSection.classList.toggle('profile-is-open', isOpen);
    profileSection.setAttribute('aria-hidden', String(!isOpen));
    accessButton.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeButton.focus({ preventScroll: true });
    } else {
      accessButton.focus({ preventScroll: true });
    }
  };

  accessButton.addEventListener('click', () => setProfileOpen(true));
  closeButton.addEventListener('click', () => setProfileOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && profileSection.classList.contains('profile-is-open')) {
      setProfileOpen(false);
    }
  });
})();
