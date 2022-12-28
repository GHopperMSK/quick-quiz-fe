import BaseSlide from './BaseSlide.js';

function InfoSlide(id, data)
{
    BaseSlide.call(this, id, data);
    this.isConfirmRequired = null;
    this.isConfirmed = false;

    this.compileTemplate = function() {
        let html = `<p class="text-block">${this.data.text}</p>`;
        if (this.getIfConfirmRequired()) {
            html += `<input type="checkbox"
                id="qq_inf_slide_confirm_checkbox"
                ${this.isConfirmed ? " checked" : ""} />
                <label for="qq_inf_slide_confirm_checkbox">
                    ${this.data.agreement_label}
                </label>
            `;
        }
        return html;
    }

    this.render = function(elem) {
        this.elem = elem;
        elem.innerHTML = this.compileTemplate();
        if (this.getIfConfirmRequired()) {
            document.getElementById("qq_inf_slide_confirm_checkbox").addEventListener('click', () => { this.markAgreement() });
        }

        BaseSlide.prototype.render.call(this, elem);
    }

    this.getIfConfirmRequired = function() {
        if (this.isConfirmRequired != null) {
            return this.isConfirmRequired;
        }

        if (this.data.hasOwnProperty("agreement_label")) {
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
        if (this.getIfConfirmRequired()) {
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
        if (this.getIfConfirmRequired()) {
            report["is_checked"] = this.isConfirmed;
        }
        return report;
    }
}

export default InfoSlide;