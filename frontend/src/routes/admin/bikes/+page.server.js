
export async function load({ fetch }) {
    // Get all users from the API
    const response = await fetch(`http://server:1338/v1/bikes`);
    const data = await response.json();
    return { props: { data } };
}
