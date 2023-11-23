<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import { app_name } from "$lib/index.js";

    let register = false;
</script>

<Navbar/>

<h1>{app_name}</h1>
<p>Här kan du komma åt <a href="/about">om sidan</a></p>

<label>
    <input type="checkbox" bind:checked={register} />
    Registrera dig
</label>

{#if register}
<form method="POST" action="">
    <label for="fname">Förnamn</label>
	<input id="fname" type="text">
    <label for="lname">Efternamn</label>
	<input id="lname" type="text">
    <label for="email">E-post</label>
	<input id="email" type="email" required>
    <label for="pw">Lösenord</label>
	<input id="pw" type="password" required>
    <input type="button" value="Registrera">
</form>
{:else}
<form method="POST" action="">
    <label for="email">E-post</label>
	<input id="email" type="email" required>
    <label for="pw">Lösenord</label>
	<input id="pw" type="password" required>
    <input type="button" value="Skicka">
</form>
{/if}