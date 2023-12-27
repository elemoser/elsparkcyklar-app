// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
	let data = {};
	let target = params.info;

	if (target) {
		try {
			const response = await fetch(`http://localhost:1338/v1/parking/id/${target}`, {
				method: 'GET',
				credentials: 'include'
			});
			if (response.status == '200') {
				let parking = await response.json();
				data['parking'] = parking.parking;
			} else {
				data['error'] = response.statusText;
			}

            const responseCharger = await fetch(`http://localhost:1338/v1/charger`, {
				method: 'GET',
				credentials: 'include'
			});
			if (responseCharger.status == '200') {
				let chargers = await responseCharger.json();
				data['chargers'] = chargers.chargers;
			} else {
				data['error'] = responseCharger.statusText;
			}
		} catch (error) {
			console.error('Fetch error:', error.message);
			data['error'] = error.message;
		}
	} else {
		// Error if the condition is not met
        data['error'] = 'Invalid parameter';
	}

	return {
		props: { data, target }
	};
}

//import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
/*
export const actions = {
    // Update given row in db
	default: async ({request}) => {
		// Get data from form and format for API
        const formData = await request.formData();
        const bikeId = formData.get('id');
        const lat = formData.get('lat');
        const lon = formData.get('lon');
        let state = formData.get('state');
        let newState = formData.get('new_state');
        if (state != newState ) {
            state = newState;
        }
        const data = {
            battery: formData.get('battery'),
            city_id: formData.get('city_id'),
            speed: formData.get('speed'),
            position: lat + ', ' + lon,
            state: state
        }
        // Use URLSearchParams to construct x-www-form-urlencoded data
        const encodedData = new URLSearchParams(data).toString();
        const response = await fetch(`http://server:1338/v1/bikes/id/${bikeId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodedData,
        });
        if (response.status === 200) {
            // redirect
            throw redirect(302, '/admin/bikes/');
        }  else {
            console.log(`Failed to update bike ${bikeId}:`, response.statusText);
            //TODO error handling
        }
	}
};
*/