<script> 
	let username = '';
	let password = '';

	const createUser = async () => {
		const res = await fetch('/api/admin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (res.ok) {
			alert('Bruger oprettet!');
			username = '';
			password = '';
		} else {
			alert('Noget gik galt...');
		}
	};
</script>

<h1 class="text-2xl font-bold my-4">Opret ny bruger</h1>
<input bind:value={username} placeholder="Brugernavn" class="input input-bordered m-2" />
<input type="password" bind:value={password} placeholder="Kodeord" class="input input-bordered m-2" />
<button on:click={createUser} class="btn btn-primary m-2">Opret bruger</button>

<p class="mt-4 text-sm">
	Har du allerede en bruger? 
	<a href="/login" class="text-blue-600 underline">Log ind her</a>
</p>
