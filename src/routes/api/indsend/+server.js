import { db } from '$lib/server/db';
import { submission } from '$lib/server/db/schema';

export async function POST({ request }) {
	const {
		username,
		imageUrl,
		itchy,
		redness,
		swelling,
		pain,
		dryness,
		scaling
	} = await request.json();

	// 🔍 Beregn vurdering først
	let score = 0;
	if (itchy) score += 1;
	if (redness) score += 1;
	if (swelling) score += 1;
	if (dryness) score += 1;
	if (scaling) score += 1;
	if (pain >= 7) score += 2;
	else if (pain >= 4) score += 1;

	let vurdering = 'Lav prioritet';
	if (score >= 6) vurdering = 'Høj prioritet';
	else if (score >= 3) vurdering = 'Middel prioritet';

	try {
		await db.insert(submission).values({
			username,
			imageUrl,
			itchy,
			redness,
			swelling,
			pain: parseInt(pain),
			dryness,
			scaling,
			assessment: vurdering
		});

		return new Response(`Indsendelse gemt! Vurdering: ${vurdering}`, { status: 201 });
	} catch (err) {
		console.error(err);
		return new Response('Fejl ved indsending', { status: 500 });
	}
}
