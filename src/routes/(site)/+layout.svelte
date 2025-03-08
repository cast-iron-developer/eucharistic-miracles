<script lang="ts">
	import '../../app.css';
	import Navbar from '$lib/components/globals/navigation/site/navbar.svelte';
	import Footer from '$lib/components/globals/footer/footer.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';
	import { siteNavigation } from '$lib/components/globals/site-navigation';
	import type { NavigationListType } from '$lib/utils/types/general-types';

	let { data, children }: { data: LayoutServerData, children: Snippet } = $props();

	const navigation: NavigationListType = $state(siteNavigation);

</script>

<Navbar isAdmin={false} urlParams={data?.currentLanguageParam} navigationItems={navigation}></Navbar>
<main class="site font-montserrat">
	{@render children()}
</main>
<Footer urlParams={data?.currentLanguageParam}></Footer>