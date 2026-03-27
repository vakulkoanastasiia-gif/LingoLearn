export class View {
    constructor() {
        // Знаходимо всі необхідні елементи на сторінці
        this.wordCard = document.querySelector('.word-card');
        this.btnTranslate = document.querySelector('.btn-outline-secondary'); // Кнопка "Показати переклад"
        this.btnKnow = document.querySelector('.btn-success'); // Кнопка "Знаю!"
        this.btnLearn = document.querySelector('.btn-danger'); // Кнопка "Ще вчу"
        
        this.progressBar = document.querySelector('.progress-bar');
        this.progressText = document.querySelector('.card-body .small.text-muted');
		
		this.btnModeStudy = document.querySelector('#btn-study');
        this.btnModeControl = document.querySelector('#btn-control');
        this.studyUi = document.querySelector('#study-ui');
        this.controlUi = document.querySelector('#control-ui');
        this.controlWordText = document.querySelector('#control-word');
        this.controlInput = document.querySelector('#control-input');
        this.btnCheckWord = document.querySelector('#btn-check-word');
        this.controlFeedback = document.querySelector('#control-feedback');
    }

    // Прив'язка подій (Controller буде передавати сюди свої функції)
    bindTranslateWord(handler) {
        this.btnTranslate.addEventListener('click', handler);
    }

    bindKnowWord(handler) {
        this.btnKnow.addEventListener('click', handler);
    }

    bindLearnWord(handler) {
        this.btnLearn.addEventListener('click', handler);
    }

    // Оновлення картки зі словом
    renderWord(wordObj, isTranslationShown) {
        this.wordCard.textContent = isTranslationShown ? wordObj.translation : wordObj.word;
        this.btnTranslate.textContent = isTranslationShown ? 'Показати слово' : 'Показати переклад';
    }

    // Оновлення прогрес-бару
    renderProgress(progress) {
        this.progressBar.style.width = `${progress.percentage}%`;
        this.progressBar.textContent = `${progress.percentage}%`;
        this.progressText.textContent = `Вивчено: ${progress.learned} слів із ${progress.total} запланованих.`;
    }
	
	bindSwitchMode(handler) {
        this.btnModeStudy.addEventListener('click', () => handler(false));
        this.btnModeControl.addEventListener('click', () => handler(true));
    }

    bindCheckAnswer(handler) {
        this.btnCheckWord.addEventListener('click', () => {
            handler(this.controlInput.value);
        });
    }
	
	// Перемикання між режимами
    renderMode(isControlMode) {
        if (isControlMode) {
            this.studyUi.classList.add('d-none');
            this.controlUi.classList.remove('d-none');
            this.btnModeStudy.classList.remove('active');
            this.btnModeControl.classList.add('active');
        } else {
            this.studyUi.classList.remove('d-none');
            this.controlUi.classList.add('d-none');
            this.btnModeStudy.classList.add('active');
            this.btnModeControl.classList.remove('active');
        }
        this.controlFeedback.textContent = ''; 
        this.controlInput.value = '';
    }

    // Виведення слова для перекладу (українською)
    renderControlQuestion(wordObj) {
        this.controlWordText.textContent = wordObj.translation;
    }

    // Виведення результату перевірки
    renderFeedback(isCorrect) {
        if (isCorrect) {
            this.controlFeedback.textContent = 'Правильно! 🎉';
            this.controlFeedback.className = 'mt-3 fw-bold fs-5 text-success';
        } else {
            this.controlFeedback.textContent = 'Помилка, спробуй ще! ❌';
            this.controlFeedback.className = 'mt-3 fw-bold fs-5 text-danger';
        }
    }
}