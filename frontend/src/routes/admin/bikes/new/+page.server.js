import { redirect } from '@sveltejs/kit';

// This tells SvelteKit not to prerender this page
// so that we can use actions
export const prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
    // Create a new row in the db
	default: async ({request}) => {
        // Get data from form and format for API
        const formData = await request.formData();
        const lat = formData.get('lat');
        const lon = formData.get('lon');
        const data = {
            battery: formData.get('battery'),
            city_id: formData.get('city_id'),
            speed: formData.get('speed'),
            position: lat + ', ' + lon,
            state: formData.get('state')
        }
        // Use URLSearchParams to construct x-www-form-urlencoded data
        const encodedData = new URLSearchParams(data).toString();

        const response = await fetch("http://server:1338/v1/bikes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodedData,
        });

        if (response.status === 200) {
            // redirect
            throw redirect(302, '/admin/bikes');
        }  else {
            console.log('Failed to create a new bike:', response.statusText);
            //TODO error handling
        }
	}
};