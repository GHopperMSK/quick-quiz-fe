# Quick Quiz frontend

## Info
A web service which provides a possibility to add questionnaires to any website. Highly customizable questions and design. Rich export opportunities and in house report generator.

## Slides types
A quiz consists of several slides (steps), which of them provides information or asks a question. A user moves from one to another through chain of such slides until the very end. Eventually a report is generated and sends to a server.

The chain of the slides and each of them are configured with `json` which contain all necessary information for the quiz.

There are a few predefined slide types. Each of them serves a specific purpose. A slide may have `timeout_seconds` parameter, which defines how many seconds `Next` button will be disabled.

### Info slide
Simple information slide. May have a checkbox to make sure the user paid enough attention to it.

```json
{
    "id": INT,
    "type": "INF",
    "config": {
        "text": STRING,
        "next_slide_id": INT,
        "next_button_label": STRING,
        "confirment_label": STRING,
        "timeout_seconds": INT,
    }
}
```

### Select question
Many answers are provided but you can choose only one.

```json
{
    "id": INT,
    "type": "SLT",
    "config": {
        "question": STRING,
        "options": {
            ID: {
                "next_slide_id": INT,
                "label": STRING,
                "is_default": BOOL
            },
            ID: {
                "next_slide_id": INT,
                "label": STRING,
                "is_default": BOOL
            },
            ID: {
                "next_slide_id": INT,
                "label": STRING,
                "is_default": BOOL
            },
        },
        "button_label": STRING,
        "skippable": BOOL
    }
}

```

### Multi question
Many answers are provided and you can choose many of them.

```json
{
    "id": INT,
    "type": "MLT",
    "config": {
        "question": STRING,
        "options": {
            ID: {
                "label": STRING
            },
            ID: {
                "label": STRING
            },
            ID: {
                "label": STRING
            },
        },
        "button_label": STRING,
        "next_slide_id": INT,
        "skippable": BOOL,
        "min_options_count": INT
    }
}
```

### Open question
You can type your own anwser.

```json
{
    "id": INT,
    "type": "OPQ",
    "config": {
        "question": STRING,
        "next_slide_id": INT,
        "button_label": STRING,
        "skippable": BOOL,
        "text_form": FORM_INPUT | FORM_TEXTAREA,
        "min_character_count": INT
    }
}
```

### Scale slide
An opportunity to evaluate something on scale.

```json
{
    "id": INT,
    "type": "SCL",
    "config": {
        "question": STRING,
        "next_slide_id": INT,
        "min_value": FLOAT,
        "max_value": FLOAT,
        "step_size": FLOAT,
        "button_label": STRING,
        "skippable": BOOL,
        "text_form": FORM_INPUT | FORM_TEXTAREA,
        "min_character_count": INT
    }
}
```
