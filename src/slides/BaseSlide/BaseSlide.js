class BaseSlide 
{
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.timeout = null;
        this.timeoutCounter = 0;
        this.skippable = null;
        this.elem = null;    
    }

    getNextSlide() {
        return this.data.next_slide_id;
    };

    getNextButtonLabel() {
        if (this.data.hasOwnProperty("next_button_label")) {
            return this.sanitizeHtml(this.data.next_button_label);
        }
        return null;
    }

    afterRender(elem) {
        const timeout = this.getTimeout();
        if (!this.isSkippable() && timeout != 0) {
            const intervalId = setInterval(function(that) {
                if (window.quickQuiz.getCurrentSlide().id != that.id) {
                    clearInterval(intervalId);
                }
    
                that.timeoutCounter += 1;
                if (that.timeoutCounter >= that.timeout) {
                    clearInterval(intervalId);
                }
                that.emitEvent(elem, that.id);
            }, 1000, this);
        }
    
        this.emitEvent(elem, this.id);
    };
    
    emitEvent(elem, slideId) {
        const qqSlideEvent = new CustomEvent("qq-slide-event", {
            "bubbles": true,
            "cancelable": true,
            "detail": {
                "slide_id": slideId,
            }
        });
        elem.dispatchEvent(qqSlideEvent);
    }
    
    getTimeout() {
        if (this.timeout != null) {
            return this.timeout - this.timeoutCounter;
        }

        if (this.data.hasOwnProperty("timeout_seconds")) {
            this.timeout = this.data.timeout_seconds;
        } else {
            this.timeout = 0;
        }
    
        return this.timeout - this.timeoutCounter;
    };
    
    isSkippable() {
        if (this.skipabble != null) {
            return this.skipabble;
        }
    
        this.skippable = this.data.hasOwnProperty("skippable") ? this.data.skippable : false;
    
        return this.skippable;
    };

    sanitizeHtml(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "`": '&#x27;',
            "/": '&grave;',
        };
        const reg = /[&<>"'`/]/ig;
        return string.replace(reg, (match)=>(map[match]));
    }

    parseMarkdown(markdown) {
        const htmlText = markdown
            .replace(/(\*{2})([^*]+)(\*{2})/gim, '<b>$2</b>')
            .replace(/(\_{2})([^*]+)(\_{2})/gim, '<i>$2</i>');
        return htmlText;
    }

    processRawTextInput(text) {
        return this.parseMarkdown(this.sanitizeHtml(text));
    }
}

Object.defineProperty(BaseSlide, 'INFO_SLIDE', {
    value: "INF",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(BaseSlide, 'SELECT_QUESTION', {
    value: "SLT",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(BaseSlide, 'MULTI_QUESTION', {
    value: "MLT",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(BaseSlide, 'OPEN_QUESTION', {
    value: "OPQ",
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(BaseSlide, 'RATE_SLIDE', {
    value: "RTE",
    writable: false,
    enumerable: false,
    configurable: false,
});

export default BaseSlide;