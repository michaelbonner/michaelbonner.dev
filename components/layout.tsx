import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

const Layout = ({
  children,
  description,
  title,
  ogImage = "https://michaelbonner.dev/og-image.jpg",
}) => {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    let hue = 208;

    const interval = setInterval(() => {
      meta.setAttribute("content", `hsl(${(hue -= 1)}, 50%, 30%)`);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-serif bg-gray-200 text-gray-800 min-h-screen bg-opacity-80">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="hsl(208, 50%, 30%)" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link
          rel="apple-touch-icon"
          href="https://michaelbonner.dev/icon.png"
        />
      </Head>

      <header className="flex justify-between pt-12 px-8 container mx-auto">
        <Link href={`/`}>
          <a className="text-2xl font-medium border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1">
            Michael Bonner
          </a>
        </Link>
        <nav className="flex justify-end space-x-6 text-xl">
          <Link href="/">
            <a className="text-xl border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1">
              Home
            </a>
          </Link>
          <Link href="/blog">
            <a className="text-xl border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1">
              Blog
            </a>
          </Link>
        </nav>
      </header>

      {children}

      <footer className="lg:flex lg:items-center lg:flex-row-reverse justify-between container mx-auto p-8">
        <nav className="flex justify-center lg:justify-end space-x-6 text-xl pb-8 lg:py-0">
          <Link href="/">
            <a className="text-xl border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1">
              Home
            </a>
          </Link>
          <Link href="/blog">
            <a className="text-xl border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1">
              Blog
            </a>
          </Link>
          <Link href="/uses">
            <a className="text-xl border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1">
              Uses
            </a>
          </Link>
        </nav>
        <p className="text-center lg:text-left">
          &copy; {new Date().getFullYear()} by Michael Bonner.{" "}
          <a
            className="border-b-2 border-gray-300 hover:text-blue-800 hover:border-blue-400 transition-all transform hover:-translate-y-1 inline-block lg:inline"
            href="https://github.com/michaelbonner/michaelbonner.dev"
          >
            Check out the source for this site
          </a>
        </p>
      </footer>
    </div>
  );
};
export default Layout;
