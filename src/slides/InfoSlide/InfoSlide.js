import BaseSlide from '../BaseSlide/BaseSlide.js';
import QuickQuizCore from '../../core/QuickQuizCore.js';

class InfoSlide extends BaseSlide
{
    constructor(id, data) {
        super(id, data);
        this.isConfirmRequired = null;
        this.isConfirmed = false;
    }

    compileTemplate() {
        let html = `<p class="text-block">${this.processRawTextInput(this.data.text)}</p>`;
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
            document.getElementById("qq_inf_slide_confirm_checkbox").addEventListener('click', () => { this.clickAgreement() });
        }

        BaseSlide.prototype.afterRender.call(this, elem);
    }

    getIfConfirmRequired() {
        if (this.isConfirmRequired != null) {
            return this.isConfirmRequired;
        }

        this.isConfirmRequired = this.data.hasOwnProperty("agreement_label") ? true : false;

        return this.isConfirmRequired;
    }

    clickAgreement() {
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
    
    isNextButtonEnabled() {
        if (this.getIfConfirmRequired()) {
            return this.isConfirmed;
        }

        return true;
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