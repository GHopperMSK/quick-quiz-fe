import QuickQuizCore from "./QuickQuizCore.js";
import InfoSlide from "./InfoSlide.js";
import SelectQuestion from "./SelectQuestion.js";
import MultiQuestion from "./MultiQuestion.js";

function BaseSlide(id, data)
{
    this.id = id;
    this.data = data;
    this.timeout = null;
    this.timeoutCounter = 0;
    this.elem = null;
}

BaseSlide.prototype.render = function(elem) {
    const timeout = this.getTimeout();
    if (timeout != 0) {
        const intervalId = setInterval(function(that) {
            that.timeoutCounter += 1;

            const qqSlideEvent = new CustomEvent("qq-slide-event", {
                "bubbles": true,
                "cancelable": true,
                "detail": {
                    "slide_id": that.id,
                }
            });
            elem.dispatchEvent(qqSlideEvent); 
            if (that.timeoutCounter == that.timeout) {
                clearInterval(intervalId);   
            }
        }, 1000, this);
    }

    const qqSlideEvent = new CustomEvent("qq-slide-event", {
        "bubbles": true,
        "cancelable": true,
        "detail": {
            "slide_id": this.id
        }
    });
    elem.dispatchEvent(qqSlideEvent); 
};

BaseSlide.prototype.getTimeout = function() {
    if (this.timeout != null) {
        return this.timeout - this.timeoutCounter;
    }

    if (this.data.hasOwnProperty("timeout_seconds")) {
        this.timeout = this.data.timeout_seconds;
    } else {
        this.timeout = 0;
    }

    return this.timeout - this.timeoutCounter;;
};

BaseSlide.createSlide = function (slideData) {
    switch (slideData.type) {
        case QuickQuizCore.INFO_SLIDE:
            return new InfoSlide(slideData.id, slideData.config);
        case QuickQuizCore.SELECT_QUESTION:
            return new SelectQuestion(slideData.id, slideData.config);
        case QuickQuizCore.MULTI_QUESTION:
            return new MultiQuestion(slideData.id, slideData.config);
        default:
            throw "Unknown question type!"
    }
};

InfoSlide.prototype = Object.create(BaseSlide.prototype);

SelectQuestion.prototype = Object.create(BaseSlide.prototype);

MultiQuestion.prototype = Object.create(BaseSlide.prototype);

export default BaseSlide;