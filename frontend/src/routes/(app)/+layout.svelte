<script>
	import '$lib/styles/main.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user';
	$: userData = $user;
	$: check = $page.url.pathname.startsWith('/admin');
</script>

{#if check}
	<slot />
{:else}
	<Navbar {userData} />

	<div class="wrapper">
		<slot />
	</div>
{/if}
