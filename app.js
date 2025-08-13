(function () {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successMsg = document.getElementById('successMsg');
  const resetBtn = document.getElementById('resetBtn');

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function showError(el, errorEl, message) {
    el.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function clearError(el, errorEl) {
    el.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  function validate() {
    let valid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = messageInput.value.trim();

    if (name.length < 2 || !/^[A-Za-z.'\-\s]{2,}$/.test(name)) {
      showError(nameInput, nameError, 'Please enter your name (letters and spaces only).');
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    if (!isEmail(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (msg.length < 10) {
      showError(messageInput, messageError, 'Please write at least 10 characters.');
      valid = false;
    } else {
      clearError(messageInput, messageError);
    }
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successMsg.textContent = '';

    const ok = validate();
    if (ok) {
      successMsg.textContent = '✅ Looks good! Your message is ready to be sent (demo only).';
      form.reset();
      nameInput.focus();
    } else {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  [nameInput, emailInput, messageInput].forEach((el) => {
    el.addEventListener('input', () => {
      const map = { name: nameError, email: emailError, message: messageError };
      if (el.getAttribute('aria-invalid') === 'true') {
        map[el.id].textContent = '';
        el.removeAttribute('aria-invalid');
      }
      successMsg.textContent = '';
    });
  });

  resetBtn.addEventListener('click', () => {
    [nameError, emailError, messageError].forEach((p) => (p.textContent = ''));
    successMsg.textContent = '';
  });
})();
