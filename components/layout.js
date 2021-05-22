import Head from "next/head";
import React from "react";

const Layout = ({ children, description, title }) => {
  return (
    <div className="font-serif bg-gray-200 text-gray-800">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

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
};
export default Layout;
