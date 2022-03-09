import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";

const articles = [
  {
    imageUrl: "/images/tuff-website-screenshot-trimmed.png",
    href: "/blog/getting-started-as-a-web-developer-in-2022",
    title: "Where I think new web software developers should start in 2022",
    description: "The guide I wish I had when getting started",
    date: "2022-03-09",
    datetime: "2022-03-09T00:00:00+00:00",
    readingTime: 15,
  },
  {
    imageUrl: "/images/iterm-aliases-trimmed.png",
    href: "/blog/set-up-some-aliases",
    title: "Set up some aliases",
    description: "Just use them, they will change your life",
    date: "2021-07-15",
    datetime: "2021-07-15T00:00:00+00:00",
    readingTime: 5,
  },
];

export default function Blog() {
  return (
    <Layout
      title="Developer Blog | Michael Bonner"
      description="Just writing down some things"
    >
      <main className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="container mx-auto px-8 py-12">
          <div className="prose dark:prose-invert max-w-3xl">
            <h1>Web Developer Blog</h1>
            <p>
              I&apos;m a full-time web developer, and I find things I want to
              write down, so I do from time to time.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
            {articles.map((article) => (
              <div
                key={article.title}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={article.href}>
                  <a className="flex-shrink-0 leading-[0]">
                    <Image
                      className="h-48 w-full object-cover"
                      src={article.imageUrl}
                      alt={article.title}
                      width="800"
                      height="400"
                    />
                  </a>
                </Link>
                <div className="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
                  <a href={article.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                      {article.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-200">
                      {article.description}
                    </p>
                  </a>
                  <div className="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={article.datetime}>{article.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{article.readingTime} read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
