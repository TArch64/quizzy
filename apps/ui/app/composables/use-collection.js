import { reactive, ref } from "vue";

export function useCollection(initial = []) {
    const list = ref(initial);
    const add = (item) => list.value = list.value.concat(item);

    const findIndex = (id) => list.value.findIndex(i => i.id === id);

    function remove(id) {
        const index = findIndex(id);

        if (index === -1) return null;

        const removed = list.value[index];
        const updated = list.value.slice();
        updated.splice(index, 1);
        list.value = updated;
        return removed;
    }

    function update(id, attrs) {
        const index = findIndex(id);
        const updated = list.value.slice();
        const updatedItem = {...updated[index], ...attrs};
        updated.splice(index, 1, updatedItem);
        list.value = updated;
        return updatedItem;
    }

    return reactive({ list, add, remove, update });
}
