import SelectQuestion from '../../src/slides/SelectQuestion/SelectQuestion.js';

test("getNextSlide returns value from the given config", () => {
    const rawSlideData = `{
        "options": {
            "1": {
                "next_slide_id": 111
            }
        }
    }`;
    const slideData = JSON.parse(rawSlideData);
    const selectQuestion = new SelectQuestion(1, slideData);
    selectQuestion.optionId = 1;
    expect(selectQuestion.getNextSlide()).toBe(111);
});

test("isNextButtonEnabled without any options been checked", () => {
    const selectQuestion = new SelectQuestion(1, JSON.parse(`{}`));
    expect(selectQuestion.isNextButtonEnabled()).toBe(false);
});

test("isNextButtonEnabled if an option has been checked", () => {
    const selectQuestion = new SelectQuestion(1, JSON.parse(`{}`));
    selectQuestion.optionId = 1;
    expect(selectQuestion.isNextButtonEnabled()).toBe(true);
});

test("getNextButtonLabel if an option has't been checked and there isn't default value in the config", () => {
    const selectQuestion = new SelectQuestion(1, JSON.parse(`{}`));
    expect(selectQuestion.getNextButtonLabel()).toBe(null);
});

test("getNextButtonLabel if an option has been checked and next_button_label presents in the config", () => {
    const rawSlideData = `{
        "options": {
            "1": {
                "next_button_label": "Some next button label"
            }
        }
    }`;
    const slideData = JSON.parse(rawSlideData);
    const selectQuestion = new SelectQuestion(1, slideData);
    selectQuestion.optionId = 1;
    expect(selectQuestion.getNextButtonLabel()).toBe("Some next button label");
});

test("getNextButtonLabel if an option has been checked and next_button_label doesn't present in the config but there is a default value", () => {
    const rawSlideData = `{
        "options": {
            "1": {
                "next_slide_id": 1
            }
        },
        "default_next_button_label": "Some next button default label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const selectQuestion = new SelectQuestion(1, slideData);
    selectQuestion.optionId = 1;
    expect(selectQuestion.getNextButtonLabel()).toBe("Some next button default label");
});

test("getReport returns current optionId", () => {
    const selectQuestion = new SelectQuestion(1, JSON.parse(`{}`));
    selectQuestion.optionId = 112;
    expect(selectQuestion.getReport()).toStrictEqual({"checked_option": 112});
});
