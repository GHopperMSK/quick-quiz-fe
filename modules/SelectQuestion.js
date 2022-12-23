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
    
    // TODO: cache compiled templite
    this.compileTemplate = function() {
        let html = "";
        html += "<p>" + this.data.question + "</p>";
        for (const optionId in this.data.options) {
            let isChecked = "";
            if (this.optionId == optionId) {
                isChecked = "checked "
            }
            // TODO: window.quickQuiz.getCurrentSlide() shouldn't exist
            html += "<input type='radio' id='" + optionId + "' name='qq-select-question' value='" + optionId + "' " + isChecked + "onclick='window.quickQuiz.getCurrentSlide().setOptionId(" + optionId + ");'>";
            html += "<label for='" + optionId + "'>" + this.data.options[optionId].label + "</label><br></br>";
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