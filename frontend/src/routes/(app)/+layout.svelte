<script>
	import '$lib/styles/main.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	$: userData = $user;
	$: check = $page.url.pathname.startsWith('/admin');

	if ($user.error === true) {
		goto('/login');
	}
</script>

{#if check}
	<slot />
{:else}
	<Navbar {userData} />

	<div class="wrapper">
		<slot />
	</div>
{/if}
