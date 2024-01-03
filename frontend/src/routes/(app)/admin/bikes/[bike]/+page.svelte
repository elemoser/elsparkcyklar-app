<script>
	import { goto } from '$app/navigation';
	import LeafletMap from '$lib/components/LeafletMap.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let mapData = {};
	let check = false;
	let edit = false;
	// All statuses allowed
	const statusOptions = ['available', 'occupied', 'disabled'];
	// TODO add control for valid position within city

	// Delete given row from db
	//TODO error because bike id are linked in other table in db
	async function removeBike(id) {
		// Note that localhost instead of server needs to be used here
		const response = await fetch(`http://localhost:1338/v1/bikes/id/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.status === 200) {
			// redirect
			goto('/admin/bikes');
		} else {
			console.log(`Failed to delete bike ${id}:`, response.statusText);
			data.props.data.error = `Failed to delete bike ${id}: ${response.statusText}`;
		}
	}

	if (data.props.data.position) {
		mapData['markers'] = {
			0: {
				text: `Bike ${data.props.data.id} (${data.props.data.state})`,
				coordinates: [
					data.props.data.position.split(', ')[0],
					data.props.data.position.split(', ')[1]
				],
				state: data.props.data.state
			}
		};
	}

	async function updateBike(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const bikeId = formData.get('id');
		const lat = formData.get('lat');
		const lon = formData.get('lon');
		let state = formData.get('state');
		let newState = formData.get('new_state');

		if (state != newState) {
			state = newState;
		}

		const data = {
			battery: formData.get('battery'),
			city_id: formData.get('city_id'),
			speed: formData.get('speed'),
			position: lat + ', ' + lon,
			state: state
		};

		const encodedData = new URLSearchParams(data).toString();

		const response = await fetch(`http://localhost:1338/v1/bikes/id/${bikeId}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedData
		});

		if (response.status === 200) {
			// redirect
			goto('/admin/bikes/');
		} else {
			console.log(`Failed to update bike ${bikeId}:`, response.statusText);
			data.props.data.error = `Failed to update bike ${bikeId}: ${response.statusText}`;
		}
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<div class="table-top-bar">
		<h2>Detaljer för cykeln {data.props.target}</h2>
		<a class="btn-link" href="/admin/bikes"><button>x</button></a>
	</div>
	<form class="submit-form" on:submit={updateBike}>
		<label for="id"
			>Cykel id
			<input id="id" name="id" type="text" value={data.props.data.id} readonly />
		</label>
		<label for="battery"
			>Batteri
			<input
				id="battery"
				name="battery"
				type="number"
				value={data.props.data.battery}
				readonly={!edit}
				max="100"
				min="0"
			/>
		</label>
		<label for="city_id"
			>Stad id
			<input
				id="city_id"
				name="city_id"
				type="text"
				value={data.props.data.city_id}
				readonly={!edit}
			/>
		</label>
		<label for="speed"
			>Hastighet
			<input
				id="speed"
				name="speed"
				type="number"
				value={data.props.data.speed}
				readonly={!edit}
				max="60"
				min="0"
			/>
		</label>
		<label for="lat"
			>Latitud
			<input
				id="lat"
				name="lat"
				type="number"
				value={data.props.data.position.split(', ')[0]}
				readonly={!edit}
				step="0.0001"
			/>
		</label>
		<label for="lon"
			>Longitud
			<input
				id="lon"
				name="lon"
				type="number"
				value={data.props.data.position.split(', ')[1]}
				readonly={!edit}
				step="0.0001"
			/>
		</label>
		<label for="state"
			>Status
			<input id="state" name="state" type="text" value={data.props.data.state} readonly />
		</label>
		{#if edit}
			<label for="new_state">
				Ny status
				<select id="new_state" name="new_state">
					{#each statusOptions as stat}
						<option value={stat} disabled={!edit}>{stat}</option>
					{/each}
				</select>
			</label>
			<input type="submit" value="Spara" />
		{/if}
	</form>
	{#if check}
		<button class="btn-light" on:click={removeBike(data.props.data.id)}>Radera</button>
		<div class="check">
			<p>Är du säker på att du vill ta bort denna cykeln från databasen?</p>
			<button class="btn-dark" on:click={() => (check = false)}>Avbryt</button>
		</div>
	{:else if edit}
		<div class="check">
			<p>Är du säker på att du vill spara dina ändringar i databasen?</p>
			<button class="btn-dark" on:click={() => (edit = false)}>Avbryt</button>
		</div>
	{:else}
		<div>
			<button class="btn-dark" on:click={() => (edit = true)}>Redigera</button>
			<!-- <button class="btn-light" on:click={() => (check = true)}>Ta bort</button> -->
		</div>
	{/if}
	<LeafletMap data={mapData} />
{/if}

<style lang="scss">
	h2,
	p {
		color: white;
	}

	.check {
		text-align: center;
		p {
			font-size: 1rem;
		}
	}
</style>
