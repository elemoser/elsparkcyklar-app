<script>
	async function getUserId() {
		//Get users ID
		const respId = await fetch('http://localhost:1338/v1/users/id', {
			method: 'GET',
			credentials: 'include'
		});

		const res = await respId.json();
		sessionStorage.setItem('user', res.userId);
	}
	const storedUser = sessionStorage.getItem('user');

	if (!storedUser) {
		getUserId();
	}

	import '$lib/styles/main.scss';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<div class="wrapper">
	<slot />
</div>
