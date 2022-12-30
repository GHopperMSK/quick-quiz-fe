import BaseSlide from './BaseSlide.js';

class InfoSlide extends BaseSlide
{
    constructor(id, data) {
        super(id, data);
        this.isConfirmRequired = null;
        this.isConfirmed = false;
    }

    compileTemplate() {
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

    render(elem) {
        this.elem = elem;
        elem.innerHTML = this.compileTemplate();
        if (this.getIfConfirmRequired()) {
            document.getElementById("qq_inf_slide_confirm_checkbox").addEventListener('click', () => { this.markAgreement() });
        }

        BaseSlide.prototype.render.call(this, elem);
    }

    getIfConfirmRequired() {
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

    markAgreement() {
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

    getNextStep() {
        return this.data.next_slide_id;
    };
    
    isNextButtonEnabled() {
        if (this.getIfConfirmRequired()) {
            return this.isConfirmed;
        }

        return true;
    }
    
    getNextButtonLabel() {
        if (this.data.hasOwnProperty("next_button_label")) {
            return this.data.next_button_label;
        }
        return null;
    }

    getReport() {
        let report = {};
        if (this.getIfConfirmRequired()) {
            report["is_checked"] = this.isConfirmed;
        }
        return report;
    }
}

export default InfoSlide;