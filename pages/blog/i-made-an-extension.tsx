import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import { classes } from "../../styles/classes";

export default function SetUpSomeAliases() {
  return (
    <Layout
      title="I made my first Chrome extension | Michael Bonner"
      description="Really simple one, and it was really easy to make"
      ogType="article"
    >
      <Head>
        <meta
          property="article:published_time"
          content="2022-05-01T12:58:46.469Z"
        />
        <meta
          name="publish_date"
          property="og:publish_date"
          content="2022-05-01T12:58:46.469Z"
        />
      </Head>
      <main className="container mx-auto px-8 py-12 flex items-center">
        <div className="w-full max-w-3xl prose dark:prose-invert">
          <div className="pt-8">
            <div className="lg:pt-24">
              <div>
                <h1 className="text-4xl tracking-wider leading-[1.3em] lg:pr-8">
                  I made my first Chrome extension
                </h1>
              </div>
            </div>
            <div className="lg:mt-24 text-lg max-w-5xl">
              <p>
                I didn&apos;t realize how easy it is to make an extension.
                Google has a step-by-step example here:{" "}
                <a href="https://developer.chrome.com/docs/extensions/mv3/getstarted/">
                  https://developer.chrome.com/docs/extensions/mv3/getstarted/
                </a>
              </p>

              <p>
                I use Basecamp, and I love it. But I wanted to change some of
                the UI a bit. I figure other people might like the changes too.
              </p>

              <h2>Before extension</h2>
              <figure>
                <Image
                  alt="Before extension"
                  height="536"
                  src="/images/before-extension.png"
                  width="800"
                />
                <figcaption className="text-center">
                  Notice how big and in your face those completed items are?
                </figcaption>
              </figure>
              <h2>After extension</h2>
              <figure>
                <Image
                  alt="After extension"
                  height="536"
                  src="/images/after-extension.png"
                  width="800"
                />
                <figcaption className="text-center">
                  Notice how much nicer that looks?
                </figcaption>
              </figure>

              <p>
                That&apos;s all it does for now, but I&apos;ll add more as I
                find other things that bug me. 😄
              </p>

              <p>
                <a href="https://chrome.google.com/webstore/detail/basecamp-ui-tweaks/aefhfcjkdpdjhbjdhoojknelmlodaidn?hl=en">
                  Download the extension here
                </a>
              </p>

              <p>
                <a href="https://chrome.google.com/webstore/detail/basecamp-ui-tweaks/aefhfcjkdpdjhbjdhoojknelmlodaidn?hl=en">
                  <Image
                    className="bg-white rounded-md shadow-sm"
                    alt="Available in the chrome web store"
                    src="/images/available-in-the-chrome-web-store.png"
                    height="60"
                    width="200"
                  />
                </a>
              </p>

              <p className="mt-16">
                Published:{` `}
                <time dateTime="2022-05-01">01 May 2022</time>
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
