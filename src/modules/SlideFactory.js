import BaseSlide from './BaseSlide.js';
import InfoSlide from "./InfoSlide.js";
import SelectQuestion from "./SelectQuestion.js";
import MultiQuestion from "./MultiQuestion.js";
import OpenQuestion from "./OpenQuestion.js";

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
            default:
                throw "Unknown question type!";
        }
    };
}

export default SlideFactory;