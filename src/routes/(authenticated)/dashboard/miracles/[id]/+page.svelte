<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import moment from 'moment';
	import { hasPermission } from '$lib/utils/role-permissions';
	import type { MiracleFormType } from '$lib/utils/types/auth-types';

	let { data, form }: { data: PageData, form: MiracleFormType } = $props();

	$inspect(form);

	let processing = $state(false);
	// setting up state management for form
	let currentQuotes: string[] | null = $state(form?.data?.quotes ?? data?.miracleData.quotes);
	let recordData = $state(form?.data ?? data?.miracleData);

	let newQuote = $state('');

	// Formatting Dates
	const formattedCreatedDate = $state(moment(data?.miracleData.created_at).format('LL'));
	const formattedModifiedDate = $state(moment(data?.miracleData.modified_at).format('LL'));

	const currentStatus = $derived.by(() => {
		if (data.miracleData.deleted) {
			return 'deleted';
		} else if (data.miracleData.draft) {
			return 'draft';
		} else if (data.miracleData.published) {
			return 'published';
		}

		return 'unknown';
	});
	const handleAddNewQuote = (e: any) => {
		e.preventDefault();
		if (newQuote === '') {
			return;
		}

		if (currentQuotes === null) {
			currentQuotes = [];
		}

		newQuote = newQuote.replace(',', '');
		currentQuotes = [...currentQuotes, newQuote.trim()];

		// reset newQuote:
		newQuote = '';
	};

	const removeQuote = (e: any, index: number) => {
		e.preventDefault();
		if (currentQuotes === null) return;
		currentQuotes = currentQuotes.filter((_, i) => i !== index);
	};

</script>

<section class="bg-white grid grid-cols-[7fr,3fr] gap-4 h-full">
	<section class="col-span-1 overflow-auto p-12 border-r-2 border-black ">
		<div class="container pt-4">
			<h1 class="text-3xl">Edit Page: <strong>{data.miracleData.name}</strong></h1>
			<p>Here you can edit an existing record as necessary.</p>
			<div class="divider"></div>
		</div>
		<div class="container pb-4">
			<form
				class="mx-auto"
				method="POST"
				action="?/update"
				use:enhance={() => {
					processing = true;
					return async ({ update, result }) => {
						await update();

						if ('data' in result && result.data) {
							const form: MiracleFormType = result.data;
							if (form.errors && form.data) {
								// manually reassign values
								recordData = form.data;
								currentQuotes = form.data.quotes
							}
						}

						processing = false;
					}
				}}>
				{#if form?.errors?.message}
					<p class="label-text-alt text-error text-lg">{form?.errors?.message}</p>
				{/if}
				<div class="flex flex-col gap-4 justify-between">
					<fieldset data-id="name" class="fieldset">
						<legend class="fieldset-legend text-lg">What is the name of the Miracle?</legend>
						<input type="text" class="input {form?.errors?.name ? 'input-error' : ''}" name="name"
									 placeholder="Miracle Name"
									 bind:value={recordData.name} />
						{#if form?.errors?.name}
							<label for="name" class="label">
								<span class="label-text-alt text-error">{form?.errors?.name}</span>
							</label>
						{/if}
					</fieldset>

					<fieldset data-id="blurb" class="fieldset">
						<legend class="fieldset-legend text-lg">Blurbs for the Miracle</legend>
						<textarea
							id="blurb"
							class="textarea textarea-bordered textarea-lg h-96 w-full to-sm:max-w-xs {form?.errors?.blurb ? 'textarea-error' : ''}"
							placeholder="Miracle Blurb"
							name="story">{recordData.blurb}></textarea>
						{#if form?.errors?.blurb}
							<label for="blurb" class="label">
								<span class="label-text-alt text-error">{form?.errors?.blurb}</span>
							</label>
						{/if}
					</fieldset>
				</div>

				<div class="divider"></div>

				<div class="flex to-md:flex-col from-md:flex-row">
					<fieldset data-id="quotes" class="fieldset">
						<legend class="fieldset-legend text-lg">Quotes Regarding the Miracle</legend>
						{#if currentQuotes}
							<input type="text" hidden bind:value={currentQuotes} name="quotes">
							<ul>
								{#each currentQuotes as quote, index}
									<li class="current-quote-container flex gap-2 items-center mb-2">
										&mdash;
										<p class="p-1 w-5/6">{quote}</p>
										<button
											type="button"
											class="btn btn-sm btn-error text-white hidden remove-quote-button"
											onclick={(e) => removeQuote(e, index)}>
											<Icon icon="carbon:close-filled" width="16" height="16" />
										</button>
									</li>
								{/each}
							</ul>
							{#if form?.errors?.quotes}
								<label for="quotes" class="label">
									<span class="label-text-alt text-error">{form?.errors?.quotes}</span>
								</label>
							{/if}
						{/if}
						<input
							class="input w-96 mb-2 mr-2"
							type="text"
							bind:value={newQuote}
							placeholder="Add Quote">
						<button type="submit" class="btn btn-info text-white" onclick={handleAddNewQuote}>Add New
							Quote
						</button>
					</fieldset>
				</div>

				<div class="divider"></div>

				<div>
					<div>
						<p class="text-lg">Story</p>
					</div>
					<div class="flex to-md:flex-col from-md:flex-row">
						<textarea
							id="story"
							class="textarea textarea-bordered textarea-lg h-96 w-full to-sm:max-w-xs {form?.errors?.story ? 'textarea-error' : ''}"
							placeholder="Story of the Miracle"
							name="story">{recordData.story}></textarea>
					</div>
					{#if form?.errors?.story}
						<label for="story" class="label">
							<span class="label-text-alt text-error">{form?.errors?.story}</span>
						</label>
					{/if}
				</div>

				<div class="divider"></div>

				<div class="flex flex-row to-md:flex-col from-md:flex-row items-baseline">
					<fieldset data-id="occurrence_year" class="fieldset">
						<legend class="fieldset-legend text-lg">When did the Miracle occur?</legend>
						<input type="text" class="input {form?.errors?.occurrence_year ? 'input-error' : ''}" name="occurrence_year"
									 placeholder="Year of the Miracle"
									 bind:value={recordData.occurrence_year} />
						{#if form?.errors?.occurrence_year}
							<label for="occurrence_year" class="label">
								<span class="label-text-alt text-error">{form?.errors?.occurrence_year}</span>
							</label>
						{/if}
					</fieldset>
				</div>

				<div class="divider"></div>

				<div class="flex flex-row flex-wrap justify-between gap-4 items-baseline">
					<fieldset class="fieldset w-fit">
						<legend class="fieldset-legend text-lg">Record Type:</legend>
						<p class="input content-center {form?.errors?.type ? 'input-error' : ''}">
							{data?.miracleData.type}
						</p>
					</fieldset>

					<fieldset data-id="language_code" class="fieldset w-fit">
						<legend class="fieldset-legend text-lg">What is the translation?</legend>
						<select class="select select-bordered w-full max-w-xs {form?.errors?.language_code ? 'input-error' : ''}"
										bind:value={recordData.language_code}
										name="language_code">
							{#each data.languageData as language}
								<option value={language.code}>{language.name}</option>
							{/each}
						</select>
						{#if form?.errors?.language_code}
							<label for="language_code" class="label">
								<span class="label-text-alt text-error">{form?.errors?.language_code}</span>
							</label>
						{/if}
					</fieldset>

					<fieldset id="country" class="fieldset w-fit">
						<legend class="fieldset-legend text-lg">Miracle location?</legend>
						<select class="select select-bordered w-full max-w-xs {form?.errors?.country_id ? 'input-error' : ''}"
										bind:value={recordData.country_id} name="country_id">
							{#each data.countryData as country}
								<option value={country.id}>{country.name}</option>
							{/each}
						</select>
						{#if form?.errors?.country_id}
							<label for="country_id" class="label">
								<span class="label-text-alt text-error">{form?.errors?.country_id}</span>
							</label>
						{/if}
					</fieldset>
				</div>

				<div class="divider"></div>

				<div class="flex flex-row flex-wrap items-baseline justify-start gap-4">
					<fieldset data-id="base_translation"
										class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
						<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
							<input
								type="checkbox"
								bind:checked={recordData.base_translation}
								class="checkbox {form?.errors?.base_translation ? 'input-error' : ''}"
								name="base_translation"
								value={recordData.base_translation} />
							<span class="text-lg">Base Translation?</span>
						</label>
						{#if form?.errors?.base_translation}
							<label for="base_translation" class="label">
								<span class="label-text-alt text-error">{form?.errors?.base_translation}</span>
							</label>
						{/if}
					</fieldset>

					<fieldset data-id="draft"
										class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
						<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
							<input
								type="checkbox"
								value={recordData.draft}
								bind:checked={recordData.draft}
								name="draft"
								class="checkbox {form?.errors?.draft ? 'input-error' : ''}" />
							<span class="text-lg">Is this a Draft?</span>
						</label>
						{#if form?.errors?.draft}
							<label for="draft" class="label">
								<span class="label-text-alt text-error">{form?.errors?.draft}</span>
							</label>
						{/if}
					</fieldset>

					{#if hasPermission(data.userData, 'miracles', 'delete', data?.miracleData)}
						<fieldset data-id="deleted"
											class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
							<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
								<input
									type="checkbox"
									value={recordData.deleted}
									bind:checked={recordData.deleted}
									name="deleted"
									class="checkbox {form?.errors?.deleted ? 'input-error' : ''}" />
								<span class="text-lg">Delete this Miracle?</span>
							</label>
							{#if form?.errors?.deleted}
								<label for="deleted" class="label">
									<span class="label-text-alt text-error">{form?.errors?.deleted}</span>
								</label>
							{/if}
						</fieldset>
					{/if}

					{#if hasPermission(data.userData, 'miracles', 'approve', data?.miracleData)}
						<fieldset data-id="published"
											class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
							<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
								<input
									type="checkbox"
									value={recordData.published}
									bind:checked={recordData.published}
									class="checkbox {form?.errors?.published ? 'input-error' : ''}"
									name="published"
								/>
								<span class="text-lg">Publish this Miracle?</span>
							</label>
							{#if form?.errors?.published}
								<label for="published" class="label">
									<span class="label-text-alt text-error">{form?.errors?.published}</span>
								</label>
							{/if}
						</fieldset>
					{/if}
				</div>

				<div class="divider"></div>
				{#if hasPermission(data.userData, 'miracles', 'update', data?.miracleData)}
					<button class="btn btn-success text-white">
						{#if processing}
							<span class="loading loading-spinner loading-md"></span>
						{/if}
						Update {data?.miracleData.type}</button>
				{/if}
			</form>
		</div>
	</section>
	<aside class="col-start-2 col-span-1 p-12 relative">
		<div class="bg-backgroundWhite rounded border-primary border-2 drop-shadow-lg">
			<div class="px-4 pt-4">
				<h3 class="text-2xl">{data.miracleData.type} Details:</h3>
			</div>
			<div class={`currentStatus ${currentStatus}`}>
				<p class="text-lg">{currentStatus}</p>
			</div>
			<div class="px-4 pb-4">
				<p><strong>Created:</strong> {formattedCreatedDate}</p>
				{#if formattedModifiedDate}
					<p><strong>Last Modified:</strong> {formattedModifiedDate}</p>
				{/if}
				{#if data?.miracleData.created_by}
					<p><strong>Created By:</strong> {data?.miracleData.creator_data?.email}</p>
				{/if}
				{#if data?.miracleData.published}
					<p><strong>Approved By:</strong> {data?.miracleData.approver_data?.email}</p>
				{/if}
			</div>
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

    .published {
        background-color: #28a745;
        border: .25rem solid #28a745;
    }

    .deleted {
        background-color: #dc3545;
        border: .25rem solid #dc3545;
    }

    .draft {
        background-color: #ffc107;
        border: .25rem solid #ffc107;
    }

    .currentStatus {
        color: #fff;
        padding: .5rem;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: .5rem;
        width: 100%;
        margin: .5rem 0;
    }

    .unknown {
        background-color: #333;
        border: .25rem solid #333;
    }
</style>