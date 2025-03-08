<script lang="ts">

	import type { ListData } from '$lib/utils/types/general-types';
	import { truncate } from '$lib/utils/helpers/helper.utils';

	interface ListProps {
		list: ListData[];
	}

	let { list }: ListProps = $props();

</script>

<article
	class="section-list from-md:grid from-md:col-start-3 from-md:col-span-1 from-md:gap-10 from-md:auto-rows-max from-md:justify-items-center only-md:grid-cols-2 only-lg:grid-cols-2 only-xl:grid-cols-3 from-2xl:grid-cols-4 to-md:flex to-md:flex-row to-md:flex-wrap to-md:justify-around">
	{#if list.length === 0 }
		<p class="text-3xl text-white text-center">Sorry, no results here!</p>
	{/if}
	{#each list as item }
		<div
			class="from-md:max-w-sm to-md:max-w-64 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 lightShadow2xl">
			<a href={`/${item.language_code}/${item.type}/${item.slug}`}>
				<img class="rounded-t-lg" src="https://stjohncc.org/images/eucharistchalice.png"
						 alt="found at https://stjohncc.org/sacrament-eucharist" />
				<div class="p-5">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}
						&mdash; {item.countries?.name}</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{#if item.blurb}
							{truncate(item.blurb, 100)}
						{/if}
					</p>
					<p
						class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white btn btn-primary">
						Learn more
						<svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
								 fill="none"
								 viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M1 5h12m0 0L9 1m4 4L9 9" />
						</svg>
					</p>
				</div>
			</a>

		</div>
	{/each}
</article>

<style lang="scss">
  .section-list {
    //grid-column: 3/4;
  }
</style>