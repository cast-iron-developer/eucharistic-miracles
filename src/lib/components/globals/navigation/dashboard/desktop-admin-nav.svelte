<script lang="ts">
	import type { NavigationStyles } from '$lib/utils/types/general-types';

	let { styles: styles, homePath: homePath, logout: logout }: {
		styles: NavigationStyles,
		homePath: string
		logout: any
	} = $props();

</script>
<div class={styles.navbar}>
	<ul class={styles.desktopListStyles}>
		<li class={styles.desktopItemStyles}>
			<a class="btn btn-sm btn-success text-white" href={`${homePath}/create`}>Create New Record</a>
		</li>
		<li class={styles.desktopItemStyles}>
			<button class="btn btn-error btn-sm text-white" onclick={logout}>Log out</button>
		</li>
	</ul>
</div>