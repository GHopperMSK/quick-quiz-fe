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
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "INF slide",
    "description": "A quiz slide type INF",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier of the slide",
            "type": "integer"
        },
        "type": {
            "const": "INF"
        },
        "config": {
            "type": "object",
            "properties": {
                "text": {
                    "description": "Text which will be shown on the slide",
                    "type": "string"
                },
                "next_slide_id": {
                    "description": "A slide unique identifier whick will be shown after `Next` button is pressed",
                    "type": ["integer", "null"]
                },
                "next_button_label": {
                    "description": "Next button label",
                    "type": "string"
                },
                "agreement_label": {
                    "description": "Agreement text. If exists, the agreement checkbox will be shown and one have to check it in order to be able to move to a next slide",
                    "type": "string"
                },
                "timeout_seconds": {
                    "description": "The `next` button will be disabled to this amount of seconds",
                    "type": "integer"
                },
                "skippable": {
                    "description": "Shows whether the slide may be skipped or not",
                    "type": "boolean"
                }
            },
            "required": ["text", "next_slide_id"]
        }
    },
    "required": ["id", "type", "config"]
}
```

### Select question
Many answers are provided but you can choose only one.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "SLT slide",
    "description": "A quiz slide type SLT",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier of the slide",
            "type": "integer"
        },
        "type": {
            "const": "SLT"
        },
        "config": {
            "type": "object",
            "properties": {
                "question": {
                    "description": "The question which will be shown on the slide",
                    "type": "string"
                },
                "options": {
                    "description": "The question which will be shown on the slide",
                    "type": "object",
                    "properties": {
                        "next_slide_id": {
                            "description": "A slide unique identifier whick will be shown after `Next` button is pressed",
                            "type": ["integer", "null"]
                        },
                        "next_button_label": {
                            "description": "Next button label when this option is selected",
                            "type": "string"
                        },
                        "label": {
                            "description": "The option text",
                            "type": "string"
                        }
                    },
                    "patternProperties": {
                        "^[0-9]+$": { "type": "object" }
                    },
                    "additionalProperties": false,
                    "required": ["next_slide_id", "label"]
                },
                "default_next_button_label": {
                    "description": "Next button label",
                    "type": "string"
                },
                "timeout_seconds": {
                    "description": "The `next` button will be disabled to this amount of seconds",
                    "type": "integer"
                },
                "skippable": {
                    "description": "Shows whether the slide may be skipped or not",
                    "type": "boolean"
                }
            },
            "required": ["question", "options"]
        }
    },
    "required": ["id", "type", "config" ]
}
```

### Multi question
Many answers are provided and you can choose many of them.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "MLT slide",
    "description": "A quiz slide type MLT",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier of the slide",
            "type": "integer"
        },
        "type": {
            "const": "MLT"
        },
        "config": {
            "type": "object",
            "properties": {
                "question": {
                    "description": "The question which will be shown on the slide",
                    "type": "string"
                },
                "options": {
                    "description": "The question which will be shown on the slide",
                    "type": "object",
                    "properties": {
                        "label": {
                            "description": "The option text",
                            "type": "string"
                        }
                    },
                    "patternProperties": {
                        "^[0-9]+$": { "type": "object" }
                    },
                    "additionalProperties": false,
                    "required": ["label"]
                },
                "next_slide_id": {
                    "description": "A slide unique identifier whick will be shown after `Next` button is pressed",
                    "type": ["integer", "null"]
                },
                "next_button_label": {
                    "description": "Next button label",
                    "type": "string"
                },
                "timeout_seconds": {
                    "description": "The `next` button will be disabled to this amount of seconds",
                    "type": "integer"
                },
                "skippable": {
                    "description": "Shows whether the slide may be skipped or not",
                    "type": "boolean"
                },
                "min_options_count": {
                    "description": "One has to check that many options in order to move forward",
                    "type": "integer"
                }
            },
            "required": ["question", "options", "next_slide_id"]
        }
    },
    "required": ["id", "type", "config"]
}
```

### Open question
You can type your own anwser.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "OPQ slide",
    "description": "A quiz slide type OPQ",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier of the slide",
            "type": "integer"
        },
        "type": {
            "const": "OPQ"
        },
        "config": {
            "type": "object",
            "properties": {
                "question": {
                    "description": "The question which will be shown on the slide",
                    "type": "string"
                },
                "next_slide_id": {
                    "description": "A slide unique identifier whick will be shown after `Next` button is pressed",
                    "type": ["integer", "null"]
                },
                "text_form_type": {
                    "description": "Defines the form shape",
                    "type": "string",
                    "enum": ["input", "textarea"]
                },
                "next_button_label": {
                    "description": "Next button label",
                    "type": "string"
                },
                "timeout_seconds": {
                    "description": "The `next` button will be disabled to this amount of seconds",
                    "type": "integer"
                },
                "skippable": {
                    "description": "Shows whether the slide may be skipped or not",
                    "type": "boolean"
                },
                "min_character_count": {
                    "description": "One has to type that many characters in order to move forward",
                    "type": "integer"
                }
            },
            "required": ["question", "next_slide_id", "text_form"]
        }
    },
    "required": ["id", "type", "config" ]
}
```

### Rate slide
An opportunity to evaluate something on scale.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "RTE slide",
    "description": "A quiz slide type RTE",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier of the slide",
            "type": "integer"
        },
        "type": {
            "const": "RTE"
        },
        "config": {
            "type": "object",
            "properties": {
                "text": {
                    "description": "The text which will be shown on the slide",
                    "type": "string"
                },
                "next_slide_id": {
                    "description": "A slide unique identifier whick will be shown after `Next` button is pressed",
                    "type": ["integer", "null"]
                },
                "min_value": {
                    "description": "Minimal possible value",
                    "type": "number"
                },
                "max_value": {
                    "description": "Maximum possible value",
                    "type": "number"
                },
                "next_button_label": {
                    "description": "Next button label",
                    "type": "string"
                },
                "timeout_seconds": {
                    "description": "The `next` button will be disabled to this amount of seconds",
                    "type": "integer"
                },
                "skippable": {
                    "description": "Shows whether the slide may be skipped or not",
                    "type": "boolean"
                }
            },
            "required": ["text", "next_slide_id"]
        }
    },
    "required": ["id", "type", "config" ]
}
```
