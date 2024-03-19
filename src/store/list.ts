import { writable } from "svelte/store";

type TListItem = { id: number; content: string };

function createListStore(initialState: Array<TListItem>) {
  let uid = initialState.length+1;
  let list: Array<TListItem> = initialState;

  const { subscribe, update } = writable(list);

  return {
    subscribe,
    add: (content: string) => {
      const item = {
        id: uid++,
        content,
      };

      update(($list) => [...$list, item]);
    },
    remove: (id: number) => {
      update(($list) => $list.filter((item) => item.id !== id));
    },
  };
}

export const list = createListStore([{ id: 1, content: "First element" }]);
