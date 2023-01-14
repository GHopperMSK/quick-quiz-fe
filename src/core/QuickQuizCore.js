import SlideFactory from '../SlideFactory.js';
import './core.css';

class QuickQuizCore
{
    constructor(quizId, websiteId, rootElement, lang, reportCallback, serverUrl) {
        // TODO: validate input params

        this.quizId = quizId;
        this.websiteId = websiteId;
        this.root = (rootElement != null) ? rootElement : document.body;
        this.lang = (lang != null) ? lang : QuickQuizCore.DEFAULT_LANG;
        this.reportCallback = (reportCallback != null) ? reportCallback : this.submitReport;
        this.serverUrl = (serverUrl != null) ? serverUrl : QuickQuizCore.SERVER_URL;
    
        this.version = null;
        this.initSlide = null;
        this.slides = {};
        this.slidesHistory = [];
        this.nextButton = null;
        this.prevButton = null;
        this.slidesBlock = null;
        this.isInitialized = false;
        this.qqWidgetElement = null;

        fetch(`${this.serverUrl}/config?lang=${this.lang}&quiz_id=${this.quizId}&website_id=${this.websiteId}`)
            .then((response) => response.json())
            .then((config) => {
                this.init(config);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    init(jsonConfig) {
        if (this.isInitialized == true) {
            return
        }

        this.parseConfig(jsonConfig);
        this.setEventListeners();

        this.qqWidgetElement = document.createElement("div");

        const closeDiv = document.createElement("div");
        closeDiv.classList.add("qq-close");

        const closeButton = document.createElement("span");
        closeButton.onclick = function() {
            window.quickQuiz.shutDown();
            return false;
        };
        closeDiv.appendChild(closeButton);
        this.qqWidgetElement.appendChild(closeDiv);

        this.qqWidgetElement.classList.add("qq-root");

        this.slidesBlock = document.createElement("div");
        this.slidesBlock.id = "qq-slides";
        this.qqWidgetElement.appendChild(this.slidesBlock);

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

        this.qqWidgetElement.appendChild(controlDiv);
        this.root.appendChild(this.qqWidgetElement);

        this.isInitialized = true;

        this.slidesHistory.push(this.initSlide)
        this.render();
    }

    parseConfig(config) {
        // TODO: validate Config

        this.version = config.version;
        this.initSlide = config.init_slide;

        config.slides.forEach(function(slideConfig) {
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
        let currentSlideId = this.initSlide;
        const historyLength = this.slidesHistory.length;
        if (historyLength != 0) {
            currentSlideId = this.slidesHistory[historyLength - 1];
        }
        return this.getSlide(currentSlideId);
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

        if (!currentSlide.isSkippable() && timeout > 0) {
            nextButtonLabel += " (" + timeout + ")";
        }

        this.nextButton.innerText = nextButtonLabel;
    }

    next() {
        const currentSlide = this.getCurrentSlide();
        const nextId = currentSlide.getNextSlide();
        if (nextId == null) {
            this.prepareReport();
        } else {
            const nextSlide = this.getSlide(nextId);
            this.slidesHistory.push(nextSlide.id);
            this.render();
        }
    }

    prepareReport() {
        let report = {
            "quiz_id": this.quizId,
            "website_id": this.websiteId,
            "slides": {}
        };
        this.slidesHistory.forEach(function(slideId) {
            const slide = this.getSlide(slideId);
            report.slides[slideId] = slide.getReport();
        }, this);

        this.reportCallback(report);

        this.shutDown();
    }

    shutDown() {
        this.qqWidgetElement.classList.add("qq-root-close");
        setTimeout(function(that) {
            that.root.removeChild(that.qqWidgetElement);
            window.quickQuiz = null;
        }, 1000, this);
    }

    submitReport(data) {
        fetch(`${this.serverUrl}/submit-data`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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

Object.defineProperty(QuickQuizCore, "SERVER_URL", {
    value: "http://quick-quiz.com:3000",
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(QuickQuizCore, "DEFAULT_LANG", {
    value: "en",
    writable: false,
    configurable: false,
    enumerable: false
});

export default QuickQuizCore;
