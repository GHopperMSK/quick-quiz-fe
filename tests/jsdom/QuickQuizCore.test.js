/**
 * @jest-environment jsdom
 */

import QuickQuizCore from '../../src/core/QuickQuizCore.js';
import InfoSlide from '../../src/slides/InfoSlide/InfoSlide.js';

global.fetch = require('jest-fetch-mock');

beforeEach(() => {
    fetch.mockClear();
});

test("getCurrentSlide returns init slide", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 2,
        "slides": [
            {
                "id": 2,
                "type": "INF",
                "config": {
                    "text": "Welcome to Quick Quiz repository! This is going to be a small presentation of its opportunities.",
                    "next_slide_id": 2
                }
            },
            {
                "id": 1,
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
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    const slide = quickQuizCore.getCurrentSlide();
    setTimeout(() => {
        expect(slide instanceof InfoSlide).toBe(true);
    }, 1);
});

test("isFirstSlide returns true after init", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 1,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Welcome to Quick Quiz repository! This is going to be a small presentation of its opportunities.",
                    "next_slide_id": null
                }
            }
        ]
    }`;
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    const slide = quickQuizCore.getCurrentSlide();
    setTimeout(() => {
        expect(quickQuizCore.isFirstSlide()).toBe(true);
    }, 1);
});

test("Get current slide in history array after initialization", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 2,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Some text #1",
                    "next_slide_id": null
                }
            },
            {
                "id": 2,
                "type": "INF",
                "config": {
                    "text": "Some text #2",
                    "next_slide_id": 1
                }
            }
        ]
    }`;
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    setTimeout(() => {
        expect(quickQuizCore.slidesHistory).toStrictEqual([2]);
    }, 1);
});

test("Correct control initialization with default labels", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 2,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Some text #1",
                    "next_slide_id": null
                }
            },
            {
                "id": 2,
                "type": "INF",
                "config": {
                    "text": "Some text #2",
                    "next_slide_id": 1
                }
            }
        ]
    }`;
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    setTimeout(() => {
        expect(quickQuizCore.prevButton.disabled).toBe(true);
        expect(quickQuizCore.prevButton.innerText).toBe(QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL);
        expect(quickQuizCore.nextButton.disabled).toBe(false);
        expect(quickQuizCore.nextButton.innerText).toBe(QuickQuizCore.DEFAULT_NEXT_BUTTON_LABEL);
    }, 1);
});

test("Correct control initialization with default labels", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 1,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Some text #1",
                    "next_slide_id": null,
                    "next_button_label": "Custom next button label"
                }
            }
        ]
    }`;
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    setTimeout(() => {
        expect(quickQuizCore.prevButton.disabled).toBe(true);
        expect(quickQuizCore.prevButton.innerText).toBe(QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL);
        expect(quickQuizCore.nextButton.disabled).toBe(false);
        expect(quickQuizCore.nextButton.innerText).toBe("Custom next button label");
    }, 1);
});

test("Correct control initialization with timeout option", () => {
    const rawData = `{
        "version": 1,
        "init_slide": 1,
        "slides": [
            {
                "id": 1,
                "type": "INF",
                "config": {
                    "text": "Some text #1",
                    "next_slide_id": null,
                    "next_button_label": "Custom next button label",
                    "timeout_seconds": 10
                }
            }
        ]
    }`;
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    setTimeout(() => {
        expect(quickQuizCore.prevButton.disabled).toBe(true);
        expect(quickQuizCore.prevButton.innerText).toBe(QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL);
        expect(quickQuizCore.nextButton.disabled).toBe(true);
        expect(quickQuizCore.nextButton.innerText).toBe("Custom next button label (10)");
    }, 1);
});