/** @type {import('./$types').RequestHandler} */
export async function POST() {
	return new Response('Logget ud', {
		status: 200,
		headers: {
			'Set-Cookie': 'username=; Path=/; Max-Age=0'
		}
	});
}
