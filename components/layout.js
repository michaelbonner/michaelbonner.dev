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

      <footer className="container mx-auto p-8 pt-12">
        &copy; {new Date().getFullYear()} by Michael Bonner.{" "}
        <a
          className="underline"
          href="https://github.com/michaelbonner/michaelbonner.dev"
        >
          Source for this site
        </a>
        .
      </footer>
    </div>
  );
};
export default Layout;
