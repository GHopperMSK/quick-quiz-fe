import BaseSlide from './BaseSlide.js';
import QuickQuizCore from "./QuickQuizCore.js";

class OpenQuestion extends BaseSlide
{
    constructor(id, data) {
        super(id, data);
        this.answer = "";
    }

    getNextStep() {
        return this.data.next_slide_id;
    }
    
    isNextButtonEnabled() {
        if (this.data.min_character_count != null) {
            return this.answer.length > this.data.min_character_count;
        }

        return true;
    }
    
    getNextButtonLabel() {
        if ("next_button_label" in this.data) {
            return this.data.next_button_label;
        }
        return null;
    }
    
    changeAnswer() {
        this.answer = document.getElementById("qq_opq_slide_answer").value;
    
        const qqSlideEvent = new CustomEvent("qq-slide-event", {
            "bubbles": true,
            "cancelable": true,
            "detail": {
                "slide_id": this.id
            }
        });
        this.elem.dispatchEvent(qqSlideEvent);
    }

    render(elem) {
        this.elem = elem;
        elem.innerHTML = this.compileTemplate();
        document.getElementById("qq_opq_slide_answer").addEventListener('input', () => { this.changeAnswer() });

        BaseSlide.prototype.render.call(this, elem);
    }
    
    compileTemplate() {
        let html = `<p>${this.data.question}</p>`;

        switch (this.data.text_form_type) {
            case OpenQuestion.OPQ_TYPE_INPUT:
                html += `<input type="text" id="qq_opq_slide_answer" value="${this.answer}" />`;
                break;
            case OpenQuestion.OPQ_TYPE_TEXTAREA:
                html += `<textarea id="qq_opq_slide_answer">${this.answer}</textarea>`;
                break;
            default:
                throw "Unknown OPQ slide type!";
        }

        return html;
    }

    getReport() {
        return {
            "answer": this.answer
        };
    }
}

Object.defineProperty(OpenQuestion, "OPQ_TYPE_INPUT", {
    value: "input",
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(OpenQuestion, "OPQ_TYPE_TEXTAREA", {
    value: "textarea",
    writable: false,
    configurable: false,
    enumerable: false
});

export default OpenQuestion;