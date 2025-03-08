<script lang="ts">

	import { truncate } from '$lib/utils/helpers/helper.utils';
	import Icon from '@iconify/svelte';
	import { hasPermission } from '$lib/utils/role-permissions';

	let { data } = $props();

</script>

<section class="bg-white to-md:px-4">
	<article class="container py-16">
		<div class="max-w-3xl mx-auto">
			<h1 class="text-3xl">
				Miracles
			</h1>
			<p>To Edit and existing Eucharistic Miracle, click the accompanying button to open it up.</p>
			<div class="divider"></div>
		</div>
	</article>
	<div class="flex flex-row flex-wrap justify-center gap-5">
		{#each data.miracleData as miracle}
			<div class="card bg-base-100 w-96 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">
						{miracle.name}
						{#if miracle?.countries?.name }
							<span>
								&mdash; {miracle.countries.name}
							</span>
						{/if}
					</h2>
					{#if miracle?.languages?.name}
						<p>Language: <strong class="capitalize">{miracle.languages.name}</strong></p>
					{/if}
					{#if miracle.blurb}
						<p>{truncate(miracle.blurb, 250)}</p>
					{/if}
					{#if hasPermission(data.userData, 'miracles', 'update', miracle)}
						<div class="card-actions justify-end">
							<a href={`/dashboard/miracles/${miracle.id}`} class="btn btn-info flex items-center">
								<Icon icon="mdi:edit-box-outline" width="24" height="24" />
								Edit</a>
						</div>
					{:else}
						<div class="card-actions justify-end">
							<a href={`/dashboard/miracles/${miracle.id}`} class="btn btn-secondary flex items-center">
								<Icon icon="carbon:data-view-alt" width="24" height="24" />
								View
							</a>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
