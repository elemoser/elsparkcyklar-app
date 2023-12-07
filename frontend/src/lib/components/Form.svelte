<script>
    export let data = {};
    // NOTE: format of data should be as follows
    // data = {
    //     key1: value1,
    //     key2: value2
    // }
    let edit = false;
    const readonlyList = ['id'];
</script>

{#if !edit}
<form>
    {#each Object.entries(data) as [key, value]}
        <label for="key">{ key }
            <input id={ key } type="text" value={ value } readonly/>
        </label>
    {/each}
    <input type="submit" value="Ta bort">
</form>
<button on:click={() => edit = true}>Redigera</button>
{:else}
<form>
    {#each Object.entries(data) as [key, value]}
        <label for="key">{ key }
        {#if key.includes('mail')}
            <input id={ key } type="email" value={ value }/>
        {:else if readonlyList.includes(key)}
            <input id={ key } type="text" value={ value } readonly/>
        {:else}
            <input id={ key } type="text" value={ value }/>
        {/if}
        </label>
    {/each}
    <input type="submit" value="Spara"/>
</form>
<button on:click={() => edit = false}>Avbryt</button>
{/if}

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
        
        input:read-only:not([type=submit]) {
            color: $dark-color;
            border: none;
        }

        input:focus {
            outline: none;
        }
    }
</style>
