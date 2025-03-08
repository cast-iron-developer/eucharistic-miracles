<script lang="ts">
	import { goto, invalidate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '../../../app.css';
	import Navbar from '$lib/components/globals/navigation/site/navbar.svelte';
	import DashboardNavbar from '$lib/components/globals/navigation/dashboard/dashboard-navbar.svelte';

	import { dashboardNavigation } from '$lib/components/globals/dashboard-navigation';
	import type { NavigationListType } from '$lib/utils/types/general-types.js';
	import { useDebug } from '$lib/utils/helpers/client-environment-helpers';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (!error) {
				// if we received no auth errors, navigate home.
				await goto('/admin-login');
			}

		} catch (error: any) {
			if (useDebug()) {
				console.log(error);
			}
		}
	};

	const navigation: NavigationListType = $state(dashboardNavigation);
	const authenticated: boolean = $derived.by(() => {
		return !!(data.session && data.user);
	});
	let expandDrawer: boolean = $state(false);

	onNavigate(() => {
		if (expandDrawer) expandDrawer = !expandDrawer;
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

<Navbar
	isAdmin={true}
	isAuthenticated={authenticated}
	urlParams={'dashboard'}
	logout={logout}></Navbar>
<main class="admin font-montserrat bg-backgroundWhite h-[calc(100vh-76px)]">
	<section class="grid grid-rows-1 h-full {expandDrawer ? 'grid-cols-[200px,1fr]' : 'grid-cols-[75px,1fr]'}">
		<aside class="bg-primary-700 col-span-1">
			<DashboardNavbar bind:expandDrawer={expandDrawer} navigation={navigation} />
		</aside>
		<section class="col-span-1 col-start-2 overflow-auto">
			{@render children()}
		</section>
	</section>
</main>
