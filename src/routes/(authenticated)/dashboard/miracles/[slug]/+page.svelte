<script lang="ts">
	import { recordTypeEnum } from '$lib/utils/helpers/helper.utils';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';

	let { data, form }: PageProps = $props();
	if (form) {
		$inspect(form);
	}
	const languages = $state(data.languageData);
	const countries = $state(data.countryData);
	const recordEnum = $state(recordTypeEnum);

	let currentCountry = $state(form?.data.country_id ?? data?.miracleData.country_id);
	let currentLanguage = $state(form?.data.language_code ?? data?.miracleData.language_code);
	let currentType = $state(form?.data.language_code ?? data?.miracleData.type);
	let currentQuotes: string[] = $state(form?.data.quotes ?? data?.miracleData.quotes);
	let newQuote = $state('');

	const handleAddNewQuote = (e: any) => {
		e.preventDefault();
		console.log(currentQuotes);
		if (newQuote === '') {
			return;
		}
		currentQuotes = [...currentQuotes, newQuote.trim()];

		// reset newQuote:
		newQuote = '';
	};

	const removeQuote = (e: any, index: number) => {
		e.preventDefault();
		currentQuotes = currentQuotes.filter((_, i) => i !== index);
	};
</script>

<section class="bg-white p-6">
	<div class="container pt-16">
		<h1 class="text-3xl">Edit Page: <strong>{data.miracleData.name}</strong></h1>
		<p>Here you can edit an existing record as necessary.</p>
		<div class="divider"></div>
	</div>
	<div class="container pb-16">
		<form class="mx-auto" method="POST" action="?/update">
			<div class="flex to-md:flex-col from-md:flex-row">
				<fieldset data-id="name" class="fieldset basis-1/2">
					<legend class="fieldset-legend text-lg">What is the name of the Miracle?</legend>
					<input type="text" class="input" name="name" placeholder="Miracle Name"
								 value={form?.data.name ?? data?.miracleData.name} />
				</fieldset>

				<fieldset data-id="blurb" class="fieldset basis-1/2">
					<legend class="fieldset-legend text-lg">Blurbs for the Miracle</legend>
					<input type="text" class="input" name="blurb" placeholder="Miracle Blurb"
								 value={form?.data.name ?? data?.miracleData.blurb} />
				</fieldset>
			</div>

			<div class="divider"></div>

			<div class="flex to-md:flex-col from-md:flex-row">
				<fieldset data-id="quotes" class="fieldset">
					<legend class="fieldset-legend text-lg">Quotes Regarding the Miracle</legend>
					<input class="" type="text" name="quotes" value={currentQuotes}>
					{#if currentQuotes}
						<ul>
							{#each currentQuotes as quote, index}
								<li class="current-quote-container flex gap-2 items-center mb-2">
									&mdash;
									<p class="p-1 w-5/6">{quote}</p>
									<button
										type="button"
										class="btn btn-sm btn-error hidden remove-quote-button"
										onclick={(e) => removeQuote(e, index)}>
										<Icon icon="carbon:close-filled" width="16" height="16" />
									</button>
								</li>
							{/each}
						</ul>

					{/if}
					<input
						class="input w-96 mb-2 mr-2"
						type="text"
						bind:value={newQuote}
						placeholder="Add Quote">
					<button type="submit" class="btn btn-info" onclick={handleAddNewQuote}>Add New
						Quote
					</button>
				</fieldset>
			</div>

			<div class="divider"></div>

			<div class="flex to-md:flex-col from-md:flex-row">
				<fieldset data-id="story" class="fieldset basis-0">
					<legend class="fieldset-legend text-lg">Story</legend>
					<textarea
						class="textarea h-24 textarea-lg to-sm:max-w-80 only-sm:w-[32rem] only-md:w-[38rem] from-lg:w-[52rem]"
						placeholder="Story of the Miracle" name="story">{form?.data.story ?? data?.miracleData.story}</textarea>
				</fieldset>
			</div>

			<div class="divider"></div>

			<div class="flex flex-row to-md:flex-col from-md:flex-row items-baseline">
				<fieldset data-id="occurrence_year" class="fieldset">
					<legend class="fieldset-legend text-lg">When did the Miracle occur?</legend>
					<input type="text" class="input" name="occurrence_year" placeholder="Year of the Miracle"
								 value={form?.data.occurrence_year ?? data?.miracleData.occurrence_year} />
				</fieldset>
			</div>

			<div class="divider"></div>

			<div class="flex to-md:flex-col from-md:flex-row from-md:flex-wrap justify-between items-baseline">
				<fieldset class="fieldset to-lg:basis-3/4 from-lg:basis-1/4">
					<legend class="fieldset-legend text-lg">Record Type:</legend>
					<input class="input content-center" value={data?.miracleData.type} />
				</fieldset>

				<fieldset data-id="language_code" class="fieldset to-lg:basis-3/4 from-lg:basis-1/4">
					<legend class="fieldset-legend text-lg">What is the translation?</legend>
					<select class="select select-bordered w-full max-w-xs" bind:value={currentLanguage} name="language_code">
						{#each data.languageData as language}
							<option value={language.code}>{language.name}</option>
						{/each}
					</select>
				</fieldset>

				<fieldset id="country" class="fieldset to-lg:basis-3/4 from-lg:basis-1/4">
					<legend class="fieldset-legend text-lg">Miracle location?</legend>
					<select class="select select-bordered w-full max-w-xs" bind:value={currentCountry} name="country_id">
						{#each data.countryData as country}
							<option value={country.id}>{country.name}</option>
						{/each}
					</select>
				</fieldset>
			</div>

			<div class="divider"></div>

			<div class="flex to-md:flex-col from-md:flex-row from-md:flex-wrap items-baseline  justify-between gap-2">
				<fieldset data-id="base_translation"
									class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64 to-lg:basis-3/4 from-lg:basis-1/3">
					<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
						<input
							type="checkbox"
							checked={data?.miracleData.base_translation}
							class="checkbox"
							name="base_translation"
							value={data?.miracleData.base_translation} />
						<span class="text-lg">Base Translation?</span>
					</label>
				</fieldset>

				<fieldset data-id="draft"
									class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64 to-lg:basis-3/4 from-lg:basis-1/3">
					<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
						<input
							type="checkbox"
							value={data?.miracleData.draft}
							checked={data?.miracleData.draft}
							name="draft"
							class="checkbox" />
						<span class="text-lg">Is this a Draft?</span>
					</label>
				</fieldset>

				<fieldset data-id="deleted"
									class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64 to-lg:basis-3/4 from-lg:basis-1/3">
					<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
						<input
							type="checkbox"
							value={data?.miracleData.deleted}
							checked={data?.miracleData.deleted}
							class="checkbox"
							name="deleted"
						/>
						<span class="text-lg">Delete this Miracle?</span>
					</label>
				</fieldset>
			</div>

			<div class="divider"></div>
			<div>
				<button class="btn btn-success">Update</button>
			</div>
		</form>
	</div>
</section>

<style>
    .fieldset {
        margin: .5rem 0;
    }

    .current-quote-container {
        &:hover {
            .remove-quote-button {
                display: block;
            }
        }
    }
</style>