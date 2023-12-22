<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<h1>{$page.error.message}</h1>
	<a href="/">back</a>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100dvh;
	}
</style>
