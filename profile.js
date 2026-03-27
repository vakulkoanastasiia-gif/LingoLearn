import { Auth } from './auth.js';

const currentUser = Auth.getCurrentUser();

if (!currentUser) {
    window.location.href = 'login.html'; // Якщо не залогінений, викидаємо на логін
} else {
    // Підставляємо дані в HTML
    document.getElementById('profile-name').textContent = currentUser.name;
	document.getElementById('profile-name-header').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-gender').textContent = currentUser.gender === 'male' ? 'Чоловіча' : 'Жіноча';
    document.getElementById('profile-dob').textContent = currentUser.dob;
    document.getElementById('profile-words-count').textContent = currentUser.learnedWords ? currentUser.learnedWords.length : 0;
    document.getElementById('profile-reg-date').textContent = currentUser.registrationDate;

    // Обробка виходу
    document.getElementById('btn-logout').addEventListener('click', () => {
        Auth.logout();
    });
	
	// Спочатку, під час завантаження профілю, ставимо аватарку, якщо вона вже була збережена
    document.getElementById('profile-avatar').src = currentUser.avatar || "https://dummyimage.com/100";

    // Оновлений обробник кнопки "Редагувати профіль"
    document.getElementById('btn-edit-profile').addEventListener('click', () => {
        // Запитуємо дані по черзі. Якщо користувач натисне "Скасувати", повернеться null
        const newName = prompt("Введіть нове ім'я:", currentUser.name);
        const newDob = prompt("Введіть нову дату народження:", currentUser.dob);
        const newAvatar = prompt("Введіть посилання (URL) на нову аватарку (наприклад, з інтернету):", currentUser.avatar || "");
        
        // Оновлюємо дані тільки якщо користувач щось ввів і не натиснув "Скасувати"
        if (newName !== null && newName.trim() !== "") currentUser.name = newName.trim();
        if (newDob !== null && newDob.trim() !== "") currentUser.dob = newDob.trim();
        if (newAvatar !== null && newAvatar.trim() !== "") currentUser.avatar = newAvatar.trim();
        
        // Зберігаємо зміни поточного юзера
        Auth.setCurrentUser(currentUser);
        
        // Оновлюємо його в загальній базі користувачів
        const users = Auth.getUsers();
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            Auth.saveUsers(users);
        }

        // Миттєво оновлюємо інтерфейс на сторінці
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-name-header').textContent = currentUser.name;
        document.getElementById('profile-dob').textContent = currentUser.dob;
        if (currentUser.avatar) {
            document.getElementById('profile-avatar').src = currentUser.avatar;
        }
    });
	
}