import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
	const { username, password } = await request.json();

	const found = await db.query.user.findFirst({
		where: eq(user.username, username)
	});

	if (!found) {
		return new Response('Bruger ikke fundet', { status: 404 });
	}

	const isValid = await bcrypt.compare(password, found.password);

	if (!isValid) {
		return new Response('Forkert kodeord', { status: 401 });
	}

	return new Response('Login OK', { status: 200 });
}
