<script>
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	export let data;

	let { history } = data;

	//Ugly fix to handle case when only 1 exists (non-iterable).
	if (!Array.isArray(history)) {
		history = [history];
	}

	//TODO make responsive.

	let rowTracker = null;

	function showDetails(rowId) {
		if (rowTracker === rowId) {
			rowTracker = null;
		} else {
			rowTracker = rowId;
		}
	}
</script>

<div class="log-wrapper">
	<h1>Travel history</h1>
	{#each history as log}
		<div class="row-box">
			<div class="log-row">
				<div class="row-date">
					<p>{log.start_time.slice(0, 11)}</p>
					<p>{log.start_time.slice(11,16)}</p>
					<p>-</p>
					<p>{log.stop_time.slice(11,16)}</p>
				</div>
				<button on:click={() => showDetails(log.id)}
					>{rowTracker === log.id ? 'Hide details' : 'View details'}</button
				>
			</div>
			{#if rowTracker === log.id}
				<div class="details-box">
					<LeafletMap />
					<!-- TODO Add so you can pass coords to map to generate markers? -->
					<div class="info-dump">
						<h5>ID: {log.id}</h5>
						<h5>Time: {log.start_time.slice(11,16)}-{log.stop_time.slice(11,16)}</h5>
						<h5>Date: {log.start_time.slice(0, 11)}</h5>
						<h5>Price: {log.price}</h5>
						<h5>From: {log.start_location}</h5>
						<h5>To: {log.stop_location}</h5>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.log-wrapper {
		margin: 0 auto;
		max-width: 75em;
	}

	.row-box {
		border-bottom: 1px solid $text-color;
		margin-bottom: $calculated-line-height;
	}

	.log-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.25em;

		p {
			margin-bottom: 0;
		}

		button {
			background-color: unset;
			border: unset;
			font-family: $header-font;
			font-weight: 700;
			font-size: $base-font-size;
			text-decoration: underline;

			&:hover {
				cursor: pointer;
				text-decoration: none;
			}
		}
	}

	.row-date {
		display: flex;

		p:first-of-type {
			padding-right: 1em;
		}
	}

	.details-box {
		padding: $calculated-line-height;
		max-width: 50rem;
		margin: 0 auto;
	}

	.info-dump {
		margin-top: $calculated-line-height;
		h5 {
			color: black;
			margin-bottom: calc($calculated-line-height / 2);
		}
	}
</style>
