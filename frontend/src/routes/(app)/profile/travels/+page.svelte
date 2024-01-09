<script>
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	export let data;

	let { history } = data;

	//Ugly fix to handle case when only 1 exists (non-iterable).
	if (!Array.isArray(history) && history != undefined) {
		history = [history];
	}

	let rowTracker = null;
	let mapData;

	function showDetails(rowId) {
		if (rowTracker === rowId) {
			rowTracker = null;
		} else {
			rowTracker = rowId;
			let specificTravel = history.find((e) => e.id === rowId);

			const startCoords = specificTravel.start_location.split(', ');
			const stopCoords = specificTravel.stop_location.split(', ');

			mapData = {
				markers: {
					0: {
						text: `Start`,
						coordinates: [startCoords[0], startCoords[1]]
					},
					1: {
						text: `Stop`,
						coordinates: [stopCoords[0], stopCoords[1]]
					}
				}
			};
		}
	}
</script>

<div class="log-wrapper">
	<h1>Travel history</h1>
	{#if history && history.length > 0}
		{#each history as log}
			<div class="row-box">
				<div class="log-row">
					<div class="row-date">
						<p>{log.start_time.slice(0, 11)}</p>
						<p>{log.start_time.slice(11, 16)}</p>
						<p>-</p>
						<p>{log.stop_time.slice(11, 16)}</p>
					</div>
					<button on:click={() => showDetails(log.id)}
						>{rowTracker === log.id ? 'Hide details' : 'View details'}</button
					>
				</div>
				{#if rowTracker === log.id}
					<div class="details-box">
						<LeafletMap data={mapData} />
						<div class="info-dump">
							<h5>ID: {log.id}</h5>
							<h5>Time: {log.start_time.slice(11, 16)}-{log.stop_time.slice(11, 16)}</h5>
							<h5>Date: {log.start_time.slice(0, 11)}</h5>
							<h5>Price: {parseFloat(log.price).toFixed(2)}</h5>
							<h5>From: {log.start_location}</h5>
							<h5>To: {log.stop_location}</h5>
						</div>
					</div>
				{/if}
			</div>
		{/each}
		<a href="/profile">back</a>
	{:else}
		<p>You have not been traveling with our service :&#40;</p>
		<a href="/profile">back</a>
	{/if}
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
