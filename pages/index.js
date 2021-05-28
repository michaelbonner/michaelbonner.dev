import Image from "next/image";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { HiLink } from "react-icons/hi";
import Layout from "../components/layout";

const projects = [
  {
    title: `Primary Children's Hospital: Here Kids Win`,
    url: `https://herekidswin.com/`,
    github: `https://github.com/FaktoryUtah/primary-childrens-stories`,
  },
  {
    title: `Wasatch Covers`,
    url: `https://wasatchcovers.com/`,
  },
  {
    title: `Ravens Film Works`,
    url: `https://ravensfilmworks.com/`,
    github: `https://github.com/michaelbonner/ravens`,
  },
  {
    title: `NEF Programs Administration System`,
    url: `https://pas.nef1.org/`,
  },
];

const tools = [
  "JavaScript",
  "TypeScript",
  "Node",
  "PHP",
  "AWS",
  "Serverless",
  "Next",
  "Gatsby",
  "GraphQL",
  "Laravel",
  "MongoDB",
  "MySQL",
  "WordPress",
  "Shopify",
];

export default function Home() {
  return (
    <Layout
      title="Michael Bonner | Developer in Salt Lake, UT"
      description="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT"
    >
      <main className="container mx-auto px-8 py-12 flex items-center">
        <div className="pt-8">
          <div className="lg:flex lg:flex-row-reverse lg:pt-16">
            <div className="w-full lg:w-1/3 mt-8 lg:mt-4">
              <Image
                alt="Michael Bonner photo"
                className="bg-indigo-300 bg-opacity-100 rounded-lg w-full h-auto mix-blend-luminosity hover:mix-blend-normal"
                src="/images/on-the-beach.jpg"
                width="600"
                height="400"
              />
            </div>
            <div className="mt-8 lg:mt-0 w-full lg:w-2/3 lg:pr-8">
              <h1 className="leading-relaxed text-4xl tracking-wide lg:pr-8">
                Hi! I'm{" "}
                <span className="font-medium whitespace-nowrap">
                  Michael Bonner
                </span>
                , a web developer in Salt Lake City, Utah. I run a small agency
                with some friends called{" "}
                <span className="whitespace-nowrap">
                  <a
                    className="font-medium lg:leading-none border-b-4 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1 lg:inline-block"
                    href="https://bootpackdigital.com/"
                  >
                    Bootpack Digital
                  </a>
                  .
                </span>
              </h1>
              <div className="lg:inline-block my-8 lg:my-0">
                <a
                  className="my-8 md:flex space-x-2 text-2xl border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1"
                  href="https://github.com/michaelbonner"
                >
                  <span>See what I'm up to on GitHub</span>
                  <SiGithub className="hidden lg:inline-block" />
                </a>
              </div>
              <div className="text-xl leading-relaxed">
                <p className="mt-4">
                  I started making websites in high school back in 2003. I
                  actually found a copy of my first site and{` `}
                  <a
                    className="my-8 text-lg border-b border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-colors"
                    href="https://tuff.michaelbonner.dev/"
                  >
                    put it up here
                  </a>
                  . Epic, right? Don't miss the days of GeoCities. From there I
                  made websites for people I knew, then people they knew, and so
                  on. Making websites was definitely my thing. Since then I have
                  worked at a handful of places making websites, web
                  applications, and mobile apps. I also was a director at a
                  digital agency, and taught a boot camp for the University of
                  Utah. I love what I do, and I'm always down to chat about it.
                </p>
                <p className="mt-4">
                  Also, I really like podcasts so I made a site to keep track of
                  the podcasts I listen to. You can{" "}
                  <a
                    className="my-8 text-lg border-b border-gray-400 hover:text-blue-800 hover:border-blue-400 transition-colors"
                    href="https://podcasts.michaelbonner.dev/"
                  >
                    check that out here
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Projects I'm proud of</h2>
            <ul className="mt-8 text-lg lg:grid lg:grid-cols-2 gap-x-4 gap-y-12">
              {projects.map((project) => {
                return (
                  <li className="ml-4 lg:ml-8 mt-8 lg:mt-0" key={project.title}>
                    <p className="mb-2">
                      <a
                        className="inline border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-colors text-xl"
                        href={project.url}
                      >
                        {project.title}
                      </a>
                    </p>
                    <div className="flex justify-start space-x-4">
                      {project.url && (
                        <p>
                          <a
                            className="flex space-x-1 border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-colors text-base"
                            href={project.url}
                          >
                            <HiLink className="text-xl" />
                            <span>View Project</span>
                          </a>
                        </p>
                      )}
                      {project.github && (
                        <p>
                          <a
                            className="flex space-x-1 border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-colors text-base"
                            href={project.github}
                          >
                            <SiGithub className="text-xl" />
                            <span>Source</span>
                          </a>
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Tools I use</h2>
            <ul className="mt-4 pl-12 list-outside list-disc text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
              {tools.map((tool) => {
                return <li key={tool}>{tool}</li>;
              })}
            </ul>
          </div>
          <div className="lg:mt-32">
            <h2 className="text-3xl mt-16">Get in touch</h2>
            <ul className="mt-6 pl-4 text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
              <li>
                <div className="flex">
                  <a
                    className="flex space-x-1 justify-start items-center border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-colors"
                    href="https://www.linkedin.com/in/michaelbonner/"
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
                    className="flex space-x-1 justify-start items-center border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-colors"
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
