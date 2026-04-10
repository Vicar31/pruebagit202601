document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('message');
  const dashboard = document.getElementById('dashboard');
  const loginCard = document.getElementById('login-card');
  const welcomeText = document.getElementById('welcomeText');
  const logoutBtn = document.getElementById('logoutBtn');

  const DEMO_USER = { username: 'demo', password: '1234' };

  function showMessage(txt, isError = true) {
    message.textContent = txt;
    message.classList.toggle('error', isError);
    message.classList.toggle('success', !isError);
  }

  function showDashboard(user) {
    loginCard.classList.add('hidden');
    dashboard.classList.remove('hidden');
    welcomeText.textContent = `Has iniciado sesión como: ${user}`;
  }

  function logout() {
    localStorage.removeItem('loggedInUser');
    dashboard.classList.add('hidden');
    loginCard.classList.remove('hidden');
    showMessage('', false);
    form.reset();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) {
      showMessage('Completa usuario y contraseña.', true);
      return;
    }

    // Demo check: in producción validar en el servidor
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      showMessage('Accediendo...', false);
      localStorage.setItem('loggedInUser', username);
      setTimeout(() => showDashboard(username), 400);
    } else {
      showMessage('Credenciales incorrectas.', true);
    }
  });

  logoutBtn.addEventListener('click', logout);

  // Auto-login si hay sesión en localStorage
  const saved = localStorage.getItem('loggedInUser');
  if (saved) showDashboard(saved);
});
