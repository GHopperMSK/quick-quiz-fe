import BaseSlide from '../BaseSlide/BaseSlide.js';
import QuickQuizCore from '../../core/QuickQuizCore.js';

class SelectQuestion extends BaseSlide
{
    constructor(id, data) {
        super(id, data);
        this.optionId = null;
    }

    getNextSlide() {
        return this.data.options[this.optionId].next_slide_id;
    }
    
    isNextButtonEnabled() {
        return this.optionId != null;
    }
    
    getNextButtonLabel() {
        let nextButtonLabel = null;
        
        if (this.optionId != null) {
            if ("next_button_label" in this.data.options[this.optionId]) {
                nextButtonLabel = this.data.options[this.optionId].next_button_label;
            }
        }

        if (nextButtonLabel != null) {
            return BaseSlide.sanitizeHtml(nextButtonLabel);
        }

        if ("default_next_button_label" in this.data) {
            nextButtonLabel = this.data.default_next_button_label;
        }
    
        if (nextButtonLabel != null) {
            return BaseSlide.sanitizeHtml(nextButtonLabel);
        }

        return null;
    }
    
    setOptionId(optionId) {
        this.optionId = optionId;
    
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
        for (const optionId in this.data.options) {
            document.getElementById(`qq_slt_slide_option_${optionId}`)
                .addEventListener('click', () => { this.setOptionId(optionId) });
        }

        BaseSlide.prototype.afterRender.call(this, elem);
    }

    compileTemplate() {
        let html = "";
        html += `<p>${BaseSlide.sanitizeHtml(this.data.question)}</p>`;
        for (const optionId in this.data.options) {
            html += `<input
                type="radio"
                id="qq_slt_slide_option_${optionId}"
                name="qq-select-question"
                value="${optionId}"
                ${(this.optionId == optionId) ? "checked" : ""} />
            `;
            html += `<label for='qq_slt_slide_option_${optionId}'>
                ${BaseSlide.sanitizeHtml(this.data.options[optionId].label)}
                </label><br />`;
        }
        return html;
    }

    getReport() {
        return {
            "checked_option": this.optionId
        };
    }
}

export default SelectQuestion;