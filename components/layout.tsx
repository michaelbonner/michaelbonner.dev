import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { classes } from "../styles/classes";
import { classNames } from "../styles/classNames";

const Layout = ({
  children,
  description,
  title,
  ogImage = "https://michaelbonner.dev/og-image.jpg",
  ogType = "website",
}) => {
  const { pathname } = useRouter();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    let hue = 208;

    const interval = setInterval(() => {
      meta.setAttribute("content", `hsl(${(hue -= 1)}, 50%, 30%)`);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={classNames(
        "font-serif bg-gray-200 text-gray-800 min-h-screen bg-opacity-80",
        "dark:bg-gray-800 dark:text-gray-200 dark:bg-opacity-70"
      )}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="hsl(208, 50%, 30%)" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta
          property="og:url"
          content={`https://michaelbonner.dev${pathname}`}
        />
        <meta name="author" content="Michael Bonner" />
        <meta property="profile:first_name" content="Michael" />
        <meta property="profile:last_name" content="Bonner" />
        <meta property="profile:username" content="michaelbonner" />
        <meta property="fb:app_id" content="383758763158159" />
        <link
          rel="apple-touch-icon"
          href="https://michaelbonner.dev/icon.png"
        />
      </Head>

      <header className="flex justify-between pt-12 px-8 container mx-auto">
        <Link href={`/`}>
          <a className={classNames("lg:text-3xl", classes.menuItem)}>
            Michael Bonner
          </a>
        </Link>
        <nav className="flex justify-end space-x-6 text-xl">
          <Link href="/">
            <a className={classes.menuItem}>Home</a>
          </Link>
          <Link href="/blog">
            <a className={classes.menuItem}>Blog</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer className="lg:flex lg:items-center lg:flex-row-reverse justify-between container mx-auto p-8">
        <nav className="flex justify-center lg:justify-end space-x-6 text-xl pb-8 lg:py-0">
          <Link href="/">
            <a className={classes.menuItem}>Home</a>
          </Link>
          <Link href="/blog">
            <a className={classes.menuItem}>Blog</a>
          </Link>
          <Link href="/uses">
            <a className={classes.menuItem}>Uses</a>
          </Link>
          <Link href="/policies">
            <a className={classes.menuItem}>Policies</a>
          </Link>
        </nav>
        <p className="text-center lg:text-left">
          &copy; {new Date().getFullYear()} by Michael Bonner.{" "}
          <a
            className={classNames(classes.menuItem, "text-sm inline-block")}
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
