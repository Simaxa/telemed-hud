import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
	const { username, password } = await request.json();

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await db.insert(user).values({
			username,
			password: hashedPassword
		});
		return new Response('Bruger oprettet', { status: 201 });
	} catch (err) {
		console.error(err);
		return new Response('Fejl ved oprettelse', { status: 500 });
	}
}
