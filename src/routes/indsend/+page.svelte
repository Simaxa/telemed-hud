<script>
	let username = '';
	let itchy = false;
	let redness = false;
	let swelling = false;
	let pain = 0;
	let dryness = false;
	let scaling = false;
	let imageUrl = '';
	let message = '';

	const submit = async () => {
		const res = await fetch('/api/indsend', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				imageUrl,
				itchy,
				redness,
				swelling,
				pain,
				dryness,
				scaling
			})
		});
		message = await res.text();
	};

	const logout = async () => {
		await fetch('/logud', {
			method: 'POST'
		});
		window.location.href = '/login';
	};
</script>

<!-- CENTRERET CONTAINER -->
<div class="max-w-xl mx-auto px-4">
	<h1 class="text-2xl font-bold my-4 text-center">Indsend dine symptomer</h1>

	<!-- Brugernavn -->
	<input bind:value={username} placeholder="Brugernavn" class="input input-bordered my-2 block w-full" />

	<!-- Symptomer -->
	<h2 class="font-semibold mt-4">Symptomer</h2>
	<label class="block my-2"><input type="checkbox" bind:checked={itchy} /> Kløe</label>
	<label class="block my-2"><input type="checkbox" bind:checked={redness} /> Rødme</label>
	<label class="block my-2"><input type="checkbox" bind:checked={swelling} /> Hævelse</label>
	<label class="block my-2"><input type="checkbox" bind:checked={dryness} /> Tørhed</label>
	<label class="block my-2"><input type="checkbox" bind:checked={scaling} /> Skællende hud</label>

	<!-- Smerte -->
	<label class="block my-4">
		Smerte: {pain}/10
		<input type="range" min="0" max="10" bind:value={pain} class="range range-primary w-full" />
	</label>

	<!-- BILLEDEUPLOAD -->
	<form
		enctype="multipart/form-data"
		on:submit|preventDefault={async (e) => {
			const formData = new FormData(e.target);
			const uploadRes = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (uploadRes.ok) {
				imageUrl = await uploadRes.text();
				await submit();
			} else {
				message = 'Fejl ved billede-upload';
			}
		}}
	>
		<label for="file-upload" class="block my-2 font-semibold">Vælg billede</label>
		<input id="file-upload" type="file" name="file" accept="image/*" required class="file-input file-input-bordered w-full" />
		<button type="submit" class="btn btn-secondary mt-2 w-full">Upload billede og send</button>
	</form>

	<!-- Besked -->
	<p class="my-4 text-center">{message}</p>

	<!-- LOG UD KNAP NEDERST -->
	<div class="mt-10 flex justify-center">
		<button on:click={logout} class="btn btn-error">Log ud</button>
	</div>
</div>
