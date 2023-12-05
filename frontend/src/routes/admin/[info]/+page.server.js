
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
    let data;
    let target = params.info;

    // console.log(params.info);
    // If first character is 'k' => get user data
    if (params.info.charAt(0) === 'k') {
        try {
            const response = await fetch(`http://server:1338/v1/users/id/${params.info.slice(1)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            data = await response.json();
            data = data.user;
        } catch (error) {
            console.error('Fetch error:', error.message);
            // Error
            data = { error: error.message };
        }
    } else {
        // Error if the condition is not met
        data = { error: 'Invalid parameter' };
    }

    return {
        props: { data, target }
    };
}