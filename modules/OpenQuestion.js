import BaseSlide from './BaseSlide.js';
import QuickQuizCore from "./QuickQuizCore.js";

function OpenQuestion(id, data) 
{
    BaseSlide.call(this, id, data);
    this.answer = "";

    this.getNextStep = function() {
        return this.data.next_slide_id;
    }
    
    this.isNextButtonEnabled = function() {
        if (this.data.min_character_count != null) {
            return this.answer.length > this.data.min_character_count;
        }

        return true;
    }
    
    this.getNextButtonLabel = function() {
        if ("next_button_label" in this.data) {
            return this.data.next_button_label;
        }
        return null;
    }
    
    this.changeAnswer = function() {
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

    this.render = function(elem) {
        this.elem = elem;
        elem.innerHTML = this.compileTemplate();
        document.getElementById("qq_opq_slide_answer").addEventListener('input', () => { this.changeAnswer() });

        BaseSlide.prototype.render.call(this, elem);
    }
    
    this.compileTemplate = function() {
        let html = `<p>${this.data.question}</p>`;

        switch (this.data.text_form) {
            case QuickQuizCore.OPQ_TYPE_INPUT:
                html += `<input type="text" id="qq_opq_slide_answer" value="${this.answer}" />`;
                break;
            case QuickQuizCore.OPQ_TYPE_TEXTAREA:
                html += `<textarea id="qq_opq_slide_answer">${this.answer}</textarea>`;
                break;
            default:
                throw "Unknown OPQ slide type!";
        }

        return html;
    }

    this.getReport = function() {
        return {
            "answer": this.answer
        };
    }
}

export default OpenQuestion;