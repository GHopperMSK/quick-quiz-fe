import QuickQuizCore from './modules/QuickQuizCore.js';

window.addEventListener(QuickQuizCore.EVENT_INIT_TYPE, (event) => {
    window.quickQuiz = new QuickQuizCore(
        event.detail.quiz_id, 
        event.detail.website_id, 
        event.detail.root_element, 
        event.detail.report_callback
    );

    fetch('config.json')
        .then((response) => response.text())
        .then((json) => window.quickQuiz.init(json));
});