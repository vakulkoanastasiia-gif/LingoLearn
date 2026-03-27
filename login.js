import { Auth } from './auth.js';

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = Auth.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        Auth.setCurrentUser(user);
        window.location.href = 'index.html';
    } else {
        alert('Неправильний email або пароль!');
    }
});