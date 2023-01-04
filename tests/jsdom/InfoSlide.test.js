/**
 * @jest-environment jsdom
 */

import QuickQuizCore from '../../src/core/QuickQuizCore.js';

test("Correct control initialization with agreement required", () => {
    document.getElementById = jest.fn().mockImplementation(function(id) { return document.createElement("div"); });
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
                    "agreement_label": "Some label text"
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
    expect(quickQuizCore.nextButton.innerText).toBe(">>");
});

test("Correct control initialization with agreement for skippable slide", () => {
    document.getElementById = jest.fn().mockImplementation(function(id) { return document.createElement("div"); });
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
                    "agreement_label": "Some label text",
                    "skippable": true
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
    expect(quickQuizCore.nextButton.innerText).toBe("Skip");
});