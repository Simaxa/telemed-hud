import dotenv from 'dotenv';
dotenv.config();

import { put } from '@vercel/blob';

export async function POST({ request }) {
	const formData = await request.formData();
	const file = formData.get('file');

	if (!file || file.name === 'undefined') {
		return new Response('Du skal vælge en fil!', { status: 400 });
	}

	const { url } = await put(`images/${file.name}`, file, {
		access: 'public',
		token: process.env.BLOB_READ_WRITE_TOKEN
	});

	return new Response(url, { status: 201 });
}
