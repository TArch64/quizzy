import {useCollection} from "../use-collection";

describe('add item', () => {
    test('should add new item', () => {
        const collection = useCollection([]);
        const newItem = { id: 1, title: 'test' };

        collection.add(newItem);

        expect(collection.list).toHaveLength(1);
        expect(collection.list).toContainEqual(newItem);
    });

    test('should add new item', () => {
        const collection = useCollection([{ id: 1, title: 'first' }]);
        const item = { id: 2, title: 'second' };

        collection.add(item);

        expect(collection.list).toHaveLength(2);
        expect(collection.list).toContainEqual(item);
    });
});

describe('remove item', () => {
    test('should remove item', () => {
        const collection = useCollection([
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ]);

        collection.remove(2);

        expect(collection.list).toHaveLength(2);
        expect(collection.list).not.toContainEqual({ id: 2 });
    });

    test('should return removed item', () => {
        const collection = useCollection([{ id: 1 }]);
        const removed = collection.remove(1);

        expect(removed).toEqual({ id: 1 });
    });

    test('should do nothing if no item', () => {
        const collection = useCollection([{ id: 1 }]);

        collection.remove(2);

        expect(collection.list).toEqual([{ id: 1 }]);
    });
});
