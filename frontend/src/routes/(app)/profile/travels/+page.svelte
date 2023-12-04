<script>
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	//TODO fetch user log data.
	//TODO make responsive.
	const logPrototype = [
		{
			id: 123123,
			startTime: '14:00',
			startLoc: [17.8960319, 59.3331329],
			endTime: '14:50',
			endLoc: [18.141117, 59.2402445],
			price: 123,
			date: '2023-12-01'
		},
		{
			id: 123456,
			startTime: '15:00',
			startLoc: [18.0014922, 59.341205],
			endTime: '16:50',
			endLoc: [17.893114, 59.409783],
			price: 353,
			date: '2023-12-01'
		}
	];

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
	{#each logPrototype as log}
		<div class="row-box">
			<div class="log-row">
				<div class="row-date">
					<p>{log.date}</p>
					<p>{log.startTime}</p>
					<p>-</p>
					<p>{log.endTime}</p>
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
						<h5>Time: {log.startTime}-{log.endTime}</h5>
						<h5>Date: {log.date}</h5>
						<h5>Price: {log.price}</h5>
						<h5>From: {log.startLoc}</h5>
						<h5>To: {log.endLoc}</h5>
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
