import BaseSlide from '../BaseSlide/BaseSlide.js';
import QuickQuizCore from '../../core/QuickQuizCore.js';
import "./RateSlide.css"

class RateSlide extends BaseSlide
{
    constructor(id, data) {
        super(id, data);
        this.value = null;
        this.minValue = RateSlide.DEFAULT_MIN_VALUE;
        this.maxValue = RateSlide.DEFAULT_MAX_VALUE;
    }
    
    isNextButtonEnabled() {
        return this.value != null;
    }

    setValue(value) {
        this.value = value;
    
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

        for (let value = this.minValue; value <= this.maxValue; value++) {
            document.getElementById(`qq_rte_slide_option_${value}`)
                    .addEventListener('click', () => { this.setValue(value) })
        }

        BaseSlide.prototype.afterRender.call(this, elem);
    }

    compileTemplate() {
        let html = `<p>${BaseSlide.sanitizeHtml(this.data.text)}</p>`;
        html += "<div class=\"rate\">";
        if ("min_value" in this.data) {
            this.minValue = this.data.min_value;
        }
        if ("max_value" in this.data) {
            this.maxValue = this.data.max_value;
        }
        for (let i = this.maxValue; i >= this.minValue; i--) {
            html += `<input
                type="radio"
                id="qq_rte_slide_option_${i}"
                name="rate"
                value="${i}"
            />`;
            html += `<label for="qq_rte_slide_option_${i}" title="${i}">star</label>`;
        }
        html += "</div>";
        
        return html;
    }

    getReport() {
        return {
            "rate": this.value
        };
    }
}

Object.defineProperty(RateSlide, 'DEFAULT_MIN_VALUE', {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: false,
});

Object.defineProperty(RateSlide, 'DEFAULT_MAX_VALUE', {
    value: 5,
    writable: false,
    enumerable: false,
    configurable: false,
});

export default RateSlide;