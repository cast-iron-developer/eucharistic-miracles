<script lang="ts">
	import type { FilterData, ListData } from '$lib/utils/types/general-types';
	import type { Filters } from '$lib/components/display-data/types/types';

	interface FilterProps {
		itemType: string;
		itemTextInput: string;
		items: ListData[];
		countries: FilterData[];
		countryTextInput: string;
		onUpdateFilters: (activeFilters: Filters) => void;
	}

	let {
		itemType,
		itemTextInput,
		items,
		countries,
		countryTextInput,
		onUpdateFilters
	}: FilterProps = $props();

	let itemList: ListData[] = $state(items);
	let itemFiltersIds: string[] = $state([]);
	let locationList: FilterData[] = $state(countries);
	let locationFiltersIds: string[] = $state([]);

	const handleLocationFilterChange = (event: Event, filterIdList: string[], filterKey: string) => {
		const target = event.target as HTMLInputElement;

		if (target.checked && !filterIdList.includes(target.value)) {
			filterIdList.push(target.value);
		} else {
			let index: number = filterIdList.indexOf(target.value);
			filterIdList.splice(index, 1);
		}

		onUpdateFilters({ [filterKey]: filterIdList });

	};

	const handleItemTextFilterInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const pattern = new RegExp(`${target.value}`, 'i');
		console.log(target.value);
		itemList = target.value ? items.filter(item => {
			return item.name.match(pattern);
		}) : items;

		// do not believe I need this here:
		//onUpdateFilters({ countryIds: locationFiltersIds });
	};

	const handleCountryTextFilterInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const pattern = new RegExp(`^${target.value}`, 'i');

		locationList = target.value ? countries.filter(item => {
			return item.name.match(pattern);
		}) : countries;

		// do not believe I need this here:
		//onUpdateFilters({ countryIds: locationFiltersIds });
	};
</script>
<aside class="section-filters-aside px-2">
	<p class="text-2xl text-white from-md:mb-4 to-md:mb-8 to-md:m-auto to-md:text-center">
		Search
	</p>
	<div class="search-filters to-md:max-w-fit to-md:mx-auto to-md:margin">
		<div class="collapse collapse-arrow bg-base-200 from-md:mb-2 to-md:mb-8">
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">{itemType}</div>
			<div class="collapse-content">
				<input type="text" placeholder="Enter Miracle Here"
							 class="miracle-text-input input input-bordered w-full max-w-xs"
							 value={itemTextInput} oninput={handleItemTextFilterInput} />
				<div class="miracle-list">
					{#each itemList as item }
						<label id={item.id.toString()} for={item.id}
									 class="miracle-label cursor-pointer label justify-normal">
							<input name={item.id} type="checkbox" class="checkbox"
										 value={item.id}
										 checked={itemFiltersIds.includes(item.id)}
										 data-item-id={item.id.toString()}
										 onchange={(e) => handleLocationFilterChange(e, itemFiltersIds, 'itemIds')} />
							<span class="label-text pl-2">{item.name}</span>
						</label>
					{/each}
				</div>
			</div>
		</div>
		<div class="collapse collapse-arrow bg-base-200 from-md:mb-2 to-md:mb-8">
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">Countries</div>
			<div class="collapse-content">
				<input type="text" placeholder="Enter Country Here"
							 class="country-text-input input input-bordered w-full max-w-xs"
							 value={countryTextInput}
							 oninput={handleCountryTextFilterInput} />
				<div class="country-list">
					{#each locationList as item }
						<label id={item.id.toString()} for={item.id}
									 class="country-label cursor-pointer label justify-normal">
							<input name={item.id} type="checkbox" class="checkbox"
										 value={item.id}
										 checked={locationFiltersIds.includes(item.id)}
										 data-item-id={item.id.toString()}
										 onchange={(e) => handleLocationFilterChange(e, itemFiltersIds, 'countryIds')} />
							<span class="label-text pl-2">{item.name}</span>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
</aside>

<style lang="scss">
  .section-filters-aside {
    grid-column: 2/3;

    .country-list {
      display: flex;
      flex-direction: column;

      .country-label:has(input:checked) {
        order: -9999;
      }
    }
  }
</style>