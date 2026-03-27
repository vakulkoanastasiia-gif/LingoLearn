export const Auth = {
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    },
    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    },
    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    },
    // Оновлення прогресу вивчених слів для поточного користувача
    updateProgress(learnedWordIds) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;
        
        currentUser.learnedWords = learnedWordIds;
        this.setCurrentUser(currentUser);

        // Оновлюємо користувача в загальному масиві
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            this.saveUsers(users);
        }
    }
	
};