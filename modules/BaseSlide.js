import QuickQuizCore from "./QuickQuizCore.js";
import InfoSlide from "./InfoSlide.js";
import SelectQuestion from "./SelectQuestion.js";
import MultiQuestion from "./MultiQuestion.js";
import OpenQuestion from "./OpenQuestion.js";

function BaseSlide(id, data)
{
    this.id = id;
    this.data = data;
    this.timeout = null;
    this.timeoutCounter = 0;
    this.skippable = null;
    this.elem = null;
}

BaseSlide.prototype.render = function(elem) {
    const timeout = this.getTimeout();
    if (timeout != 0) {
        const intervalId = setInterval(function(that) {
            that.timeoutCounter += 1;

            that.emitEvent(elem, that.id);
            if (that.timeoutCounter >= that.timeout) {
                clearInterval(intervalId);   
            }
        }, 1000, this);
    }

    this.emitEvent(elem, this.id);
};

BaseSlide.prototype.emitEvent = function(elem, slideId) {
    const qqSlideEvent = new CustomEvent("qq-slide-event", {
        "bubbles": true,
        "cancelable": true,
        "detail": {
            "slide_id": slideId,
        }
    });
    elem.dispatchEvent(qqSlideEvent); 
}

BaseSlide.prototype.getTimeout = function() {
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

BaseSlide.prototype.isSkippable = function() {
    if (this.skipabble != null) {
        return this.skipabble;
    }

    this.skippable = this.data.skippable != null ? this.data.skippable : false;

    return this.skippable;
};

BaseSlide.createSlide = function (slideData) {
    switch (slideData.type) {
        case QuickQuizCore.INFO_SLIDE:
            return new InfoSlide(slideData.id, slideData.config);
        case QuickQuizCore.SELECT_QUESTION:
            return new SelectQuestion(slideData.id, slideData.config);
        case QuickQuizCore.MULTI_QUESTION:
            return new MultiQuestion(slideData.id, slideData.config);
        case QuickQuizCore.OPEN_QUESTION:
            return new OpenQuestion(slideData.id, slideData.config);
        default:
            throw "Unknown question type!"
    }
};

InfoSlide.prototype = Object.create(BaseSlide.prototype);

SelectQuestion.prototype = Object.create(BaseSlide.prototype);

MultiQuestion.prototype = Object.create(BaseSlide.prototype);

OpenQuestion.prototype = Object.create(BaseSlide.prototype);

export default BaseSlide;