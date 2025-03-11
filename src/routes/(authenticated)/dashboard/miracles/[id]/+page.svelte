<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';
	import moment from 'moment';
	import { hasPermission } from '$lib/utils/role-permissions';

	let { data, form }: PageProps = $props();

	$inspect(form);
	// setting up state management for form
	let currentCountry = $state(form?.data.country_id ?? data?.miracleData.country_id);
	let currentLanguage = $state(form?.data.language_code ?? data?.miracleData.language_code);
	let currentQuotes: string[] = $state(form?.data.quotes ?? data?.miracleData.quotes);
	let recordData = $state(form?.data ?? data?.miracleData);
	console.log(form?.data);

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

<section class="bg-white grid grid-cols-[7fr,3fr] gap-4 h-full">
	<section class="col-span-1 overflow-auto p-12">
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
				use:enhance>
				<div class="flex flex-row flex-wrap">
					<fieldset data-id="name" class="fieldset">
						<legend class="fieldset-legend text-lg">What is the name of the Miracle?</legend>
						<input type="text" class="input" name="name" placeholder="Miracle Name"
									 bind:value={recordData.name} />
					</fieldset>

					<fieldset data-id="blurb" class="fieldset">
						<legend class="fieldset-legend text-lg">Blurbs for the Miracle</legend>
						<input type="text" class="input" name="blurb" placeholder="Miracle Blurb"
									 bind:value={recordData.blurb} />
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
							class="textarea textarea-bordered textarea-lg h-20 w-full to-sm:max-w-xs"
							placeholder="Story of the Miracle"
							name="story">{form?.data.story ?? data?.miracleData.story}></textarea>

					</div>
				</div>

				<div class="divider"></div>

				<div class="flex flex-row to-md:flex-col from-md:flex-row items-baseline">
					<fieldset data-id="occurrence_year" class="fieldset">
						<legend class="fieldset-legend text-lg">When did the Miracle occur?</legend>
						<input type="text" class="input" name="occurrence_year" placeholder="Year of the Miracle"
									 bind:value={recordData.occurrence_year} />
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
								bind:checked={recordData.base_translation}
								class="checkbox"
								name="base_translation"
								value={recordData.base_translation} />
							<span class="text-lg">Base Translation?</span>
						</label>
					</fieldset>
					<p>current status: {recordData.base_translation}</p>


					<fieldset data-id="draft"
										class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
						<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
							<input
								type="checkbox"
								value={recordData.draft}
								bind:checked={recordData.draft}
								name="draft"
								class="checkbox" />
							<span class="text-lg">Is this a Draft?</span>
						</label>
					</fieldset>
					<p>current status: {recordData.draft}</p>


					{#if hasPermission(data.userData, 'miracles', 'delete', data?.miracleData)}
						<fieldset data-id="deleted"
											class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
							<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
								<input
									type="checkbox"
									value={recordData.deleted}
									bind:checked={recordData.deleted}
									name="deleted"
									class="checkbox" />
								<span class="text-lg">Delete this Miracle?</span>
							</label>
						</fieldset>
						<p>current status: {recordData.deleted}</p>
					{/if}

					{#if hasPermission(data.userData, 'miracles', 'approve', data?.miracleData)}
						<fieldset data-id="published"
											class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-fit">
							<label class="fieldset-label flex justify-start to-sm:gap-1 from-sm:gap-6 align-center">
								<input
									type="checkbox"
									value={recordData.published}
									bind:checked={recordData.published}
									class="checkbox"
									name="published"
								/>
								<span class="text-lg">Publish this Miracle?</span>
							</label>
						</fieldset>
						<p>current status: {recordData.published}</p>

					{/if}
				</div>

				<div class="divider"></div>
				{#if hasPermission(data.userData, 'miracles', 'update', data?.miracleData)}
					<button class="btn btn-success text-white">Update {data?.miracleData.type}</button>
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