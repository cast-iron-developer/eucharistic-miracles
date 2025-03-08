<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '../../../app.css';
	import Navbar from '$lib/components/globals/navigation/site/navbar.svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	const authenticated: boolean = $derived.by(() => {
		return !!(data.session && data.user);
	});

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Navbar isAdmin={false} isAuthenticated={authenticated}></Navbar>
<main class="admin font-montserrat bg-backgroundWhite h-[calc(100vh-76px)]">
	{@render children()}
</main>
