<script>
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		if (response.status === 200) {
			alert('Login succesfuldt!');
			goto('/indsend'); // 👈 redirect her
		} else {
			alert('Forkert brugernavn eller password');
		}
	};
</script>

<h1 class="text-3xl font-bold m-4">Login</h1>
<input bind:value={username} placeholder="Brugernavn" class="input m-2" />
<input type="password" bind:value={password} placeholder="Kodeord" class="input m-2" />
<button class="btn btn-primary m-2" on:click={login}>Login</button>
