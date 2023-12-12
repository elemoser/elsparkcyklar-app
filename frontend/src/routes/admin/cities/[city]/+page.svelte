<script>
    // import { goto } from '$app/navigation';
    import LeafletMap from '$lib/components/LeafletMap.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
    let mapData = {};
    let check = false;
    let edit = false;

    // Delete given row from db
    async function revoveCity(id) {
        //TODO create function to remove city
    }

    if (data.props.data.bounds) {
        mapData['polygon'] = {
            text: data.props.data.name,
            coordinates: data.props.data.bounds
        };
    }
</script>

{#if data.props.data.error }
    <p>{ data.props.data.error }</p>
{:else}
    <h2>Detaljer för Stad { data.props.target }</h2>
    <form method="POST">
        <label for="id">Id
            <input id="id" name="id" type="text" value={ data.props.data.id } readonly/>
        </label>
        <label for="name">Namn
            <input id="name" name="name" type="text" value={ data.props.data.name } readonly={!edit}/>
        </label>
        {#if edit}
            <input type="submit" value="Spara"/>
        {/if}
    </form>
    {#if check}
        <p>Är du säker på att du vill ta bort denna stad från databasen?</p>
        <button on:click={ removeCity(data.props.data.id) }>Radera</button>
        <button on:click={ () => check = false }>Avbryt</button>
    {:else if edit}
        <button on:click={ () => edit = false }>Avbryt</button>
    {:else}
    <button on:click={ () => check = true }>Ta bort</button>
    <button on:click={ () => edit = true }>Redigera</button>
    <button><a href="/admin/cities">Avbryt</a></button>
    {/if}
    <LeafletMap data={ mapData }/>
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