<script>
    const statusOptions = ['available','occupied','disabled']
</script>


<h2>Skapa en ny cykel</h2>
<form method="POST">
    <label for="battery">Batteri
        <input id="battery" type="number" max="100" min="0" required/>
    </label>
    <label for="city_id">Stad id
        <input id="city_id" type="text" required/>
    </label>
    <label for="speed">Hastighet
        <input id="speed" type="number" value="0" max="60" min="0"/>
    </label>
    <label for="lat">Latitud
        <input id="lat" type="number" step="0.0001"/>
    </label>
    <label for="lon">Longitud
        <input id="lon" type="number" step="0.0001"/>
    </label>
    <label for="state">
        Status
        <select id="state" name="state" required>
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