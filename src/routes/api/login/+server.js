import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';

const SECRET = 'hemmelig_nøgle'; // Eller brug process.env.JWT_SECRET

export async function POST({ request, cookies }) {
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

	// JWT og cookie
	const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

	cookies.set('session', token, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 // 1 time
	});

	return json({ message: 'Login OK' });
}
