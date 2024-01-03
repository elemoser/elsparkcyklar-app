import { get, writable } from 'svelte/store';

export const user = writable({});

export const getUser = () => {
	return get(user);
};

export function setUser(userObj) {
	user.set(userObj);
}

export function updateUser(updated) {
	user.update((current) => {
		return { ...current, ...updated };
	});
}
