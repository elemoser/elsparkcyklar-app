<script>
	import { onMount } from 'svelte';
	import '$lib/styles/main.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { updateUser } from '$lib/stores/user';

	async function getUserId() {
		//Get users ID
		const respId = await fetch('http://localhost:1338/v1/users/id', {
			method: 'GET',
			credentials: 'include'
		});

		const res = await respId.json();
		sessionStorage.setItem('user', res.userId);
	}

	onMount(async () => {
		const storedUser = sessionStorage.getItem('user');

		if (!storedUser) {
			await getUserId();
		}

		const id = sessionStorage.getItem('user');
		const response = await fetch(`http://localhost:1338/v1/users/id/${id}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();

		updateUser(res.user); //Loads once on refresh. use store to have a user and update values along with changes to user?
		//only call userData once then work towards object in frontend
	});
</script>

<Navbar />

<div class="wrapper">
	<slot />
</div>
