<script>
	// Remove this if not used in admin/[info]
	export let data = {};
	// NOTE: format of data should be as follows
	// data = {
	//     key1: value1,
	//     key2: value2
	// }
</script>

<form>
	{#each Object.entries(data) as [key, value]}
		<label for="key"
			>{key}
			<input id={key} type="text" {value} readonly />
		</label>
	{/each}
</form>
<button><a href="/admin/delete/c{data.id}">Ta bort</a></button>
<button><a href="/admin/delete/c{data.id}">Redigera</a></button>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		input {
			width: fit-content;
			margin-left: 0.2rem;
			padding: 0.2rem 0.4rem;
			border-radius: 5px;
		}

		input:read-only:not([type='submit']) {
			color: $dark-color;
			border: none;
		}

		input:focus {
			outline: none;
		}
	}
</style>
