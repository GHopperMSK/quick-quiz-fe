import BaseSlide from './BaseSlide.js';

function SelectQuestion(id, data) 
{
    BaseSlide.call(this, id, data);
    this.optionId = null;

    this.getNextStep = function() {
        return this.data.options[this.optionId].next_slide_id;
    }
    
    this.isNextButtonEnabled = function() {
        return this.optionId != null;
    }
    
    this.getNextButtonLabel = function() {
        var nextButtonLabel = this.data.default_next_button_label;
        if (this.optionId != null) {
            nextButtonLabel =  this.data.options[this.optionId].next_button_label;
        }
    
        return nextButtonLabel;
    }
    
    this.setOptionId = function(optionId) {
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
    
    this.render = function(elem) {
        this.elem = elem;
        elem.innerHTML = this.compileTemplate();
        for (const optionId in this.data.options) {
            document.getElementById("qq_slt_slide_option_" + optionId)
                .addEventListener('click', () => { this.setOptionId(optionId) });
        }

        BaseSlide.prototype.render.call(this, elem);
    }

    this.compileTemplate = function() {
        let html = "";
        html += `<p>${this.data.question}</p>`;
        for (const optionId in this.data.options) {
            html += `<input
                type="radio"
                id="qq_slt_slide_option_${optionId}"
                name="qq-select-question"
                value="${optionId}"
                ${(this.optionId == optionId) ? "checked" : ""} />
            `;
            html += `<label for='${optionId}'>"${this.data.options[optionId].label}</label><br />`;
        }
        return html;
    }

    this.getReport = function() {
        return {
            "checked_option": this.optionId
        };
    }
}

export default SelectQuestion;