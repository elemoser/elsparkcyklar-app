<script>
    import Table from '$lib/components/Table.svelte';

    // Get data
    let test = {
        header: [
            "col1",
            "col2"
        ],
        body: {
            0: ["cell1", "cell2"],
            1: ["cell3", "cell4"]
        }
    }
</script>

<form>
    <input type="text">
    <input type="submit">
</form>

<Table data={ test }/>