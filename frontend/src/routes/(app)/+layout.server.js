import { redirect } from "@sveltejs/kit";

// Super basic login using cookie. 

//TODO Should probably include 'admin' under (app)

export const load = async ({cookies}) => {
    const userCookie = cookies.get('user');

    if (!userCookie || userCookie === null || userCookie === undefined) {
        throw redirect(302, '/login');
    }
};
