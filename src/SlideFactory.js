import BaseSlide from './slides/BaseSlide/BaseSlide.js';
import InfoSlide from "./slides/InfoSlide/InfoSlide.js";
import SelectQuestion from "./slides/SelectQuestion/SelectQuestion.js";
import MultiQuestion from "./slides/MultiQuestion/MultiQuestion.js";
import OpenQuestion from "./slides/OpenQUestion/OpenQuestion.js";
import RateSlide from "./slides/RateSlide/RateSlide.js";

class SlideFactory
{
    static createSlide(slideData) {
        switch (slideData.type) {
            case BaseSlide.INFO_SLIDE:
                return new InfoSlide(slideData.id, slideData.config);
            case BaseSlide.SELECT_QUESTION:
                return new SelectQuestion(slideData.id, slideData.config);
            case BaseSlide.MULTI_QUESTION:
                return new MultiQuestion(slideData.id, slideData.config);
            case BaseSlide.OPEN_QUESTION:
                return new OpenQuestion(slideData.id, slideData.config);
            case BaseSlide.RATE_SLIDE:
                return new RateSlide(slideData.id, slideData.config);
            default:
                throw `Unknown question type '${slideData.type}'!`;
        }
    };
}

export default SlideFactory;