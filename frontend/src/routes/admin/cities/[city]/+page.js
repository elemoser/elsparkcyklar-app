// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let data;
    let target = params.city;

    if (target) {
        try {
            const response = await fetch(`http://localhost:1338/v1/city/id/${target}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.status == '200') {
                data = await response.json();
                data = data.city;
            } else {
                data['error'] = response.statusText;
            }
            
        } catch (error) {
            console.error('Fetch error:', error.message);
            data['error'] = error.message;
        }
    } else {
        // Error if the condition is not met
        data = { error: 'Invalid parameter' };
    }

    return {
        props: { data, target }
    };
}

///** @type {import('./$types').Actions} */
/*
export const actions = {
    // Update given row in db
	default: async ({request}) => {
        // TODO fix this part once osm is in db
        throw redirect(302, '/admin/cities/');
		// // Get data from form and format for API
        // const formData = await request.formData();
        // const cityId = formData.get('id');

        // const data = {
        //     name: formData.get('name'),
        //     osm: formData.get('osm'),
        // }
        // // Use URLSearchParams to construct x-www-form-urlencoded data
        // const encodedData = new URLSearchParams(data).toString();

        // const response = await fetch(`http://server:1338/v1/city/id/${cityId}`, {
        //     method: "PUT",
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: encodedData,
        // });

        // if (response.status === 200) {
        //     // redirect
        //     throw redirect(302, '/admin/cities/');
        // }  else {
        //     console.log(`Failed to update city ${cityId}:`, response.statusText);
        //     //TODO error handling
        // }
	}
};*/