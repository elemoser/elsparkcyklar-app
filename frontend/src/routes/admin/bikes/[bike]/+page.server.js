
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let data;
    let target = params.bike;


    // console.log(target);
    if (target) {
        try {
            const response = await fetch(`http://server:1338/v1/bikes/id/${target}`);
            if (response.status == '200') {
                data = await response.json();
                data = data.bike;
            } else {
                data['error'] = responseCities.statusText;
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

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		// TODO log the user in
	}
};
