import QuickQuizCore from '../../src/core/QuickQuizCore.js';
import RateSlide from '../../src/slides/RateSlide/RateSlide.js';
import InfoSlide from '../../src/slides/InfoSlide/InfoSlide.js';

test("getCurrentSlide returns init slide", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 2,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Welcome to Quick Quiz repository! This is going to be a small presentation of its opportunities.",
                    "next_slide_id": 2
                }
            },
            {
                "id": 2,
                "type": "RTE",
                "config": {
                    "text": "This is 'RTE' slide, which allows one to rate on a configurable scale",
                    "next_slide_id": 1,
                    "min_value": 1,
                    "max_value": 5
                }
            }
        ]
    }`;
    const quickQuizCore = new QuickQuizCore(1, 2, null, null);
    quickQuizCore.parseConfig(rawData);
    const slide = quickQuizCore.getCurrentSlide();
    expect(slide instanceof RateSlide).toBe(true);
});

test("getCurrentSlide returns slide base on history array", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 2,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Welcome to Quick Quiz repository! This is going to be a small presentation of its opportunities.",
                    "next_slide_id": 2
                }
            },
            {
                "id": 2,
                "type": "RTE",
                "config": {
                    "text": "This is 'RTE' slide, which allows one to rate on a configurable scale",
                    "next_slide_id": 1,
                    "min_value": 1,
                    "max_value": 5
                }
            }
        ]
    }`;
    const quickQuizCore = new QuickQuizCore(1, 2, null, null);
    quickQuizCore.parseConfig(rawData);
    quickQuizCore.slidesHistory.push(1);
    const slide = quickQuizCore.getCurrentSlide();
    expect(slide instanceof InfoSlide).toBe(true);
});

test("isFirstSlide returns true", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 2,
        "slides": []
    }`;
    const quickQuizCore = new QuickQuizCore(1, 2, null, null);
    quickQuizCore.parseConfig(rawData);
    quickQuizCore.slidesHistory.push(11);
    expect(quickQuizCore.isFirstSlide()).toBe(true);
});
