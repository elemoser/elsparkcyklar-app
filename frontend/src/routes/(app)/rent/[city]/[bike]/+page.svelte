<script>
	export let data;
	const { cityId } = data;
	const { bike } = data;
</script>

<h2>Bike {bike.id}</h2>
<!-- TODO importera kartan och rita ut var cykeln befinner sig med hjälp av cykelns coords. -->
<p>Battery: {bike.battery}%</p>
<p>Status: {bike.state}</p>
<!-- TODO En hyrknapp som låter användaren hyra cykeln -->
<a href="/rent/{cityId}">Tillbaka</a>

<style lang="scss">
	a {
		color: $text-color;
		&:hover {
			cursor: pointer;
			text-decoration: none;
		}
	}
</style>
