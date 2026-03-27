import { Model } from './model.js';
import { View } from './view.js';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Зв'язуємо дії користувача (кліки у View) з методами Controller-а
        this.view.bindTranslateWord(this.handleTranslate.bind(this));
        this.view.bindKnowWord(this.handleKnow.bind(this));
        this.view.bindLearnWord(this.handleLearn.bind(this));

        // Перший рендер сторінки при завантаженні
        this.updateView();
		
		this.view.bindSwitchMode(this.handleSwitchMode.bind(this));
        this.view.bindCheckAnswer(this.handleCheckAnswer.bind(this));
		
    }

    // Обробники подій
    handleTranslate() {
        this.model.toggleTranslation();
        this.updateView();
    }

    handleKnow() {
        this.model.markAsLearned();
        this.updateView();
    }

    handleLearn() {
        this.model.markAsLearning();
        this.updateView();
    }

    // Метод для оновлення всього інтерфейсу новими даними з моделі
    updateView() {
        const currentWord = this.model.getCurrentWord();
        const progress = this.model.getProgress();
        
        this.view.renderWord(currentWord, this.model.isTranslationShown);
        this.view.renderProgress(progress);
    }
	
	handleSwitchMode(isControl) {
        this.model.setMode(isControl);
        this.view.renderMode(isControl);
        
        if (isControl) {
            // Якщо перейшли в режим контролю, генеруємо слово
            const word = this.model.generateControlWord();
            this.view.renderControlQuestion(word);
        } else {
            // Якщо повернулися назад, оновлюємо звичайний вигляд
            this.updateView();
        }
    }

    handleCheckAnswer(answer) {
        const isCorrect = this.model.checkAnswer(answer);
        this.view.renderFeedback(isCorrect);
        
        // Якщо правильно, через секунду даємо нове слово
        if (isCorrect) {
            setTimeout(() => {
                const newWord = this.model.generateControlWord();
                this.view.renderControlQuestion(newWord);
                this.view.controlInput.value = '';
                this.view.controlFeedback.textContent = '';
            }, 1000);
        }
    }
}

// Запускаємо додаток
const app = new Controller(new Model(), new View());