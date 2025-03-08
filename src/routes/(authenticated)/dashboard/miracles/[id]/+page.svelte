<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';
	import moment from 'moment';
	import { hasPermission } from '$lib/utils/role-permissions';

	let { data, form }: PageProps = $props();

	let currentCountry = $state(form?.data.country_id ?? data?.miracleData.country_id);
	let currentLanguage = $state(form?.data.language_code ?? data?.miracleData.language_code);
	let currentQuotes: string[] = $state(form?.data.quotes ?? data?.miracleData.quotes);
	let newQuote = $state('');
	const formattedCreatedDate = $state(moment(data?.miracleData.created_at).format('LL'));
	const formattedModifiedDate = $state(moment(data?.miracleData.modified_at).format('LL'));

	const handleAddNewQuote = (e: any) => {
		e.preventDefault();

		if (newQuote === '') {
			return;
		}

		newQuote = newQuote.replace(',', '');
		currentQuotes = [...currentQuotes, newQuote.trim()];

		// reset newQuote:
		newQuote = '';
	};

	const removeQuote = (e: any, index: number) => {
		e.preventDefault();
		currentQuotes = currentQuotes.filter((_, i) => i !== index);
	};

</script>

<section class="bg-white grid grid-cols-[7fr,3fr] gap-4 p-4">
	<section class="col-span-1">
		<div class="container">
			<h1 class="text-3xl">Edit Page: <strong>{data.miracleData.name}</strong></h1>
			<p>Here you can edit an existing record as necessary.</p>
			<div class="divider"></div>
		</div>
		<div class="container pb-16">
			<form
				class="mx-auto"
				method="POST"
				action="?/update"
				use:enhance={({formData}) => {
					if (currentQuotes.length > 0) {
						formData.append('quotes', currentQuotes.toString())
					}
					return async ({ update }) => {
						await update();
					};
				}}>
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

				<div>
					<p class="text-lg">Story</p>
				</div>
				<div class="flex to-md:flex-col from-md:flex-row">
						<textarea
							class="textarea textarea-bordered textarea-lg h-20 w-full to-sm:max-w-xs"
							placeholder="Story of the Miracle"
							name="story">{form?.data.story ?? data?.miracleData.story}></textarea>

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

				<div class="flex flex-row flex-wrap justify-start gap-4 items-baseline">
					<fieldset class="fieldset w-fit">
						<legend class="fieldset-legend text-lg">Record Type:</legend>
						<input class="input content-center" disabled value={data?.miracleData.type} />
					</fieldset>

					<fieldset data-id="language_code" class="fieldset w-fit">
						<legend class="fieldset-legend text-lg">What is the translation?</legend>
						<select class="select select-bordered w-full max-w-xs" bind:value={currentLanguage} name="language_code">
							{#each data.languageData as language}
								<option value={language.code}>{language.name}</option>
							{/each}
						</select>
					</fieldset>

					<fieldset id="country" class="fieldset w-fit">
						<legend class="fieldset-legend text-lg">Miracle location?</legend>
						<select class="select select-bordered w-full max-w-xs" bind:value={currentCountry} name="country_id">
							{#each data.countryData as country}
								<option value={country.id}>{country.name}</option>
							{/each}
						</select>
					</fieldset>
				</div>

				<div class="divider"></div>

				<div class="flex flex-row flex-wrap items-baseline justify-start gap-4">
					<fieldset data-id="base_translation"
										class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
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
										class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
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

					{#if hasPermission(data.userData, 'miracles', 'delete', data?.miracleData.created_by)}
						<fieldset data-id="deleted"
											class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
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
					{/if}

					{#if hasPermission(data.userData, 'miracles', 'approve', data?.miracleData)}
						<fieldset data-id="published"
											class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
							<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
								<input
									type="checkbox"
									value={data?.miracleData.published}
									checked={data?.miracleData.published}
									class="checkbox"
									name="published"
								/>
								<span class="text-lg">Publish this Miracle?</span>
							</label>
						</fieldset>
					{/if}
				</div>

				<div class="divider"></div>
				{#if hasPermission(data.userData, 'miracles', 'update', data?.miracleData)}
					<button class="btn btn-success">Update</button>
				{/if}
			</form>
		</div>
	</section>
	<aside class="col-start-2 col-span-1">
		<div class="bg-backgroundWhite rounded border-primary border-2 p-4 drop-shadow-lg">
			<h3 class="text-2xl">{data.miracleData.type} Details:</h3>
			<div class="divider"></div>
			<p><strong>Created:</strong> {formattedCreatedDate}</p>
			{#if formattedModifiedDate}
				<p><strong>Last Modified:</strong> {formattedModifiedDate}</p>
			{/if}
			{#if data?.miracleData.created_by}
				<p><strong>Created By:</strong> {data?.miracleData.created_by}</p>
			{/if}
			{#if data?.miracleData.published}
				<p><strong>Approved By:</strong> {data?.miracleData.approved_by}</p>
			{/if}
		</div>
	</aside>
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