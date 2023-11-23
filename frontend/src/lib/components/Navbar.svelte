<script>
    const navLinks = [
        {name: 'Home', url: '/'},
        {name: 'About', url: '/about'},
    ];
</script>

<nav>
    <ul>
        {#each navLinks as link}
            <li><a href={link.url}>{link.name}</a></li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    a {
        color: $test;
    }
</style>
