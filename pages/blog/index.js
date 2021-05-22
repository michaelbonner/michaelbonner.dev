import Link from "next/link";
import Layout from "../../components/layout";

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
        <article>
          <Link href="/blog/set-up-some-aliases">
            <a className="max-w-2xl mt-8 border-2 border-gray-300 hover:border-gray-400 transition-all py-4 px-8 text-lg block lg:flex justify-between items-center hover:bg-gray-100">
              <div>
                <h2 className="inline text-2xl border-b-2 border-gray-300 hover:border-gray-400 transition-all">
                  Set up some aliases
                </h2>
                <p className="mt-2">
                  Just use them, they will change your life
                </p>
              </div>
              <p>
                <span className="border-b-2 border-gray-300 hover:border-gray-400 transition-all">
                  Read More
                </span>
              </p>
            </a>
          </Link>
        </article>
      </main>
    </Layout>
  );
}
