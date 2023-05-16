import * as yup from "yup";

const createQuizAnswerSchema = () => yup.object({
    id: yup.string().required().uuid(),
    text: yup.string().required()
});

const createQuizQuestionSchema = () => yup.object({
    id: yup.string().required().uuid(),
    text: yup.string().required(),
    answers: yup.array().length(4).of(createQuizAnswerSchema()),
    correctId: yup.string().uuid().required()
});

export const createQuizSchema = () => yup.object({
    questions: yup.array().min(1).of(createQuizQuestionSchema())
});
