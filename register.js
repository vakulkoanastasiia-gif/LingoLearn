import { Auth } from './auth.js';

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки
    
    const newUser = {
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        gender: document.getElementById('reg-gender').value,
        dob: document.getElementById('reg-dob').value,
        password: document.getElementById('reg-password').value, // Додане поле пароля
        learnedWords: [], // Масив для зберігання ID вивчених слів
        registrationDate: new Date().toLocaleDateString('uk-UA')
    };

    const users = Auth.getUsers();
    if (users.find(u => u.email === newUser.email)) {
        alert('Користувач з таким Email вже існує!');
        return;
    }

    users.push(newUser);
    Auth.saveUsers(users);
    Auth.setCurrentUser(newUser); // Одразу логінимо
    
    window.location.href = 'index.html'; // Переходимо на головну
});