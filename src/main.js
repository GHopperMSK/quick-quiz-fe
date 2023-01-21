import QuickQuizCore from './core/QuickQuizCore.js';

window.addEventListener(QuickQuizCore.EVENT_INIT_TYPE, (event) => {
    try {
        window.quickQuiz = new QuickQuizCore(
            event.detail.quiz_uuid,
            event.detail.root_element,
            event.detail.lang,
            event.detail.report_callback,
            event.detail.server_url
        );
    } catch (error) {
        console.error("Couldn't initialize QuickQuizCore object!");
    }
});