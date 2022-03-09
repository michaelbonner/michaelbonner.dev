import Link from "next/link";
import Layout from "../../components/layout";

const articles = [
  {
    href: "/blog/getting-started-as-a-web-developer-in-2022",
    title: "Where I think new web software developers should start in 2022",
    description: "The guide I wish I had when getting started",
  },
  {
    href: "/blog/set-up-some-aliases",
    title: "Set up some aliases",
    description: "Just use them, they will change your life",
  },
];

export default function Blog() {
  return (
    <Layout
      title="Developer Blog | Michael Bonner"
      description="Just writing down some things"
    >
      <main className="container mx-auto px-8 py-12 items-center">
        <div className="pt-8">
          <div className="lg:pt-24">
            <div>
              <h1 className="leading-relaxed text-4xl tracking-wide lg:pr-8">
                Blog
              </h1>
            </div>
          </div>
        </div>
        {articles.map((article) => {
          return (
            <article key={article.href}>
              <Link href={article.href}>
                <a className="block lg:flex justify-between items-center gap-4 max-w-3xl mt-8 border-2 border-gray-300 hover:border-gray-400 transition-all py-4 px-8 text-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div>
                    <h2 className="inline text-2xl border-b-2 border-gray-300 hover:border-gray-400 transition-all">
                      {article.title}
                    </h2>
                    <p className="mt-2">{article.description}</p>
                  </div>
                  <p className="whitespace-nowrap">
                    <span className="border-b-2 border-gray-300 hover:border-gray-400 transition-all">
                      Read More
                    </span>
                  </p>
                </a>
              </Link>
            </article>
          );
        })}
      </main>
    </Layout>
  );
}
