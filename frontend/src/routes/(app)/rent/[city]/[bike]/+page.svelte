<script>
	export let data;
	const { cityId } = data;
	const { bike } = data;
</script>

<h2>Bike {bike.id}</h2>
<!-- TODO importera kartan och rita ut var cykeln befinner sig med hjälp av cykelns coords. -->
<p>Battery: {bike.battery}%</p>
<p>Status: {bike.state}</p>

<form method="POST" action="?/rent">
	<!-- TODO add action to rent bike. -->
	<button class="button" type="submit" value={bike.id}>Rent</button>
</form>
<!--
	is user subscriber? else pay upfront to rent
	to pay up front does the user have sufficient funds?
-->
<a href="/rent/{cityId}">Tillbaka</a>

<style lang="scss">
	a {
		color: $text-color;
		&:hover {
			cursor: pointer;
			text-decoration: none;
		}
	}

	.button {
		border: 1px solid $con-border-col;
		margin-bottom: $calculated-line-height;
	}
</style>
