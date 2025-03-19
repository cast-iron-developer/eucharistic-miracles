<script lang="ts">
	import type { NavigationStyles } from '$lib/utils/types/general-types';

	let { styles: styles, homePath: homePath, logout: logout }: {
		styles: NavigationStyles,
		homePath: string
		logout: any
	} = $props();

</script>
<div class="dropdown mr-2">
	<div tabindex="0" role="button" class={styles.menuButton}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			viewBox="0 0 24 24"
			stroke="#eeeeee">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h8m-8 6h16" />
		</svg>
	</div>
	<ul class={styles.mobileListStyles}>
		<li class={styles.mobileItemStyles}>
			<a class="btn btn-sm btn-success text-white" href={`${homePath}/create`}>Create New Record</a>
		</li>
		<li class={styles.mobileItemStyles}>
			<button class="btn btn-error btn-sm text-white" onclick={logout}>Log out</button>
		</li>
	</ul>
</div>