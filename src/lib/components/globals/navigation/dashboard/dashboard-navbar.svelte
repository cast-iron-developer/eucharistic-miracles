<script lang="ts">
	import Icon from '@iconify/svelte';

	let { expandDrawer = $bindable(), navigation: navigation } = $props();
</script>

<div class="flex flex-row justify-center align-baseline p-2">
	<button
		class="block hover:bg-primary-600 bg-primary-700 border rounded hover:border-primary-700 border-primary-600 p-2 hover:text-white"
		onclick={() => expandDrawer = !expandDrawer}>
		<Icon class={expandDrawer ? '-rotate-90 font-bold' : 'rotate-90 font-bold'} icon="tdesign:upload" width="24"
					height="24" />
	</button>
</div>
<div class="px-4">
	<ul>
		{#each navigation.navigationListItems as navItem}
			<li>
				<a
					class="flex flex-row my-3 hover:text-white hover:bg-primary-600 hover:rounded p-2 {expandDrawer ? 'justify-start' : 'justify-center'}"
					href={navItem.href}
					title={navItem.title}>

					<Icon icon={navItem.icon.icon} width={navItem.icon.width} height={navItem.icon.height} />
					<span class={expandDrawer ? 'ml-3' : 'hidden'}>{navItem.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
