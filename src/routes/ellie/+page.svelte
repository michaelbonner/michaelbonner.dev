<script lang="ts">
	import Seo from '../../components/Seo.svelte';
	import ImageGallery from './ImageGallery.svelte';

	// main image
	import ellieMain from '$lib/images/ellie/main.webp';

	// puppy images
	import puppy1 from '$lib/images/ellie/puppy/1.webp';
	import puppy2 from '$lib/images/ellie/puppy/2.webp';
	import puppy3 from '$lib/images/ellie/puppy/3.webp';
	import puppy4 from '$lib/images/ellie/puppy/4.webp';
	import puppy5 from '$lib/images/ellie/puppy/5.webp';
	import puppy6 from '$lib/images/ellie/puppy/6.webp';
	import puppy7 from '$lib/images/ellie/puppy/7.webp';
	import puppy8 from '$lib/images/ellie/puppy/8.webp';

	const puppyImages = [
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy1,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy2,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy3,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy4,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy5,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy6,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 2592,
			url: puppy7,
			width: 1936
		},
		{
			altText: 'Ellie as a puppy',
			height: 1936,
			url: puppy8,
			width: 2592
		}
	];
</script>

<Seo title="Ellie" description="Some of my favorite memories with Ellie" />

<main class="grid gap-8 container mx-auto px-8 py-12">
	<div class="prose dark:prose-invert prose-lg mt-12 max-w-2xl">
		<figure>
			<img src={ellieMain} alt="Ellie" />
			<figcaption>
				<p>Ellie - 9/10/10 - 1/30/23</p>
			</figcaption>
		</figure>

		<h1>Dear Ellie,</h1>

		<p>
			I'm sorry it's taken me a while to write this. Since you passed I haven't been able to compose
			myself enough to write it. Every time I even think about writing it my eyes hurt and my chest
			shakes. I miss you so much Ellie. But I want to write things down so I don't forget. The pain
			tells me your still with me. I don't want to forget you. I've come to realize that the only
			way to heal is to forget parts of you, so I'm refusing to heal. Despite my best efforts I'm
			forgetting the way you smell, the way you'd nuzzle under the covers with me, the way you'd
			dance in circles when I came home, how you would get so excited when I'd get your leash out,
			the calm I would feel when you cuddled me, the way you'd look at me when I'd talk to you, the
			way you played king of the bed with me like you knew how the game worked, the way you loved
			everyone around you, the times you saved me from myself, the way you'd run right behind me
			when we went biking, the way you'd run up to me when I'd call your name, the way you'd comfort
			me when I was sad, the way you'd make me laugh, the way you'd make me smile, how patient you
			were with kids hanging on you, how you'd lay your head anywhere you could find a spot on me,
			the way you'd lay on your back and hold your toy above your head while you chewed on it, how
			patient you were with puppies, and how you loved Kellie.
		</p>

		<hr />

		<p>
			I was 24 when I first met you, I was newly married, and I was so naive. My then wife
			(Chelsie), her 3 year old daughter (Makaylee), and I had just moved into our first apartment
			together, and we were just figuring out how to be a family and make a marriage work. We were
			both working full time, and going to school full time. We were busy, and we were stressed, and
			we were young and dumb. Chelsie wanted a dog so bad but I didn't want to make a dog live in a
			little apartment with the 3 of us. I thought it was cruel and unfair. So you can imagine how I
			felt when Chelsie and Makaylee brought you to my work one day. I was irritated, but you were
			so dang cute. To be honest, it wasn't love at first sight; you peed under a shelf at my work.
			But I saw how you lit up Makaylee's face, and there was no way I could say no. They told us
			that you were ~5 months old, that you were a lab/dane mix, and that your previous owners gave
			you up because you had too much energy. Holy shit did they miss out!
		</p>

		<p>
			I came home that night and you were there. You were so excited to see me. So we went for a
			walk and did the things your supposed to do with a new dog. You had soooooo much energy. We
			were told we shouldn't let you run to exhaustion, so we tried to do small activities with you.
			We took you to the dog park, and you didn't give two shits about the other dogs. You just
			wanted that ball. But when we'd get home, all you wanted to do was cuddle. You'd put your cute
			little face on my leg or on my laptop, and you'd get all the pets you needed.
		</p>

		<p>
			I was surprised you didn't seem to be potty trained. That was a bit of a trying time. We'd
			leave you in your kennel for hours at a time, and then bring you out side and say "go potty,"
			over and over again until you did. Then I'd give you a treat and we'd go back inside. One of
			the most salient memories I have with you is the time you peed on me 😆. I had been home from
			work for an hour or two, and you were being so cute and playful. We were wrestling in the
			living room and then I wanted to take a break so I leaned back against the couch. You came
			over with a big smile on your face and you put your face to my cheek; which you did all the
			time. It was like you couldn't get close enough to me. I leaned into the cuddle and pet you.
			Then I noticed my leg was getting warm. I looked down and you were peeing on me! I was so
			shocked I didn't know what to do. I grabbed your collar and pulled you outside. We sat there
			for at least half an hour until you finally peed. I was so mad at you, but I couldn't stay mad
			at you. You were so cute and you were just a puppy. I knew you didn't know any better. You
			probably thought "pee in front of Mike, get a treat. Pee on Mike get a lifetime supply of
			treats!"
		</p>

		<ImageGallery galleryID="ellie-puppy" images={puppyImages} />

		<figure>
			<video
				class="aspect-w-16 aspect-h-9 rounded-lg w-full p-0"
				controls
				controlsList="nodownload"
				poster="/videos/ellie/slide-with-makaylee.webp"
			>
				<!-- <source src="/videos/ellie/slide-with-makaylee.mp4" type="video/mp4" /> -->
				<source src="/videos/ellie/slide-with-makaylee.webm" type="video/webm" />
				<source src="/videos/ellie/slide-with-makaylee.ogv" type="video/ogg" />

				<track kind="captions" src="/videos/ellie/slide-with-makaylee.vtt" label="Captions" />
			</video>
			<figcaption>Ellie loved going down the slide</figcaption>
		</figure>

		<iframe
			class="aspect-w-16 aspect-h-9 rounded-lg w-full p-0"
			title="Ellie slide with nieces and nephews"
			src="https://www.facebook.com/plugins/video.php?height=315&href=https%3A%2F%2Fwww.facebook.com%2Fmichaelwbonner%2Fvideos%2F10200477125504234%2F&show_text=false&width=560&t=0"
			width="560"
			height="315"
			style="border:none;overflow:hidden"
			scrolling="no"
			frameborder="0"
			allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			allowFullScreen
		/>

		<p>
			I learned I could take you almost anywhere, so I did. We went on so many adventures together.
			You loved camping and hiking. That first summer we took you to Tanner Park to see if you would
			swim. I remember you were scared of the water at first. You'd sit on the edge and draw your
			paw through the water to see if that would pull your ball over. I was a bad dog owner and
			threw you into the river. I'm sorry about that. Your eyes got so big and you swam to the shore
			as fast as you could. I remember your front paws just splashing straight down into the water
			with your back legs hanging straight down. You had no idea how to swim, but you figured it
			out. For the first year of swimming that's how you'd swim. Big dane paws splashing water
			everywhere. It was so fucking cute. You loved the water so much. Anytime we were near water
			you were in it. I remember you running down the trail, then down to the river, then back to
			the trail to catch up with me, and then back down to the river.
		</p>

		<p>
			One of my favorite memories with you was at Bear Lake with some friends. We had set up camp
			for the night and were having a few drinks on the beach. You wanted to play with a stick and
			refused to take no for an answer. You probably found 50 sticks by the end of the night. When
			one person said no you'd just go to the next person. Then the sun went down and you kept going
			at it. You even found an 8' 4x4 fence post and dragged that over. Water meant play for you. We
			sat around the camp fire that night and you kept trying to pull out sticks from the fire. It
			was like you were saying, "Those are perfectly good playing sticks. Why are you trying to burn
			them?" When it was time to sleep you got in the tent and passed out like you always did after
			a long day of playing. The next morning we woke up slow and made breakfast on the camp fire.
			After a few minutes I couldn't find you, which was odd because you always stayed right by me
			when we were camping. After a couple minutes looking for you I noticed something out in the
			lake near us. It was you! Just out for a morning lap in the lake. You were in your happy
			place.
		</p>

		<hr />

		<p>Posted 08 Aug 2023</p>
	</div>
</main>
