<script>
    import { goto } from "$app/navigation";
    // Suggest coordinates based on city
    const coordinates = {
        '1': [59.3293, 18.0686],
        '2': [59.3099, 18.0752],
        '3': [55.6044, 13.0038],
        '4': [59.8586, 17.6389],
        '5': [58.4108, 15.6214]
    };
    // Reactive statement to ensure the coordinates update
    let selectedCity = '';
    $: lat = coordinates[selectedCity] ? coordinates[selectedCity][0] : 0;
    $: lon = coordinates[selectedCity] ? coordinates[selectedCity][1] : 0;
    // All statuses allowed
    const statusOptions = ['available','occupied','disabled']

    async function createBike(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bikeId = formData.get('id');
        const lat = formData.get('lat');
        const lon = formData.get('lon');

        const data = {
            battery: formData.get('battery'),
            city_id: formData.get('city_id'),
            speed: formData.get('speed'),
            position: lat + ', ' + lon,
            state: formData.get('state')
        }

        const encodedData = new URLSearchParams(data).toString();

        const response = await fetch("http://localhost:1338/v1/bikes", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodedData,
        });

        if (response.status === 200) {
            // redirect
            goto('/admin/bikes/');
        }  else {
            console.log(`Failed to update bike ${bikeId}:`, response.statusText);
            //TODO error handling
        }
    }
</script>


<h2>Skapa en ny cykel</h2>
<form on:submit={createBike}>
    <label for="battery">Batteri
        <input id="battery" name="battery" type="number" max="100" min="0" required/>
    </label>
    <label for="city_id">Stad id
        <input id="city_id" name="city_id" type="text" bind:value={selectedCity} required/>
    </label>
    <label for="speed">Hastighet
        <input id="speed" name="speed" type="number" value="0" max="60" min="0"/>
    </label>
    <label for="lat">Latitud
        <input id="lat" name="lat" type="number" value={ lat } step="0.0001" required/>
    </label>
    <label for="lon">Longitud
        <input id="lon" name="lon" type="number" value={ lon } step="0.0001" required/>
    </label>
    <label for="state">
        Status
        <select id="state" name="state">
            {#each statusOptions as stat}
                <option value={ stat }>{ stat }</option>
            {/each}
        </select>
    </label>
    <input type="submit" value="Spara"/>
</form>

<button><a href="/admin/bikes">Avbryt</a></button>


<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input,
        select {
            width: fit-content;
            margin-left: 0.2rem;
            padding: 0.2rem 0.4rem;
            border-radius: 5px;
        }
        
        option:disabled,
        input:read-only:not([type=submit]) {
            color: $dark-color;
            border: none;
        }

        input:focus,
        select:focus {
            outline: none;
        }
    }
</style>