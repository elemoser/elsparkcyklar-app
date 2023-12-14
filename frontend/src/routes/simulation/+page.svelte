<script>
    // import { source } from 'sveltekit-sse';
    import { onMount } from 'svelte';
    let eventSource;

    onMount(async () => {
        // eventSource = source('http://localhost:1338/v1/simulate');
        const response = await fetch('http://localhost:1338/v1/simulate');
        eventSource = await response.json();
        console.log(eventSource);
    });

    function stopUpdates() {
        if (eventSource) {
            console.log("Sim stopped");
            eventSource.close();
        }
    }

    function startUpdates() {
        if (eventSource) {
            console.log("Sim started");
            eventSource.onmessage = function(event) {
                console.log(event);
            };
        }
    }
</script>

<button on:click={startUpdates}>Start</button>
<button on:click={stopUpdates}>Stop</button>