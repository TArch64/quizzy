import {mount} from "@vue/test-utils";
import Heading from "../heading";

function mountComponent({ level, content } = {}) {
    return mount(Heading, {
        props: {
            level: level ?? 2
        },
        slots: {
            default: content ?? 'test'
        }
    });
}

describe('render', () => {
    test('should render tag by level', () => {
        const wrapper = mountComponent({ level: 3 });

        expect(wrapper.element.tagName).toBe('H3');
    });

    test('should render tag content', () => {
        const wrapper = mountComponent({ content: 'hello world' });

        expect(wrapper.text()).toBe('hello world');
    });
});
