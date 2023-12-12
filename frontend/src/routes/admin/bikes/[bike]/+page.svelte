<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let check = false;
    let edit = false;
    const statusOptions = ['available','occupied','disabled']

    async function removeBike(id) {
        console.log(id)
        // const res = await fetch(`http://server:1338/v1/bikes/id/${id}`, {
        //     method: 'DELETE'
        // }).then((res) => {
        //     console.log(res.json());
        //     goto('/admin/bikes');
        // });
    }
</script>

{#if data.props.data.error }
    <p>{ data.props.data.error }</p>
{:else}
    <h2>Detaljer för cykeln { data.props.target }</h2>
    <form method="POST">
        <label for="id">Cykel id
            <input id="id" type="text" value={ data.props.data.id } readonly/>
        </label>
        <label for="battery">Batteri
            <input id="battery" type="number" value={ data.props.data.battery } readonly={!edit} max="100" min="0"/>
        </label>
        <label for="city_id">Stad id
            <input id="city_id" type="text" value={ data.props.data.city_id } readonly={!edit}/>
        </label>
        <label for="speed">Hastighet
            <input id="speed" type="number" value={ data.props.data.speed } readonly={!edit} max="60" min="0"/>
        </label>
        <label for="lat">Latitud
            <input id="lat" type="number" value={ data.props.data.position.split(', ')[0] } readonly={!edit} step="0.0001"/>
        </label>
        <label for="lon">Longitud
            <input id="lon" type="number" value={ data.props.data.position.split(', ')[1] } readonly={!edit} step="0.0001"/>
        </label>
        <label for="state">Status
            <input id="state" type="text" value={ data.props.data.state } readonly/>
        </label>
        {#if edit}
            <label for="new_state">
                Ny status
                <select id="new_state" name="new_state">
                    {#each statusOptions as stat}
                        <option value={ stat } disabled={!edit}>{ stat }</option>
                    {/each}
                </select>
            </label>
            <input type="submit" value="Spara"/>
        {/if}
    </form>
    {#if check}
        <p>Är du säker på att du vill ta bort denna cykeln från databasen?</p>
        <button on:click={ removeBike(data.props.data.id) }>Radera</button>
        <button on:click={ () => check = false }>Avbryt</button>
    {:else if edit}
        <button on:click={ () => edit = false }>Avbryt</button>
    {:else}
    <button on:click={ () => check = true }>Ta bort</button>
    <button on:click={ () => edit = true }>Redigera</button>
    <button><a href="/admin/bikes">Avbryt</a></button>
    {/if}
{/if}


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