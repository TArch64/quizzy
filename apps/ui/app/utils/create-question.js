import {v4 as uuid} from "uuid";
import {createAnswer} from "./create-answer";

export function createQuestion() {
    const answers = [
        createAnswer(),
        createAnswer(),
        createAnswer(),
        createAnswer()
    ];

    return {
        id: uuid(),
        text: '',
        answers,
        correctId: answers[0].id
    };
}
