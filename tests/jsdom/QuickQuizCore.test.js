/**
 * @jest-environment jsdom
 */

import QuickQuizCore from '../../src/core/QuickQuizCore.js';

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
    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement, null);
    quickQuizCore.init(rawData);
    expect(quickQuizCore.slidesHistory).toStrictEqual([2]);
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
    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement, null);
    quickQuizCore.init(rawData);
    expect(quickQuizCore.prevButton.disabled).toStrictEqual(true);
    expect(quickQuizCore.prevButton.innerText).toBe("<<");
    expect(quickQuizCore.nextButton.disabled).toStrictEqual(false);
    expect(quickQuizCore.nextButton.innerText).toBe(">>");
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
    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement, null);
    quickQuizCore.init(rawData);
    expect(quickQuizCore.prevButton.disabled).toStrictEqual(true);
    expect(quickQuizCore.prevButton.innerText).toBe("<<");
    expect(quickQuizCore.nextButton.disabled).toStrictEqual(false);
    expect(quickQuizCore.nextButton.innerText).toBe("Custom next button label");
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
    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement, null);
    quickQuizCore.init(rawData);
    expect(quickQuizCore.prevButton.disabled).toStrictEqual(true);
    expect(quickQuizCore.prevButton.innerText).toBe("<<");
    expect(quickQuizCore.nextButton.disabled).toStrictEqual(true);
    expect(quickQuizCore.nextButton.innerText).toBe("Custom next button label (10)");
});