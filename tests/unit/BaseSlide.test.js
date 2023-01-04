import BaseSlide from '../../src/slides/BaseSlide/BaseSlide.js';

test("getNextSlide returns value from the given config", () => {
    const rawSlideData = `{
        "next_slide_id": 111
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new BaseSlide(1, slideData);
    expect(infoSlide.getNextSlide()).toBe(111);
});

test("getNextButtonLabel returns null if the param doesn't exists in the config", () => {
    const infoSlide = new BaseSlide(1, JSON.parse(`{}`));
    expect(infoSlide.getNextButtonLabel()).toBe(null);
});

test("getNextButtonLabel returns value from the given config", () => {
    const rawSlideData = `{
        "next_button_label": "this is next button label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new BaseSlide(1, slideData);
    expect(infoSlide.getNextButtonLabel()).toBe("this is next button label");
});

test("getTimout returns 0 by default", () => {
    const baseSlide = new BaseSlide(1, JSON.parse(`{}`));
    expect(baseSlide.getTimeout()).toBe(0);
});

test("getTimout returns value from the given config", () => {
    const rawSlideData = `{
        "timeout_seconds": 111
    }`;
    const slideData = JSON.parse(rawSlideData);
    const baseSlide = new BaseSlide(1, slideData);
    expect(baseSlide.getTimeout()).toBe(111);
});

test("getTimeout uses cached value", () => {
    const baseSlide = new BaseSlide(1, JSON.parse(`{}`));
    baseSlide.timeout = 112;
    expect(baseSlide.getTimeout()).toBe(112);
});

test("isSkippable returns false by default", () => {
    const baseSlide = new BaseSlide(1, JSON.parse(`{}`));
    expect(baseSlide.isSkippable()).toBe(false);
});

test("isSkippable returns false by default", () => {
    const rawSlideData = `{
        "skippable": true
    }`;
    const slideData = JSON.parse(rawSlideData);
    const baseSlide = new BaseSlide(1, slideData);
    expect(baseSlide.isSkippable()).toBe(true);
});

test("isSkippable uses cached value", () => {
    const baseSlide = new BaseSlide(1, JSON.parse(`{}`));
    baseSlide.skipabble = true;
    expect(baseSlide.isSkippable()).toBe(true);
});