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
</script>

<h1 class="text-2xl font-bold my-4">Indsend dine symptomer</h1>

<!-- Brugernavn -->
<input
	bind:value={username}
	placeholder="Brugernavn"
	class="input input-bordered my-2 block"
/>

<!-- Symptomer -->
<h2 class="font-semibold mt-4">Symptomer</h2>
<label class="block my-2">
	<input type="checkbox" bind:checked={itchy} />
	Kløe
</label>
<label class="block my-2">
	<input type="checkbox" bind:checked={redness} />
	Rødme
</label>
<label class="block my-2">
	<input type="checkbox" bind:checked={swelling} />
	Hævelse
</label>
<label class="block my-2">
	<input type="checkbox" bind:checked={dryness} />
	Tørhed
</label>
<label class="block my-2">
	<input type="checkbox" bind:checked={scaling} />
	Skællende hud
</label>

<!-- Smerte som skala -->
<label class="block my-4">
	Smerte: {pain}/10
	<input type="range" min="0" max="10" bind:value={pain} class="range range-primary" />
</label>
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
			await submit(); // brug det uploadede billede
		} else {
			message = 'Fejl ved billede-upload';
		}
	}}
>
	<label for="file-upload" class="block my-2 font-semibold">Vælg billede</label>
	<input id="file-upload" type="file" name="file" accept="image/*" required class="file-input file-input-bordered" />
	<button type="submit" class="btn btn-secondary mt-2">Upload billede og send</button>
</form>

<!-- Besked -->
<p>{message}</p>
