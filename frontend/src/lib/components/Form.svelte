<script>
    export let data = {};
    let edit = false;
    // NOTE: format of data should be as follows
    // data = {
    //     key1: value1,
    //     key2: value2
    // }
</script>

{#if !edit}
<form>
    {#each Object.entries(data) as [key, value]}
        <label for="key">{ key }
            <input id={ key } type="text" value={ value } readonly>
        </label>
    {/each}
    <input type="submit" value="Ta bort">
    <button on:click={() => edit = true}>Redigera</button>
</form>
{:else}
<form>
    {#each Object.entries(data) as [key, value]}
        <label for="key">{ key }
        {#if key.includes('mail')}
            <input id={ key } type="email" value={ value }>
        {:else}
            <input id={ key } type="text" value={ value }>
        {/if}
        </label>
    {/each}
    <input type="submit" value="Spara">
    <button on:click={() => edit = false}>Avbryt</button>
</form>
{/if}

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            width: fit-content;
        }
    }
</style>