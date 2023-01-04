import MultiQuestion from '../../src/slides/MultiQUestion/MultiQuestion.js';

test("isNextButtonEnabled without any options been checked", () => {
    const multiQuestion = new MultiQuestion(1, JSON.parse(`{}`));
    expect(multiQuestion.isNextButtonEnabled()).toBe(false);
});

test("isNextButtonEnabled with one option checked", () => {
    const multiQuestion = new MultiQuestion(1, JSON.parse(`{}`));
    multiQuestion.optionIds = [1];
    expect(multiQuestion.isNextButtonEnabled()).toBe(true);
});

test("isNextButtonEnabled with one option checked and min_options_count equal to 2", () => {
    const rawSlideData = `{
        "min_options_count": 2
    }`;
    const slideData = JSON.parse(rawSlideData);
    const multiQuestion = new MultiQuestion(1, slideData);
    multiQuestion.optionIds = [1];
    expect(multiQuestion.isNextButtonEnabled()).toBe(false);
});

test("isNextButtonEnabled with two option checked and min_options_count equal to 2", () => {
    const rawSlideData = `{
        "min_options_count": 2
    }`;
    const slideData = JSON.parse(rawSlideData);
    const multiQuestion = new MultiQuestion(1, slideData);
    multiQuestion.optionIds = [1, 2];
    expect(multiQuestion.isNextButtonEnabled()).toBe(true);
});

test("getReport returns checked options", () => {
    const multiQuestion = new MultiQuestion(1, JSON.parse(`{}`));
    multiQuestion.optionIds = [1, 2];
    expect(multiQuestion.getReport()).toStrictEqual({"checked_options": [1,2]});
});
