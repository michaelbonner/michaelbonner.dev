import Head from "next/head";
import Image from "next/image";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

export default function Home() {
  return (
    <div className="font-serif bg-gray-200 text-gray-800">
      <Head>
        <title>Michael Bonner | Developer in Salt Lake, UT</title>
        <meta
          name="description"
          content="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-8 py-12 flex items-center">
        <div className="pt-8">
          <div className="lg:flex lg:pt-24">
            <div>
              <h1 className="text-5xl leading-relaxed tracking-wide lg:pr-8">
                Hi! I'm <span className="font-medium">Michael Bonner</span>, a
                web developer in Salt Lake, UT. I run a small agency with some
                friends called{" "}
                <a
                  className="font-medium leading-none border-b-4 border-gray-300 hover:border-gray-400 transition-all transform hover:-translate-y-1 inline-block"
                  href="https://bootpackdigital.com/"
                >
                  Bootpack Digital
                </a>
                .
              </h1>
              <div className="inline-block">
                <a
                  className="my-8 flex space-x-2 text-2xl border-b-2 border-gray-300 hover:border-gray-400 transition-all transform hover:-translate-y-1"
                  href="https://github.com/michaelbonner"
                >
                  <span>See what I'm up to on GitHub</span>
                  <SiGithub />
                </a>
              </div>
            </div>
            <div className="mt-4">
              <Image
                className="rounded-lg w-full h-auto transition-all lg:mix-blend-luminosity hover:mix-blend-normal"
                src="/images/on-the-beach.jpg"
                width="2066 "
                height=" 1378"
              />
            </div>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Projects I'm proud of</h2>
            <ul className="mt-4 pl-12 list-outside list-disc text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
              <li className="lg:pr-8">
                <a
                  className="inline border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                  href="https://herekidswin.com/"
                >
                  Primary Children's Hospital: Here Kids Win
                </a>
              </li>
              <li className="lg:pr-8">
                <a
                  className="inline border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                  href="https://wasatchcovers.com/"
                >
                  Wasatch Covers
                </a>
              </li>
              <li className="lg:pr-8">
                <a
                  className="inline border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                  href="https://ravensfilmworks.com/"
                >
                  Ravens Film Works
                </a>
              </li>
              <li className="lg:pr-8">
                <a
                  className="inline border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                  href="https://pas.nef1.org/"
                >
                  NEF Programs Administration System
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Tools I use</h2>
            <ul className="mt-4 pl-12 list-outside list-disc text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
              <li>Serverless</li>
              <li>Next.js</li>
              <li>Gatsby</li>
              <li>Laravel</li>
              <li>MongoDB</li>
              <li>MySQL</li>
              <li>WordPress</li>
              <li>Shopify</li>
            </ul>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Get in touch</h2>
            <ul className="mt-4 pl-12 list-outside list-disc text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
              <li>
                <div className="flex">
                  <a
                    className="flex space-x-1 justify-start items-center border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                    href="http://linkedin.com/me/michaelbonner"
                  >
                    <SiLinkedin />
                    <span>LinkedIn</span>
                  </a>
                  <span className="flex-1"></span>
                </div>
              </li>
              <li>
                <div className="flex">
                  <a
                    className="flex space-x-1 justify-start items-center border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                    href="https://www.instagram.com/michael__bonner"
                  >
                    <SiInstagram />
                    <span>Instagram</span>
                  </a>
                  <span className="flex-1"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="container mx-auto p-8 pt-12">
        &copy; {new Date().getFullYear()} by Michael Bonner.{" "}
        <a
          className="underline"
          href="https://github.com/michaelbonner/michaelwbonner.com"
        >
          Github
        </a>
        .
      </footer>
    </div>
  );
}
