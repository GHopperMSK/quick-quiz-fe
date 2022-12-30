import BaseSlide from './BaseSlide.js';

class MultiQuestion extends BaseSlide
{
    constructor(id, data) {
        super(id, data);
        this.optionIds = [];
    }

    getNextStep() {
        return this.data.next_slide_id;
    }
    
    isNextButtonEnabled() {
        const minCount = this.optionIds.min_options_count != null ? this.optionIds.min_options_count : 1;
        return this.optionIds.length > minCount;
    }
    
    getNextButtonLabel() {
        if ("next_button_label" in this.data) {
            return this.data.next_button_label;
        }
        return null;
    }
    
    setOptionId(optionId) {
        const optionIndex = this.optionIds.indexOf(optionId);
        if (optionIndex == -1) {
            this.optionIds.push(optionId);
        } else {
            this.optionIds.splice(optionIndex, 1);
        }
    
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
            document.getElementById(`qq_mlt_slide_option_${optionId}`)
                .addEventListener('click', () => { this.setOptionId(optionId) });
        }

        BaseSlide.prototype.render.call(this, elem);
    }
    
    compileTemplate() {
        let html = `<p>${this.data.question}</p>`;
        for (const optionId in this.data.options) {
            html += `<input type="checkbox"
                id="qq_mlt_slide_option_${optionId}"
                value="${optionId}"
                ${(this.optionIds.indexOf(parseInt(optionId)) != -1) ? "checked" : ""} />`;
            html += `<label for="qq_mlt_slide_option_${optionId}">${this.data.options[optionId].label}</label><br />`;
        }
        return html;
    }

    getReport() {
        return {
            "checked_options": this.optionIds
        };
    }
}

export default MultiQuestion;