import BaseSlide from './BaseSlide.js';

function QuickQuizCore(quizId, websiteId, rootElement, reportCallback) 
{
    this.quizId = quizId;
    this.websiteId = websiteId;
    this.version = null;

    this.reportCallback = reportCallback;

    this.initSlide = null;
    this.slides = {};
    this.slidesHistory = [];

    this.root = rootElement;
    this.nextButton = null;
    this.prevButton = null;
    this.slidesBlock = null;

    this.isInitialized = false;

    this.init = function(jsonConfig) {
        if (this.isInitialized == true) {
            return
        }

        this.parseConfig(jsonConfig);
        this.setEventListeners();

        this.root.classList.add("qq-root");

        this.slidesBlock = document.createElement("div");
        this.slidesBlock.id = "qq-slides";
        this.root.appendChild(this.slidesBlock);

        this.prevButton = document.createElement('button');
        this.prevButton.onclick = function() {
            window.quickQuiz.prev();
            return false;
        };
        this.prevButton.innerText = QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL;

        this.root.appendChild(this.prevButton);

        this.nextButton = document.createElement('button');
        this.nextButton.onclick = function() {
            window.quickQuiz.next();
            return false;
        };
        this.root.appendChild(this.nextButton);

        this.isInitialized = true;

        this.slidesHistory.push(this.initSlide)
        this.render();
    }

    this.parseConfig = function(cnf) {
        // TODO: validate Config

        const rawConfig = JSON.parse(cnf);
        this.version = rawConfig.version;
        this.initSlide = rawConfig.init_slide;

        rawConfig.slides.forEach(function(slideConfig) {
            const slide = BaseSlide.createSlide(slideConfig);
            this.slides[slide.id] = slide;
        }, this);
    }

    this.setEventListeners = function() {
        this.root.addEventListener('qq-slide-event', (event) => {
            this.renderControlElements(event.detail.slide_id);
            event.stopPropagation();
        });
    }

    this.getCurrentSlide = function() {
        let currentStepId = this.initStep;
        const historyLength = this.slidesHistory.length;
        if (historyLength != 0) {
            currentStepId = this.slidesHistory[historyLength - 1];
        }
        return this.getSlide(currentStepId);
    }

    this.getSlide = function(slideId) {
        return this.slides[slideId];
    }

    this.render = function() {
        let currentSlide = this.getCurrentSlide();
        currentSlide.render(this.slidesBlock);
    }

    this.renderControlElements = function(slideId) {
        if (this.isFirstStep()) {
            this.prevButton.setAttribute("disabled", true);
        } else {
            this.prevButton.removeAttribute("disabled");
        }

        const currentSlide = this.getSlide(slideId);
        
        let nextButtonLabel = currentSlide.getNextButtonLabel();
        if (nextButtonLabel == null) {
            nextButtonLabel = QuickQuizCore.DEFAULT_NEXT_BUTTON_LABEL;
        }

        const timeout = currentSlide.getTimeout();
        if (timeout != 0) {
            nextButtonLabel += " (" + timeout + ")";
        }

        if (currentSlide.isNextButtonEnabled()) {
            if (timeout == 0) {
                this.nextButton.removeAttribute("disabled");
            } else {
                this.nextButton.setAttribute("disabled", true);
            }
        } else {
            this.nextButton.setAttribute("disabled", true);
        }

        this.nextButton.innerText = nextButtonLabel;
    }

    this.next = function() {
        const currentStep = this.getCurrentSlide();
        const nextId = currentStep.getNextStep();
        if (nextId == null) {
            this.submit();
        } else {
            const nextStep = this.getSlide(nextId);
            this.slidesHistory.push(nextStep.id);
            this.render();
        }
    }

    this.submit = function() {
        let report = {};
        this.slidesHistory.forEach(function(slideId) {
            const slide = this.getSlide(slideId);
            report[slideId] = slide.getReport();
        }, this);

        this.reportCallback(report);
    }

    this.prev = function() {
        if (this.isFirstStep()) {
            return;
        }
        this.slidesHistory.pop();
        this.render();
    }

    this.isFirstStep = function() {
        return this.slidesHistory.length == 1;
    }
}

Object.defineProperty(QuickQuizCore, 'INFO_SLIDE', {
    value: "INF",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(QuickQuizCore, 'SELECT_QUESTION', {
    value: "SLT",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(QuickQuizCore, 'MULTI_QUESTION', {
    value: "MLT",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(QuickQuizCore, 'OPEN_QUESTION', {
    value: "OPQ",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(QuickQuizCore, 'SCALE_SLIDE', {
    value: "SCL",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(QuickQuizCore, "DEFAULT_PERV_BUTTON_LABEL", {
    value: "<<",
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(QuickQuizCore, "DEFAULT_NEXT_BUTTON_LABEL", {
    value: ">>",
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(QuickQuizCore, "EVENT_INIT_TYPE", {
    value: "qq-init",
    writable: false,
    configurable: false,
    enumerable: false
});

export default QuickQuizCore;