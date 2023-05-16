import {App} from "../app.js";

function createApp() {
    return new App({});
}

describe('some group', () => {
    test('should work', () => {
        expect(createApp()).toBeInstanceOf(App);
    });
});
