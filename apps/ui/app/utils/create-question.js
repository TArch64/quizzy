import {createAnswer} from "@/utils/create-answer";
import {v4 as uuid} from "uuid";

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
