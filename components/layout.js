import Head from "next/head";
import Link from "next/link";
import React from "react";

const Layout = ({ children, description, title }) => {
  return (
    <div className="font-serif bg-gray-200 text-gray-800 min-h-screen bg-opacity-80">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="pt-12 px-8 container mx-auto">
        <nav className="flex justify-end space-x-4 text-xl">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer className="lg:flex lg:flex-row-reverse justify-between container mx-auto p-8 bg-gray-400 lg:bg-transparent bg-opacity-30">
        <nav className="flex justify-center lg:justify-end space-x-4 text-xl pb-8 lg:py-0">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </nav>
        <p className="text-center lg:text-left">
          &copy; {new Date().getFullYear()} by Michael Bonner.{" "}
          <a
            className="underline block lg:inline"
            href="https://github.com/michaelbonner/michaelbonner.dev"
          >
            Source for this site
          </a>
        </p>
      </footer>
    </div>
  );
};
export default Layout;
