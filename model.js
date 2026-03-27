import { Auth } from './auth.js';
export class Model {
    constructor() {
		this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
            window.location.href = 'login.html'; // Захист головної сторінки
            return;
        }
        // Дані додатку: масив об'єктів 
		this.words = [
			{ id: 1, word: 'Concurrency', translation: 'Паралелізм', learned: false },
			{ id: 2, word: 'Latency', translation: 'Затримка', learned: false },
			{ id: 3, word: 'Bandwidth', translation: 'Пропускна здатність', learned: false },
			{ id: 4, word: 'Redundancy', translation: 'Надмірність (резервування)', learned: false },
			{ id: 5, word: 'Execution', translation: 'Виконання', learned: false },
			{ id: 6, word: 'Compiler', translation: 'Компілятор', learned: false },
			{ id: 7, word: 'Allocation', translation: 'Виділення (ресурсів)', learned: false },
			{ id: 8, word: 'Debugging', translation: 'Налагодження', learned: false },
			{ id: 9, word: 'Implementation', translation: 'Реалізація', learned: false },
			{ id: 10, word: 'Pointer', translation: 'Вказівник', learned: false },
			{ id: 11, word: 'Circuit', translation: 'Електричне коло', learned: false },
			{ id: 12, word: 'Voltage', translation: 'Напруга', learned: false },
			{ id: 13, word: 'Resistance', translation: 'Опір', learned: false },
			{ id: 14, word: 'Frequency', translation: 'Частота', learned: false },
			{ id: 15, word: 'Velocity', translation: 'Швидкість', learned: false },
			{ id: 16, word: 'Constraint', translation: 'Обмеження', learned: false },
			{ id: 17, word: 'Syntax', translation: 'Синтаксис', learned: false },
			{ id: 18, word: 'Register', translation: 'Регістр', learned: false },
			{ id: 19, word: 'Instruction', translation: 'Інструкція', learned: false },
			{ id: 20, word: 'Architecture', translation: 'Архітектура', learned: false }
		];
		
		this.words.forEach(word => {
            if (this.currentUser.learnedWords.includes(word.id)) {
                word.learned = true;
            }
        });
		
        this.currentIndex = 0;
        this.isTranslationShown = false;
		this.isControlMode = false;
		this.controlWord = null;
    }

    // Отримати поточне слово
    getCurrentWord() {
        return this.words[this.currentIndex];
    }

    // Перехід до наступного слова
    nextWord() {
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        this.isTranslationShown = false; // Скидаємо стан перекладу для нового слова
    }

    // Позначити як вивчене
    markAsLearned() {
        const currentWord = this.words[this.currentIndex];
        currentWord.learned = true;
        
        // Додаємо ID слова, якщо його там ще немає
        if (!this.currentUser.learnedWords.includes(currentWord.id)) {
            this.currentUser.learnedWords.push(currentWord.id);
            Auth.updateProgress(this.currentUser.learnedWords); // Зберігаємо в localStorage
        }
        this.nextWord();
    }

    // Позначити як "ще вчу"
    markAsLearning() {
        const currentWord = this.words[this.currentIndex];
        currentWord.learned = false;
        
        // Видаляємо ID слова з вивчених
        this.currentUser.learnedWords = this.currentUser.learnedWords.filter(id => id !== currentWord.id);
        Auth.updateProgress(this.currentUser.learnedWords); // Зберігаємо в localStorage
        
        this.nextWord();
    }

    // Перемкнути відображення перекладу
    toggleTranslation() {
        this.isTranslationShown = !this.isTranslationShown;
    }

    // Розрахунок статистики для прогрес-бару
    getProgress() {
        const total = this.words.length;
        const learned = this.words.filter(w => w.learned).length;
        const percentage = total === 0 ? 0 : Math.round((learned / total) * 100);
        
        return { total, learned, percentage };
    }
	
	// Зміна режиму
    setMode(isControl) {
        this.isControlMode = isControl;
    }

    // Вибір випадкового слова для тесту
    generateControlWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.controlWord = this.words[randomIndex];
        return this.controlWord;
    }

    // Перевірка введеного тексту
    checkAnswer(answer) {
        if (!this.controlWord) return false;
        // Порівнюємо без урахування регістру та зайвих пробілів
        return answer.trim().toLowerCase() === this.controlWord.word.toLowerCase();
    }
}