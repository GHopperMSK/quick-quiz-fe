import SlideFactory from './SlideFactory.js';

class QuickQuizCore
{
    constructor(quizId, websiteId, rootElement, reportCallback) {
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
    }

    init(jsonConfig) {
        if (this.isInitialized == true) {
            return
        }

        this.parseConfig(jsonConfig);
        this.setEventListeners();

        this.root.classList.add("qq-root");

        this.slidesBlock = document.createElement("div");
        this.slidesBlock.id = "qq-slides";
        this.root.appendChild(this.slidesBlock);

        const controlDiv = document.createElement("div");
        controlDiv.id = "qq-controls";

        this.prevButton = document.createElement('button');
        this.prevButton.onclick = function() {
            window.quickQuiz.prev();
            return false;
        };
        this.prevButton.innerText = QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL;

        controlDiv.appendChild(this.prevButton);

        this.nextButton = document.createElement('button');
        this.nextButton.onclick = function() {
            window.quickQuiz.next();
            return false;
        };
        controlDiv.appendChild(this.nextButton);

        this.root.appendChild(controlDiv);

        this.isInitialized = true;

        this.slidesHistory.push(this.initSlide)
        this.render();
    }

    parseConfig(cnf) {
        // TODO: validate Config

        const rawConfig = JSON.parse(cnf);
        this.version = rawConfig.version;
        this.initSlide = rawConfig.init_slide;

        rawConfig.slides.forEach(function(slideConfig) {
            const slide = SlideFactory.createSlide(slideConfig);
            this.slides[slide.id] = slide;
        }, this);
    }

    setEventListeners() {
        this.root.addEventListener('qq-slide-event', (event) => {
            const currentSlide = this.getCurrentSlide();
            this.renderControlElements(currentSlide.id);
            event.stopPropagation();
        });
    }

    getCurrentSlide() {
        let currentStepId = this.initStep;
        const historyLength = this.slidesHistory.length;
        if (historyLength != 0) {
            currentStepId = this.slidesHistory[historyLength - 1];
        }
        return this.getSlide(currentStepId);
    }

    getSlide(slideId) {
        return this.slides[slideId];
    }

    render() {
        let currentSlide = this.getCurrentSlide();
        currentSlide.render(this.slidesBlock);
    }

    renderControlElements(slideId) {
        if (this.isFirstSlide()) {
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
        if (currentSlide.isNextButtonEnabled()) {
            if (timeout == 0) {
                this.nextButton.removeAttribute("disabled");
            } else {
                this.nextButton.setAttribute("disabled", true);
            }
        } else {
            if (currentSlide.isSkippable()) {
                nextButtonLabel = QuickQuizCore.DEFAULT_SKIP_BUTTON_LABEL;
                this.nextButton.removeAttribute("disabled");
            } else {
                this.nextButton.setAttribute("disabled", true);
            }
        }

        if (timeout > 0) {
            nextButtonLabel += " (" + timeout + ")";
        }

        this.nextButton.innerText = nextButtonLabel;
    }

    next() {
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

    submit() {
        let report = {
            "quiz_id": this.quizId,
            "website_id": this.websiteId,
            "slides": []
        };
        this.slidesHistory.forEach(function(slideId) {
            const slide = this.getSlide(slideId);
            report.slides[slideId] = slide.getReport();
        }, this);

        this.reportCallback(report);
        this.root.classList.add("qq-root-close");

        setTimeout(function(that) {
            window.quickQuiz.root.parentNode.removeChild(that.root);
            window.quickQuiz = null;
        }, 1000, this);
    }

    prev() {
        if (this.isFirstSlide()) {
            return;
        }
        this.slidesHistory.pop();
        this.render();
    }

    isFirstSlide() {
        return this.slidesHistory.length == 1;
    }
}

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

Object.defineProperty(QuickQuizCore, "DEFAULT_SKIP_BUTTON_LABEL", {
    value: "Skip",
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
