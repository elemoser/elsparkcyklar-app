<script>
	export let data = {};
	// NOTE: format of data should be as follows
	// data = {
	//     header: [
	//         "col1",
	//         "col2"
	//     ],
	//     body: {
	//         0: ["cell1", "cell2"],
	//         1: ["cell3", "cell4"]
	//     },
	//     links: {
	//         0: ["/", "text"],
	//         1: ["/route", "text"]
	//     },
	// }
</script>

{#if data.body}
	<table>
		<thead>
			<tr>
				{#each data.header as col}
					<th>{col}</th>
				{/each}
				{#if Object.keys(data.links).length}
					<th>Details</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(data.body) as [key, value]}
				<tr>
					{#each value as cell}
						<td>{cell}</td>
					{/each}
					{#if Object.keys(data.links).length}
						<td><a href={data.links[key][0]}>{data.links[key][1]}</a></td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>Loading...</p>
{/if}

<style lang="scss">
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid $light-color;
		text-align: left;
		padding: 8px;
	}

	// tr:nth-child(even) {
	// background-color: $light-color;
	// }
</style>
