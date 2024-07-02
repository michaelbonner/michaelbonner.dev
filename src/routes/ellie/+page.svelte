<script lang="ts">
	import Seo from '../../components/Seo.svelte';
	import ImageGallery from './ImageGallery.svelte';
	// images
	import goodbye from '$lib/images/ellie/goodbye.jpg?enhanced&w=600,440';
	import ellieMain from '$lib/images/ellie/main.jpg?enhanced&w=600,440';
	// puppy images
	import puppy1 from '$lib/images/ellie/puppy/1.jpg?enhanced&w=1440,600,440';
	import puppy2 from '$lib/images/ellie/puppy/2.jpg?enhanced&w=1440,600,440';
	import puppy3 from '$lib/images/ellie/puppy/3.jpg?enhanced&w=1440,600,440';
	import puppy4 from '$lib/images/ellie/puppy/4.jpg?enhanced&w=1440,600,440';
	import puppy5 from '$lib/images/ellie/puppy/5.jpg?enhanced&w=1440,600,440';
	import puppy6 from '$lib/images/ellie/puppy/6.jpg?enhanced&w=1440,600,440';
	import puppy7 from '$lib/images/ellie/puppy/7.jpg?enhanced&w=1440,600,440';
	import puppy8 from '$lib/images/ellie/puppy/8.jpg?enhanced&w=1440,600,440';
	// adult images
	import adult1 from '$lib/images/ellie/adult/20211030_171419.jpg?enhanced&w=1440,600,440';
	import adult2 from '$lib/images/ellie/adult/52E95267-89ED-44DA-BA92-332DDB4D1511.jpg?enhanced&w=1440,600,440';
	import adult3 from '$lib/images/ellie/adult/9D9F1399-339E-4F41-A899-261063B3D76F.jpg?enhanced&w=1440,600,440';
	import adult4 from '$lib/images/ellie/adult/C3A18D90-546C-49BF-B225-89744FB7A277.jpg?enhanced&w=1440,600,440';
	import adult5 from '$lib/images/ellie/adult/C8FEE226-B465-4C47-BD5F-7FD57CE4C645.jpg?enhanced&w=1440,600,440';
	import adult67 from '$lib/images/ellie/adult/celebration-of-life--13.jpg?enhanced&w=1440,600,440';
	import adult68 from '$lib/images/ellie/adult/celebration-of-life--5.jpg?enhanced&w=1440,600,440';
	import adult6 from '$lib/images/ellie/adult/D4DBF50F-C47D-4E01-BC2C-A795E730B9AC.jpg?enhanced&w=1440,600,440';
	import adult7 from '$lib/images/ellie/adult/DSC_1718.jpg?enhanced&w=1440,600,440';
	import adult8 from '$lib/images/ellie/adult/DSC_1740.jpg?enhanced&w=1440,600,440';
	import adult10 from '$lib/images/ellie/adult/IMG_0041.jpg?enhanced&w=1440,600,440';
	import adult11 from '$lib/images/ellie/adult/IMG_0054.jpg?enhanced&w=1440,600,440';
	import adult12 from '$lib/images/ellie/adult/IMG_0058.jpg?enhanced&w=1440,600,440';
	import adult13 from '$lib/images/ellie/adult/IMG_0061.jpg?enhanced&w=1440,600,440';
	import adult14 from '$lib/images/ellie/adult/IMG_0067.jpg?enhanced&w=1440,600,440';
	import adult15 from '$lib/images/ellie/adult/IMG_0081.jpg?enhanced&w=1440,600,440';
	import adult16 from '$lib/images/ellie/adult/IMG_0083.jpg?enhanced&w=1440,600,440';
	import adult17 from '$lib/images/ellie/adult/IMG_0138.jpg?enhanced&w=1440,600,440';
	import adult18 from '$lib/images/ellie/adult/IMG_0143.jpg?enhanced&w=1440,600,440';
	import adult19 from '$lib/images/ellie/adult/IMG_0157.jpg?enhanced&w=1440,600,440';
	import adult21 from '$lib/images/ellie/adult/IMG_0200.jpg?enhanced&w=1440,600,440';
	import adult22 from '$lib/images/ellie/adult/IMG_0201.jpg?enhanced&w=1440,600,440';
	import adult23 from '$lib/images/ellie/adult/IMG_0211.jpg?enhanced&w=1440,600,440';
	import adult24 from '$lib/images/ellie/adult/IMG_0218.jpg?enhanced&w=1440,600,440';
	import adult25 from '$lib/images/ellie/adult/IMG_0291.jpg?enhanced&w=1440,600,440';
	import adult26 from '$lib/images/ellie/adult/IMG_0428.jpg?enhanced&w=1440,600,440';
	import adult27 from '$lib/images/ellie/adult/IMG_0454.jpg?enhanced&w=1440,600,440';
	import adult28 from '$lib/images/ellie/adult/IMG_0461.jpg?enhanced&w=1440,600,440';
	import adult29 from '$lib/images/ellie/adult/IMG_0468.jpg?enhanced&w=1440,600,440';
	import adult30 from '$lib/images/ellie/adult/IMG_0518.jpg?enhanced&w=1440,600,440';
	import adult31 from '$lib/images/ellie/adult/IMG_0547.jpg?enhanced&w=1440,600,440';
	import adult32 from '$lib/images/ellie/adult/IMG_0790.jpg?enhanced&w=1440,600,440';
	import adult33 from '$lib/images/ellie/adult/IMG_0828.jpg?enhanced&w=1440,600,440';
	import adult34 from '$lib/images/ellie/adult/IMG_0844.jpg?enhanced&w=1440,600,440';
	import adult35 from '$lib/images/ellie/adult/IMG_0901.jpg?enhanced&w=1440,600,440';
	import adult36 from '$lib/images/ellie/adult/IMG_1466.jpg?enhanced&w=1440,600,440';
	import adult37 from '$lib/images/ellie/adult/IMG_1567.jpg?enhanced&w=1440,600,440';
	import adult38 from '$lib/images/ellie/adult/IMG_1570.jpg?enhanced&w=1440,600,440';
	import adult39 from '$lib/images/ellie/adult/IMG_1653.jpg?enhanced&w=1440,600,440';
	import adult40 from '$lib/images/ellie/adult/IMG_1983.jpg?enhanced&w=1440,600,440';
	import adult69 from '$lib/images/ellie/adult/IMG_2021.jpg?enhanced&w=1440,600,440';
	import adult41 from '$lib/images/ellie/adult/IMG_2900.jpg?enhanced&w=1440,600,440';
	import adult42 from '$lib/images/ellie/adult/IMG_3718.jpg?enhanced&w=1440,600,440';
	import adult43 from '$lib/images/ellie/adult/IMG_3992.jpg?enhanced&w=1440,600,440';
	import adult44 from '$lib/images/ellie/adult/IMG_4904.jpg?enhanced&w=1440,600,440';
	import adult45 from '$lib/images/ellie/adult/IMG_4920.jpg?enhanced&w=1440,600,440';
	import adult46 from '$lib/images/ellie/adult/IMG_4976.jpg?enhanced&w=1440,600,440';
	import adult47 from '$lib/images/ellie/adult/IMG_5279.jpg?enhanced&w=1440,600,440';
	import adult48 from '$lib/images/ellie/adult/IMG_5859.jpg?enhanced&w=1440,600,440';
	import adult49 from '$lib/images/ellie/adult/IMG_6186.jpg?enhanced&w=1440,600,440';
	import adult50 from '$lib/images/ellie/adult/IMG_6410.jpg?enhanced&w=1440,600,440';
	import adult51 from '$lib/images/ellie/adult/IMG_6434.jpg?enhanced&w=1440,600,440';
	import adult52 from '$lib/images/ellie/adult/IMG_6436.jpg?enhanced&w=1440,600,440';
	import adult53 from '$lib/images/ellie/adult/IMG_6625.jpg?enhanced&w=1440,600,440';
	import adult54 from '$lib/images/ellie/adult/IMG_6646.jpg?enhanced&w=1440,600,440';
	import adult55 from '$lib/images/ellie/adult/IMG_6663.jpg?enhanced&w=1440,600,440';
	import adult56 from '$lib/images/ellie/adult/IMG_6695.jpg?enhanced&w=1440,600,440';
	import adult57 from '$lib/images/ellie/adult/IMG_6962.jpg?enhanced&w=1440,600,440';
	import adult58 from '$lib/images/ellie/adult/IMG_7114.jpg?enhanced&w=1440,600,440';
	import adult59 from '$lib/images/ellie/adult/IMG_7127.jpg?enhanced&w=1440,600,440';
	import adult60 from '$lib/images/ellie/adult/IMG_7145.jpg?enhanced&w=1440,600,440';
	import adult61 from '$lib/images/ellie/adult/IMG_8636.jpg?enhanced&w=1440,600,440';
	import adult62 from '$lib/images/ellie/adult/IMG_9146.jpg?enhanced&w=1440,600,440';
	import adult63 from '$lib/images/ellie/adult/IMG_9391.jpg?enhanced&w=1440,600,440';
	import adult64 from '$lib/images/ellie/adult/IMG_9574.jpg?enhanced&w=1440,600,440';
	import adult65 from '$lib/images/ellie/adult/IMG_9613.jpg?enhanced&w=1440,600,440';
	import adult66 from '$lib/images/ellie/adult/IMG_9631.jpg?enhanced&w=1440,600,440';

	const puppyImages = [
		{
			altText: 'Ellie as a puppy in her kennel from the Humane Society',
			url: puppy1,
			objectPosition: 'object-top'
		},
		{
			altText: 'Ellie looking over her shoulder while sitting',
			url: puppy2,
			objectPosition: 'object-top'
		},
		{
			altText: 'Ellie laying on her back looking for scratches',
			url: puppy3
		},
		{
			altText: 'Ellie in a t-shirt',
			url: puppy4,
			objectPosition: 'object-top'
		},
		{
			altText: 'Ellie laying on her bed',
			url: puppy5
		},
		{
			altText: "Ellie laying on Makaylee's bed",
			url: puppy6
		},
		{
			altText: 'Ellie following Makaylee on her bike',
			url: puppy7
		},
		{
			altText: 'Ellie distracting me looking for pets',
			url: puppy8
		}
	];

	const adultImages = [
		{
			altText: 'Ellie enjoying the sunshine',
			url: adult69
		},
		{
			altText: 'Ellie in a tutu at goblin valley looking at Kellie',
			url: adult1
		},
		{
			altText: 'Happy Ellie with a stick',
			url: adult2
		},
		{
			altText: 'Ellie mid shake',
			url: adult3
		},
		{
			altText: 'Ellie up close',
			url: adult4
		},
		{
			altText: 'Ellie face poking out of the covers',
			url: adult5
		},
		{
			altText: 'Ellie with a graduation cap on',
			url: adult6
		},
		{
			altText: 'Ellie in the snow with a stick',
			url: adult7
		},
		{
			altText: 'Ellie in the snow with another stick',
			url: adult8
		},
		{
			altText: 'Ellie mid bike ride',
			url: adult10
		},
		{
			altText: 'Ellie all tucked in',
			url: adult11
		},
		{
			altText: 'Ellie looking over her shoulder',
			url: adult12
		},
		{
			altText: 'Ellie staring into your soul',
			url: adult13
		},
		{
			altText: 'Ellie in goggles',
			url: adult14
		},
		{
			altText: 'Ellie being a goof',
			url: adult15
		},
		{
			altText: 'Ellie with the sun hitting her',
			url: adult16
		},
		{
			altText: 'Ellie in the snow',
			url: adult17
		},
		{
			altText: 'Ellie playing with a ball',
			url: adult18
		},
		{
			altText: 'Ellie acting like one of the grandkids',
			url: adult19
		},
		{
			altText: 'Ellie passed out on the couch',
			url: adult21
		},
		{
			altText: 'Ellie sitting in her spot on the stairs',
			url: adult22
		},
		{
			altText: 'Ellie playing in the snow',
			url: adult23
		},
		{
			altText: 'Ellie laying on me on the couch',
			url: adult24
		},
		{
			altText: 'Ellie laying on my shoulder',
			url: adult25
		},
		{
			altText: 'Ellie on a snow hike',
			url: adult26
		},
		{
			altText: 'Ellie with me on a hike',
			url: adult27
		},
		{
			altText: "Ellie looking where we're going in the car",
			url: adult28
		},
		{
			altText: 'Ellie doing her "nose" trick',
			url: adult29
		},
		{
			altText: 'Ellie laying funny on the couth',
			url: adult30
		},
		{
			altText: 'Ellie buckled up in the truck',
			url: adult31
		},
		{
			altText: 'Ellie looking over her shoulder',
			url: adult32
		},
		{
			altText: 'Ellie laying her face on mine',
			url: adult33
		},
		{
			altText: 'Ellie looking over my shoulders',
			url: adult34,
			objectPosition: 'object-bottom'
		},
		{
			altText: 'Ellie playing with her frisbee in the snow',
			url: adult35
		},
		{
			altText: 'Ellie with her chicken wings',
			url: adult36
		},
		{
			altText: 'Ellie playing with a stick in the snow',
			url: adult37
		},
		{
			altText: 'Ellie with her nose covered in snow',
			url: adult38
		},
		{
			altText: 'Ellie in her life jacket',
			url: adult39,
			objectPosition: 'object-top'
		},
		{
			altText: 'Ellie with her stick',
			url: adult40
		},
		{
			altText: 'Ellie yawning in the sun',
			url: adult41
		},
		{
			altText: 'Ellie on a hike',
			url: adult42
		},
		{
			altText: 'Ellie looking at Kellie',
			url: adult43
		},
		{
			altText: 'Ellie in a hammock',
			url: adult44
		},
		{
			altText: 'Ellie in the flowers',
			url: adult45
		},
		{
			altText: 'Ellie being held like a baby',
			url: adult46
		},
		{
			altText: 'Ellie on the beach in Oregon',
			url: adult47
		},
		{
			altText: 'Ellie at Goblin Valley',
			url: adult48
		},
		{
			altText: 'Ellie chilling in the car',
			url: adult49
		},
		{
			altText: 'Ellie getting some loves',
			url: adult50
		},
		{
			altText: 'Ellie passed out in the car',
			url: adult51
		},
		{
			altText: 'Ellie waiting for her ball to be thrown at the beach',
			url: adult52
		},
		{
			altText: 'Ellie walking on the beach',
			url: adult53
		},
		{
			altText: 'Ellie paddleboarding',
			url: adult54
		},
		{
			altText: 'Ellie smiling',
			url: adult55
		},
		{
			altText: 'Ellie celebrating her birthday',
			url: adult56
		},
		{
			altText: 'Ellie thinking the boat flag is a toy',
			url: adult57
		},
		{
			altText: 'Ellie biking',
			url: adult58
		},
		{
			altText: 'Ellie snuggling',
			url: adult59
		},
		{
			altText: 'Ellie fetching a stick at the lake',
			url: adult60
		},
		{
			altText: 'Ellie looking pretty at the beach',
			url: adult61
		},
		{
			altText: 'Ellie playing in the ocean',
			url: adult62
		},
		{
			altText: 'Ellie looking prestigious',
			url: adult63
		},
		{
			altText: 'Ellie standing on a stump',
			url: adult64
		},
		{
			altText: 'Ellie as an adult',
			url: adult65
		},
		{
			altText: 'Ellie as an adult',
			url: adult66
		},
		{
			altText: 'Ellie as an adult',
			url: adult67
		},
		{
			altText: 'Ellie as an adult',
			url: adult68
		}
	];
</script>

<Seo
	title="Ellie"
	description="Some of my favorite memories with Ellie"
	ogImage="https://michaelbonner.dev/images/ellie-og-image.jpg"
/>

<main class="grid gap-8 container mx-auto px-8 py-12">
	<div class="prose dark:prose-invert prose-xl mt-12 max-w-3xl mx-auto">
		<p>
			<strong>Warning</strong>: This post is about my dog Ellie. She passed away on January 30th,
			2023. I'm writing this to help me remember her. If you don't want to read about my feelings
			about a dog <a href="http://www.staggeringbeauty.com/">you can leave now</a>.
		</p>
		<hr class="border-gray-300 dark:border-gray-700" />
		<figure>
			<enhanced:img
				alt="Ellie"
				class="aspect-[600/800] rounded-xl shadow-lg w-full lg:max-w-[600px]"
				sizes="min(600px, 100vw)"
				src={ellieMain}
			/>
			<figcaption>
				<p>Ellie - 9/10/10 - 1/30/23</p>
			</figcaption>
		</figure>

		<h1>Dear Ellie,</h1>

		<p>
			I'm sorry it's taken me a while to write this. Since you passed I haven't been able to compose
			myself enough to write it. Every time I even think about writing it my eyes hurt and my chest
			shakes. I miss you so much Ellie. But I want to write things down so I don't forget. I don't
			want to forget you.
		</p>

		<p>
			Despite my best efforts I'm forgetting the way you smell, the way you'd nuzzle under the
			covers with me, the way your eyes would pierce through me, your endless curiosity, the way
			you'd jump and dance in circles when I came home, how you would get so excited when I'd get
			your leash out, the calm I would feel when you cuddled me, the way your ears felt when I
			played with them, the way you'd look at me when I'd talk to you, the way you played king of
			the bed with me like you knew how the game worked, the way you loved everyone around you, the
			way you'd run right behind me when we went biking, the way you'd run up to me when I'd call
			your name, the way you'd tuck when you were embarrassed (like when you farted), the way you
			would comfort me when I was sad, the way you'd make me laugh, the way you'd make me smile, how
			patient you were with kids hanging on you, how you'd lay your head anywhere you could find a
			spot on me, the way you'd hide when I watched sports because the stress was just too much, the
			way you'd lay on your back and hold your toy above your head while you chewed on it, how
			patient you were with puppies, how proud you'd get when you caught the frisbee before it hit
			the ground, and how you loved Kellie.
		</p>

		<p>I'm realizing that only way to heal is to forget parts of you. And that fucking sucks.</p>

		<hr class="border-gray-300 dark:border-gray-700" />

		<p>
			I was 24 when I first met you, I was newly married, and I was so naive. My then wife
			(Chelsie), her 3 year old daughter (Makaylee), and I had just moved into our first apartment
			together, and we were just figuring out how to be a family and make a marriage work. We were
			both working full time and going to school full time. We were busy, and we were stressed, and
			we were young and dumb. Chelsie wanted a dog so bad but I didn't want to make a dog live in a
			little apartment with the 3 of us. I thought it was cruel and unfair. So you can imagine how I
			felt when Chelsie and Makaylee brought you to my work (Boater's Outlet) on February 11, 2011.
			I was irritated, but you were so dang cute. To be honest, it wasn't love at first sight; you
			peed under a shelf at my work. But I saw how you lit up Makaylee's face, and there was no way
			I could say no. They told us that you were ~5 months old, that you were a lab/dane mix, and
			that your previous owners took you to the humane society because you had too much energy. Holy
			shit did they miss out!
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
			time. It was like you couldn't get close enough to me. I leaned into the cuddle and hugged
			you. Then I noticed my leg was getting warm. I looked down and you were peeing on my thigh! I
			was so shocked I didn't know what to do. We sat outside there for at least half an hour until
			you finally peed so I could reward you. I was so mad at you, but I couldn't stay mad at you.
			You were so cute and you were just a puppy. I knew you didn't know any better. You probably
			thought "pee in front of Mike, get a treat. Pee on Mike get a lifetime supply of treats!"
		</p>
	</div>

	<div
		class="max-h-[80vh] overflow-auto max-w-7xl grid gap-2 mx-auto mb-scrollable p-8 bg-gray-300 dark:bg-gray-700 rounded-2xl"
	>
		<ImageGallery galleryID="ellie-puppy" images={puppyImages} />

		<div class="grid lg:grid-cols-2 gap-2">
			<figure>
				<video
					class="aspect-w-16 aspect-h-9 rounded-lg w-full p-0"
					controls
					controlsList="nodownload"
					playsinline
					poster="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-makaylee.webp"
				>
					<source
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-makaylee.webm"
						type="video/webm"
					/>
					<source
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-makaylee.ogv"
						type="video/ogg"
					/>
					<source
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-makaylee.mp4"
						type="video/mp4"
					/>

					<track
						kind="captions"
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-makaylee.vtt"
						label="Captions"
					/>
				</video>
			</figure>

			<figure>
				<video
					class="aspect-w-16 aspect-h-9 rounded-lg w-full p-0"
					controls
					controlsList="nodownload"
					playsinline
					poster="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-nieces-and-nephews.webp"
				>
					<source
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-nieces-and-nephews.webm"
						type="video/webm"
					/>
					<source
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-nieces-and-nephews.ogv"
						type="video/ogg"
					/>
					<source
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-nieces-and-nephews.mp4"
						type="video/mp4"
					/>

					<track
						kind="captions"
						src="https://mbonner-general-web.s3-us-west-2.amazonaws.com/videos/ellie/slide-with-nieces-and-nephews.vtt"
						label="Captions"
					/>
				</video>
			</figure>
		</div>
	</div>

	<div class="prose dark:prose-invert prose-xl mt-12 max-w-3xl mx-auto">
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
			you were in it. I remember walking along the river and you running down the trail, then down
			to the river, then back to the trail to catch up with me, and then back down to the river.
		</p>

		<p>
			One of my favorite memories with you was at Bear Lake with some friends. We had set up camp
			for the night and were having a few drinks on the beach. You wanted to play with a stick and
			refused to take no for an answer. You probably found 50 sticks by the end of the night. When
			one person said "no" you'd just go to the next person. Then the sun went down and you kept
			going at it. You even found an 8' 4x4 fence post and dragged that over. Water meant play for
			you. We sat around the camp fire that night and you kept trying to pull out sticks from the
			fire. It was like you were saying, "Those are perfectly good playing sticks. Why are you
			trying to burn them?" When it was time to sleep you got in the tent and passed out like you
			always did after a long day of playing. The next morning we woke up slow and made breakfast on
			the camp fire. After a few minutes I couldn't find you, which was odd because you always
			stayed right by me when we were camping. After a couple minutes looking for you I noticed
			something out in the lake near us. It was you! Just out for a morning lap in the lake. You
			were in your happy place.
		</p>

		<p>
			Throughout all of the stressful times in my life you were there, just as happy as always. You
			never responded to my stress with fear, always with love. You would do anything to make me
			happy. You were the best dog I could have ever asked for.
		</p>

		<p>
			When I got a divorce from my ex-wife, we had to divide up our assets. You came up in the
			discussion and I immediately said you were mine, non-negotiable. She obviously wanted you to
			go with her and she put up a fight, but at the end of the day she knew you belonged with me.
			You and I were inseparable.
		</p>

		<p>
			You became my perfect companion. You came to work with me sometimes, you came bikepacking with
			me (and destroyed your paws 😬). You came skiing with me. You came to bars. You were the
			perfect wing woman.
		</p>

		<p>
			I remember the time your back knee ligament popped. I was still on crutches after breaking my
			leg and took you to the school by our house. I used to throw the ball with my lacrosse stick
			as far as I could and you'd one-hop it like it was no big deal. You were so fast. One time I
			threw it and after a few strides you yelped like I'd never heard you yelp before. Even when
			you were in that much pain you still went and got your ball, just on three legs. I had no idea
			what had happened. I loaded you in the truck and took you to the vet. The first vet told me it
			was arthritis, and that you'll just have to take pain meds the rest of your life. I wasn't
			satisfied with that, so I took you to another vet. When we got back into the room the vet
			immediately knew what was wrong. He said he saw you in the waiting room and knew you had torn
			a major ligament (CCL) in your back leg. He said it was a common injury for labs. He said we
			could do surgery, but it would be expensive and it would take a long time to recover. I never
			considered anything besides surgery. You were only 5 years old. We did the surgery and you
			healed well. After a few months you were able to run again. And almost immediately you popped
			your other back leg's CCL. I knew exactly what had happened, and we got you in for the surgery
			on the other leg. It took 9 months from your first tear to healthy again, those were some
			rough times. You couldn't do stairs so I brought my mattress down to sleep with you on the
			floor in the living room. In the end you were healthy, but never really the same physically.
			You lost your jump, but you never lost your spirit.
		</p>

		<p>
			As the years went on your body started breaking down, but you never really complained. You
			were always endless optimism. Even when it hurt too much to run you still seemed to smile. You
			were so expressive with your face. You could tell me anything with your eyes. I always felt
			like I knew what you were thinking.
		</p>
	</div>

	<div
		class="max-h-[80vh] overflow-auto max-w-7xl mx-auto mb-scrollable p-8 bg-gray-300 dark:bg-gray-700 rounded-2xl"
	>
		<ImageGallery galleryID="ellie-adult" images={adultImages} />
	</div>

	<div class="prose dark:prose-invert prose-xl mt-12 max-w-3xl mx-auto">
		<p>
			I told you that you would need to tell me when you were ready. I will forever be grateful that
			you told me so clearly. When your back legs quit working for the last few days, I helped you
			go to the bathroom. One time you found a spot, dug your paw, and tried lay there and hide.
			That broke me because I knew what you were doing. I said nope, and we kept walking around; but
			then you did it again. Then you looked at me with those big eyes and told me you were ready. I
			don't know how you did it, but I knew that's what you were saying. I've never felt so much
			pain in my life. I knew I had to let you go.
		</p>

		<p>
			We celebrated you the next day. You were depressed and slow that morning but then your friends
			came over to give you treats and say goodbye. You perked up when they came around. One of your
			final acts was to put on a happy face for your friends. We sat around and told stories about
			you. We let you eat all the things I never let you eat your whole life. We let you drink
			Ellie's Aloha Ale™️. We laughed and cried. You were so loved Ellie.
		</p>

		<p>
			After you passed I felt the most intense pain I've ever felt. I've never cried so much in my
			life. Kellie and I took time off of work and went hiking in the snow. Being there reminded me
			of all the amazing times we had together in the mountains. I knew we did the right thing, but
			it still hurt. It took me 2 months before I went a day without crying. I still cry when I
			think about you. I miss you so much Ellie. I miss your big brown eyes. I miss your giant
			heart. I miss you so much.
		</p>

		<p>
			You saved me Ellie. I had plenty of dark, stressful moments in my life with you, but you
			always saved me. All you had to do was look at me with those big brown eyes and I knew
			everything was going to be okay. You were my rock. You were my best friend. After all the
			times you saved me, I'm sorry I couldn't save you.
		</p>

		<figure>
			<enhanced:img
				alt="Ellie swimming off to get a ball"
				class="rounded-xl shadow-lg"
				loading="lazy"
				sizes="min(600px, 100vw)"
				src={goodbye}
			/>
		</figure>

		<iframe
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			frameBorder="0"
			height="152"
			loading="lazy"
			src="https://open.spotify.com/embed/track/1IUEz40wavYETWJgak8iI3?utm_source=generator&theme=0"
			style="border-radius:12px"
			title="Ghost - Josiah and the Bonnevilles"
			width="100%"
		/>

		<hr class="border-gray-300 dark:border-gray-700" />

		<p>Posted 08 Aug 2023</p>
	</div>
</main>
