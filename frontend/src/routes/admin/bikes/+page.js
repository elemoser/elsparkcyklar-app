// Load function for bike view
export async function load({ fetch }) {
    let data = {};
    try {
        const responseBikes = await fetch(`http://localhost:1338/v1/bikes`, {
			method: 'GET',
			credentials: 'include'
		});
    
        if (responseBikes.status == '200') {
            const bike = await responseBikes.json();
            data['bike'] = bike.bike;
        } else {
            data['error'] = responseBikes.statusText;
        }

        const responseCities = await fetch(`http://localhost:1338/v1/city`, {
			method: 'GET',
			credentials: 'include'
		});

        if (responseCities.status == '200') {
            const city = await responseCities.json();
            data['city'] = city.city;
        } else {
            data['error'] = responseCities.statusText;
        }

        return { props: { data } };
    } catch (error) {
        console.error('Fetch error:', error.message);
        data['error'] = error.message;

        return { props: { data } };
    }
}
