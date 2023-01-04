import InfoSlide from '../../src/slides/InfoSlide/InfoSlide.js';

test("getIfConfirmRequired returns false by default", () => {
    const infoSlide = new InfoSlide(1, JSON.parse(`{}`));
    expect(infoSlide.getIfConfirmRequired()).toBe(false);
});

test("getIfConfirmRequired returns value from the given config", () => {
    const rawSlideData = `{
        "agreement_label": "this is agreement label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new InfoSlide(1, slideData);
    expect(infoSlide.getIfConfirmRequired()).toBe(true);
});

test("getIfConfirmRequired uses cached value", () => {
    const infoSlide = new InfoSlide(1, JSON.parse(`{}`));
    infoSlide.isConfirmRequired = true;
    expect(infoSlide.getIfConfirmRequired()).toBe(true);
});

test("isNextButtonEnabled without agreemnt_label", () => {
    const rawSlideData = `{
        "next_slide_id": 1
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new InfoSlide(1, slideData);
    expect(infoSlide.isNextButtonEnabled()).toBe(true);
});

test("isNextButtonEnabled with agreemnt_label", () => {
    const rawSlideData = `{
        "agreement_label": "this is agreement label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new InfoSlide(1, slideData);
    expect(infoSlide.isNextButtonEnabled()).toBe(false);
});

test("isNextButtonEnabled after the agreement has been clicked", () => {
    const rawSlideData = `{
        "agreement_label": "this is agreement label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new InfoSlide(1, slideData);
    infoSlide.isConfirmed = true;
    expect(infoSlide.isNextButtonEnabled()).toBe(true);
});

test("getReport returns an empty object", () => {
    const infoSlide = new InfoSlide(1, JSON.parse(`{}`));
    expect(infoSlide.getReport()).toStrictEqual({});
});

test("getReport returns 'is_checked: false' is agreement hasn't been clicked", () => {
    const rawSlideData = `{
        "agreement_label": "this is agreement label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new InfoSlide(1, slideData);
    expect(infoSlide.getReport()).toStrictEqual({"is_checked": false});
});

test("getReport returns 'is_checked: true' is agreement has been clicked", () => {
    const rawSlideData = `{
        "agreement_label": "this is agreement label"
    }`;
    const slideData = JSON.parse(rawSlideData);
    const infoSlide = new InfoSlide(1, slideData);
    infoSlide.isConfirmed = true;
    expect(infoSlide.getReport()).toStrictEqual({"is_checked": true});
});