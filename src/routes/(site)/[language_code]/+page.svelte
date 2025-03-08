<script lang="ts">

	import emImage from '$lib/images/em.webp';
	import fatimaImage from '$lib/images/fatima.webp';
	import teresaImage from '$lib/images/teresa.webp';
	import triumphantImage from '$lib/images/triumphant.webp';

	let { data } = $props();

</script>

<section class="base-language-section">
	<div class="container mx-auto py-20">
		<div class="intro">
			<h1 class="text-3xl">Feel free to explore Eucharistic Miracles and Saints</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, consequuntur doloremque doloribus enim
				eos
				exercitationem id impedit, incidunt inventore iste magnam maxime porro quaerat, quisquam quod repudiandae
				similique sunt voluptatibus.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque aut culpa, delectus dignissimos est
				id
				maiores nulla odit voluptatibus. Accusamus animi consequatur doloribus earum exercitationem inventore maxime
				nesciunt, optio?</p>
		</div>
		<section
			class="links flex w-flex flex-col xl:flex-row xl:flex-wrap from-md:justify-around to-xl:items-center py-10">
			<article class="miracles card lg:card-side bg-base-100 shadow-xl m-5 to-md:w-96 only-md:w-4/6 from-lg:w-9/12">
				<figure class="from-lg:min-w-96 from-lg:max-w-96 from-lg:h-64">
					<img
						src={emImage}
						alt="Eucharistic miracle of Chirattakonam, India" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">Eucharistic Miracles</h2>
					<p>Click to learn more about Eucharistic Miracles from around the world.</p>
					<div class="card-actions">
						<a class="btn btn-primary" href={`/${data.code}/miracles`}>Explore now</a>
					</div>
				</div>
			</article>
			<article
				class="miraculous-communions card lg:card-side bg-base-100 shadow-xl m-5 to-md:w-96 only-md:w-4/6 from-lg:w-9/12">
				<figure class="from-lg:min-w-96 from-lg:max-w-96 from-lg:h-64">
					<img
						src={teresaImage}
						alt="St. Teresa" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">Miraculous Communions</h2>
					<p>Click to learn more about how the saints have miraculously receive Our Lord.</p>
					<div class="card-actions">
						<a class="btn btn-primary" href={`/${data.code}/communions`}>Explore now</a>
					</div>
				</div>
			</article>
			<article class="saints card lg:card-side bg-base-100 shadow-xl m-5 to-md:w-96 only-md:w-4/6 from-lg:w-9/12">
				<figure class="from-lg:min-w-96 from-lg:max-w-96 from-lg:h-64">
					<img
						src={triumphantImage}
						alt="Church Triumphant" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">Holy Saints</h2>
					<p>Click to learn more about some of our favorite saints.</p>
					<div class="card-actions">
						<a class="btn btn-primary" href={`/${data.code}/saints`}>Explore now</a>
					</div>
				</div>
			</article>
			<article class="our-lady card lg:card-side bg-base-100 shadow-xl m-5 to-md:w-96 only-md:w-4/6 from-lg:w-9/12">
				<figure class="from-lg:min-w-96 from-lg:max-w-96 from-lg:h-64">
					<img
						src={fatimaImage}
						alt="Our Lady of Fatima" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">Learn more about the Mother of God</h2>
					<p>Click to learn more about Our Lord's mother.</p>
					<div class="card-actions">
						<a class="btn btn-primary" href={`/${data.code}/our-lady`}>Explore now</a>
					</div>
				</div>
			</article>
		</section>


	</div>

</section>
