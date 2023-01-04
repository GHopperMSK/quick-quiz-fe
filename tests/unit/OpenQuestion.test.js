import OpenQuestion from '../../src/slides/OpenQuestion/OpenQuestion.js';

test("isNextButtonEnabled without min_character_count param", () => {
    const openQuestion = new OpenQuestion(1, JSON.parse(`{}`));
    expect(openQuestion.isNextButtonEnabled()).toBe(true);
});

test("isNextButtonEnabled with min_character_count param and not enough characters", () => {
    const rawSlideData = `{
        "min_character_count": 10
    }`;
    const slideData = JSON.parse(rawSlideData);
    const openQuestion = new OpenQuestion(1, slideData);
    expect(openQuestion.isNextButtonEnabled()).toBe(false);
});

test("isNextButtonEnabled with min_character_count param and enough characters", () => {
    const rawSlideData = `{
        "min_character_count": 10
    }`;
    const slideData = JSON.parse(rawSlideData);
    const openQuestion = new OpenQuestion(1, slideData);
    openQuestion.answer = "More than ten characters string";
    expect(openQuestion.isNextButtonEnabled()).toBe(true);
});

test("isNextButtonEnabled with min_character_count param and enough characters", () => {
    const rawSlideData = `{
        "min_character_count": 10
    }`;
    const slideData = JSON.parse(rawSlideData);
    const openQuestion = new OpenQuestion(1, slideData);
    openQuestion.answer = "More than ten characters string";
    expect(openQuestion.isNextButtonEnabled()).toBe(true);
});

test("getReport returns an answer", () => {
    const openQuestion = new OpenQuestion(1, JSON.parse(`{}`));
    openQuestion.answer = "Some answer";
    expect(openQuestion.getReport()).toStrictEqual({"answer": "Some answer"});
});