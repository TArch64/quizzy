import {v4 as uuid} from "uuid";

export const createAnswer = () => ({
    id: uuid(),
    text: ''
})
