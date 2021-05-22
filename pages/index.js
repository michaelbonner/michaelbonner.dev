import Image from "next/image";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout
      title="Michael Bonner | Developer in Salt Lake, UT"
      description="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT"
    >
      <main className="container mx-auto px-8 py-12 flex items-center">
        <div className="pt-8">
          <div className="lg:flex lg:pt-16">
            <div>
              <h1 className="leading-relaxed text-4xl tracking-wide lg:pr-8">
                Hi! I'm{" "}
                <span className="font-medium whitespace-nowrap">
                  Michael Bonner
                </span>
                , a web developer in Salt City Lake, Utah. I run a small agency
                with some friends called{" "}
                <span className="whitespace-nowrap">
                  <a
                    className="font-medium lg:leading-none border-b-4 border-gray-300 hover:border-gray-400 transition-all transform hover:-translate-y-1 lg:inline-block"
                    href="https://bootpackdigital.com/"
                  >
                    Bootpack Digital
                  </a>
                  .
                </span>
              </h1>
              <div className="lg:inline-block my-8 lg:my-0">
                <a
                  className="my-8 lg:flex space-x-2 text-2xl border-b-2 border-gray-300 hover:border-gray-400 transition-all transform hover:-translate-y-1"
                  href="https://github.com/michaelbonner"
                >
                  <span>See what I'm up to on GitHub</span>
                  <SiGithub />
                </a>
              </div>
            </div>
            <div className="mt-4">
              <Image
                className="bg-gray-300 rounded-lg w-full h-auto transition-all mix-blend-luminosity hover:mix-blend-normal"
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
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>PHP</li>
              <li>Serverless</li>
              <li>Next.js</li>
              <li>Gatsby</li>
              <li>GraphQL</li>
              <li>Laravel</li>
              <li>MongoDB</li>
              <li>MySQL</li>
              <li>WordPress</li>
              <li>Shopify</li>
            </ul>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Get in touch</h2>
            <ul className="mt-6 pl-4 text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
              <li>
                <div className="flex">
                  <a
                    className="flex space-x-1 justify-start items-center border-b-2 border-gray-300 hover:border-gray-400 transition-all"
                    href="http://linkedin.com/me/michaelbonner"
                  >
                    <SiLinkedin />
                    <span className="pt-1">LinkedIn</span>
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
                    <span className="pt-1">Instagram</span>
                  </a>
                  <span className="flex-1"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
