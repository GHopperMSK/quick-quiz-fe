import RateSlide from '../../src/slides/RateSlide/RateSlide.js';

test("isNextButtonEnabled returns false if not rated", () => {
    const rateSlide = new RateSlide(1, JSON.parse(`{}`));
    expect(rateSlide.isNextButtonEnabled()).toBe(false);
});

test("isNextButtonEnabled returns true if rated", () => {
    const rateSlide = new RateSlide(1, JSON.parse(`{}`));
    rateSlide.value = 1;
    expect(rateSlide.isNextButtonEnabled()).toBe(true);
});

test("getReport returns an answer", () => {
    const rateSlide = new RateSlide(1, JSON.parse(`{}`));
    rateSlide.value = 11;
    expect(rateSlide.getReport()).toStrictEqual({"rate": 11});
});