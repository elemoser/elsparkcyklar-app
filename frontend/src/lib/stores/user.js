import { get, writable } from "svelte/store";

export const user = writable({});

export const getUser = () => {
    return get(user);
}

export function updateUser(updatedUser) {
    user.set(updatedUser);
}