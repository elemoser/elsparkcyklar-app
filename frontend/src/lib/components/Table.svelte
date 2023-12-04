<script>
    export let data = {};
</script>

{#if data}
<table>
    <thead>
        <tr>
        {#each data.header as col}
          <th>{ col }</th>
        {/each}
        </tr>
    </thead>
    <tbody>
        {#each Object.values(data.body) as row}
        <tr>
            {#each row as cell}
                <td>{ cell }</td>
            {/each}
        </tr>
        {/each}
    </tbody>
</table>
{:else}
<p>Loading...</p>
{/if }

<style lang="scss">
    table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    td, th {
    border: 1px solid $light-color;
    text-align: left;
    padding: 8px;
    }

    // tr:nth-child(even) {
    // background-color: $light-color;
    // }
</style>