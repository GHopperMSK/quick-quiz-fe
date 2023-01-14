/**
 * @jest-environment jsdom
 */

import QuickQuizCore from '../../src/core/QuickQuizCore.js';

global.fetch = require('jest-fetch-mock');

beforeEach(() => {
    fetch.mockClear();
});

test("Correct control initialization with agreement required", () => {
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
    fetch.mockResponseOnce(rawData);
    document.getElementById = jest.fn().mockImplementation(function(id) { return document.createElement("div"); });

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    setTimeout(() => {
        expect(quickQuizCore.prevButton.disabled).toStrictEqual(true);
        expect(quickQuizCore.prevButton.innerText).toBe(QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL);
        expect(quickQuizCore.nextButton.disabled).toStrictEqual(true);
        expect(quickQuizCore.nextButton.innerText).toBe(QuickQuizCore.DEFAULT_NEXT_BUTTON_LABEL);
    }, 1);
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
    fetch.mockResponseOnce(rawData);

    let rootElement = document.createElement("div");
    const quickQuizCore = new QuickQuizCore(1, 2, rootElement);
    setTimeout(() => {
        expect(quickQuizCore.prevButton.disabled).toStrictEqual(true);
        expect(quickQuizCore.prevButton.innerText).toBe(QuickQuizCore.DEFAULT_PERV_BUTTON_LABEL);
        expect(quickQuizCore.nextButton.disabled).toStrictEqual(false);
        expect(quickQuizCore.nextButton.innerText).toBe(QuickQuizCore.DEFAULT_SKIP_BUTTON_LABEL);
    }, 1);
});