<script>
    import LeafletMap from '$lib/components/LeafletMap.svelte';
    // All filter options
    export let filterOptions = [
        "Kund",
        "Cykel",
        "Stad",
        "Parkering",
        "Laddstation",
        "Bokning"
    ]
</script>

<form>
    <input type="text">
    {#each filterOptions as filter}
        <label>
            <input type="checkbox">
            { filter }
        </label>
    {/each}
    <input type="submit">
</form>
<LeafletMap />
