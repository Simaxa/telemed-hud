import jwt from 'jsonwebtoken';

const SECRET = 'hemmelig_nøgle'; // Skal matche login-siden

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const token = event.cookies.get('session');

	if (token) {
		try {
			const user = jwt.verify(token, SECRET);
			event.locals.user = user; // Gem info om brugeren
		} catch (err) {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return await resolve(event);
}
