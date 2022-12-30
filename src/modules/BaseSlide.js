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

    render(elem) {
        const timeout = this.getTimeout();
        if (timeout != 0) {
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
    
        this.skippable = this.data.skippable != null ? this.data.skippable : false;
    
        return this.skippable;
    };
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