// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let data;
    let target = params.city;

    if (target) {
        try {
            const response = await fetch(`http://server:1338/v1/city/id/${target}`);
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