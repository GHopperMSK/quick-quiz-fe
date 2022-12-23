import BaseSlide from './BaseSlide.js';

function InfoSlide(id, data)
{
    BaseSlide.call(this, id, data);
    this.isConfirmRequired = null;
    this.isConfirmed = false;

    this.compileTemplate = function() {
        let html = "<div>" + this.data.text;
        if (this.isConfirmRequired()) {
            html += '<br /><input type="checkbox" id="info_slide_confirm" onclick="window.quickQuiz.getCurrentSlide().markAgreement()"'
                + (this.isConfirmed ? " checked" : "")
                + '/><label for="info_slide_confirm">' 
                + this.data.confirment_label 
                + '</label>';
        }
        html += "</div>";
        return html;
    }

    this.isConfirmRequired = function() {
        if (this.isConfirmRequired != null) {
            return this.isConfirmRequired;
        }

        if (this.data.hasOwnProperty("agreement_checkbox_label")) {
            this.isConfirmRequired = true;
        } else {
            this.isConfirmRequired = false;
        }

        return this.isConfirmRequired;
    }

    this.markAgreement = function() {
        this.isConfirmed = !this.isConfirmed;
        
        const qqSlideEvent = new CustomEvent("qq-slide-event", {
            "bubbles": true,
            "cancelable": true,
            "detail": {
                "slide_id": this.id
            }
        });
        this.elem.dispatchEvent(qqSlideEvent); 
    }

    this.getNextStep = function() {
        return this.data.next_slide_id;
    };
    
    this.isNextButtonEnabled = function() {
        if (this.isConfirmRequired) {
            return this.isConfirmed;
        }

        return true;
    }
    
    this.getNextButtonLabel = function() {
        if (this.data.hasOwnProperty("next_button_label")) {
            return this.data.next_button_label;
        }
        return null;
    }

    this.getReport = function() {
        let report = {};
        if (this.isConfirmRequired) {
            report["is_checked"] = this.isConfirmed;
        }
        return report;
    }
}

export default InfoSlide;