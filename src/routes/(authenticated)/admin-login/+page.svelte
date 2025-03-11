<script lang="ts">

	import type { LoginFormType } from '$lib/utils/types/auth-types';

	let { form }: { form: LoginFormType } = $props();
</script>

<section class="container mx-auto py-20 h-full">
	<article>
		<div class="mb-2">
			<h2 class="text-3xl text-tert-100 mb-2 text-center">Eucharistic Miracles Dashboard</h2>
		</div>
	</article>
	<article class="mx-auto my-3 p-6 rounded-md shadow-xl border border-black text-white bg-trueWhite max-w-96">
		<div class="form mx-auto ">
			<h2 class="text-xl mb-4 text-tert-100 text-center">Please Sign-in to proceed.</h2>
			<form class="mx-auto from-sm:w-80" method="POST" action="?/login">
				{#if form?.errors?.message}
					<div class="mb-5">
						<p class="label-text-alt text-error">{form?.errors?.message}</p>
					</div>
				{/if}
				<div class={form?.errors?.email ? '' : 'mb-5' }>
					<label
						class="input input-bordered text-tert-100 flex items-center gap-2  {form?.errors?.email ? 'input-error' : ''}">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="h-4 w-4 opacity-70">
							<path
								d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
							<path
								d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
						</svg>
						<input type="text" class="grow" name="email" placeholder="Email" value={form?.data?.email ?? ''} />
					</label>
					{#if form?.errors?.email}
						<label for="email" class="label">
							<span class="label-text-alt text-error">{form?.errors?.email}</span>
						</label>
					{/if}
				</div>
				<div class={form?.errors?.password ? '' : 'mb-5' }>
					<label
						class="input input-bordered text-tert-100 flex items-center gap-2 {form?.errors?.password ? 'input-error' : ''}">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="h-4 w-4 opacity-70">
							<path
								fill-rule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clip-rule="evenodd" />
						</svg>
						<input type="password" class="grow" name="password" value="" placeholder="Password" />
					</label>
					{#if form?.errors?.password}
						<label for="password" class="label">
							<span class="label-text-alt text-error">{form?.errors?.password}</span>
						</label>
					{/if}
				</div>
				<button class="btn btn-outline btn-success w-full sm:btn-sm md:btn-md hover:!text-white">Login</button>
				<div class="divider before:bg-primary after:bg-primary"></div>
				<button class="btn btn-outline btn-info w-full sm:btn-sm md:btn-md hover:!text-white" formaction="?/signup">Sign
					Up
				</button>
			</form>
		</div>
	</article>
</section>