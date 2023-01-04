import SlideFactory from '../../src/SlideFactory.js';
import BaseSlide from '../../src/slides/BaseSlide/BaseSlide.js';
import InfoSlide from '../../src/slides/InfoSlide/InfoSlide.js';
import MultiQuestion from '../../src/slides/MultiQuestion/MultiQuestion.js';
import OpenQuestion from '../../src/slides/OpenQuestion/OpenQuestion.js';
import RateSlide from '../../src/slides/RateSlide/RateSlide.js';
import SelectQuestion from '../../src/slides/SelectQuestion/SelectQuestion.js';

test("createSlide returns InfoSlide", () => {
    const rawSlideData = `{
        "id": 1,
        "type": "${BaseSlide.INFO_SLIDE}",
        "config": {}
    }`;
    const slideData = JSON.parse(rawSlideData);
    const slide = SlideFactory.createSlide(slideData)
    expect(slide instanceof InfoSlide).toBe(true);
});

test("createSlide returns MultiQUestion", () => {
    const rawSlideData = `{
        "id": 1,
        "type": "${BaseSlide.MULTI_QUESTION}",
        "config": {}
    }`;
    const slideData = JSON.parse(rawSlideData);
    const slide = SlideFactory.createSlide(slideData)
    expect(slide instanceof MultiQuestion).toBe(true);
});

test("createSlide returns OpenQuestion", () => {
    const rawSlideData = `{
        "id": 1,
        "type": "${BaseSlide.OPEN_QUESTION}",
        "config": {}
    }`;
    const slideData = JSON.parse(rawSlideData);
    const slide = SlideFactory.createSlide(slideData)
    expect(slide instanceof OpenQuestion).toBe(true);
});

test("createSlide returns RateSlide", () => {
    const rawSlideData = `{
        "id": 1,
        "type": "${BaseSlide.RATE_SLIDE}",
        "config": {}
    }`;
    const slideData = JSON.parse(rawSlideData);
    const slide = SlideFactory.createSlide(slideData)
    expect(slide instanceof RateSlide).toBe(true);
});

test("createSlide returns SelectQuestion", () => {
    const rawSlideData = `{
        "id": 1,
        "type": "${BaseSlide.SELECT_QUESTION}",
        "config": {}
    }`;
    const slideData = JSON.parse(rawSlideData);
    const slide = SlideFactory.createSlide(slideData)
    expect(slide instanceof SelectQuestion).toBe(true);
});