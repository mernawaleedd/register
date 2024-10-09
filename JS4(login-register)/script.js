// Register
document.addEventListener('DOMContentLoaded', function () {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
  
    if (registerBtn) {
      registerBtn.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        if (!name || !email || !password) {
          alert('Please fill in all fields');
          return;
        }
  
        if (!validateEmail(email)) {
          alert('Please enter a valid email address');
          return;
        }
        if (localStorage.getItem(email)) {
          alert('Email already exists, please use another one');
          return;
        }
  
        const user = { name, email, password };
        localStorage.setItem(email, JSON.stringify(user));
  
        alert('Registration successful, redirecting to login...');
        window.location.href = 'login.html';
      });
    }
  
    // Login user
    if (loginBtn) {
      loginBtn.addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const storedUser = localStorage.getItem(email);
        if (!storedUser) {
          alert('Email not registered');
          return;
        }
  
        const user = JSON.parse(storedUser);

        if (user.password !== password) {
          alert('Incorrect password');
          return;
        }

        localStorage.setItem('loggedInUser', email);
        window.location.href = 'index.html';
      });
    }
    if (window.location.pathname.endsWith('index.html')) {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (!loggedInUserEmail) {
        window.location.href = 'login.html';
      }
  
      const user = JSON.parse(localStorage.getItem(loggedInUserEmail));
      document.getElementById('userName').innerText = user.name;
    }
  
    // Logout user
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
      });
    }
  });
  
  function validateEmail(email) {
    const atPosition = email.indexOf('@');
    const dotPosition = email.lastIndexOf('.');
    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length) {
      return false;
    }
    return true;
  }
  