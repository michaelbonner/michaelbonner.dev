import Image from "next/image";
import Layout from "../../components/layout";

export default function SetUpSomeAliases() {
  return (
    <Layout
      title="Where I think new web software developers should start | Michael Bonner"
      description="Getting started as a web developer is hard; hopefully I can help a little bit."
    >
      <main className="container mx-auto px-8 py-12 flex items-center">
        <div className="max-w-3xl prose">
          <div className="pt-8">
            <div className="lg:pt-24">
              <div>
                <h1 className="leading-relaxed text-4xl tracking-wide lg:pr-8">
                  Where I think new web software developers should start in 2022
                </h1>
              </div>
            </div>
            <div className="lg:mt-32 text-lg prose max-w-5xl">
              <p>
                Getting started as a web developer is hard; hopefully I can help
                a little bit. Keep in mind this is only my opinion, you should
                find other people&apos;s opinions as well. I have found things
                that work for me, but I could be completely wrong on what works
                for you.
              </p>
              <h2>
                Find something simple you want to build, and force yourself to
                learn enough to build it
              </h2>
              <p>
                Start real simple. Could just be an &ldquo;about me&rdquo; page.
                My first public website was a dumb thing for my friends in high
                school. It was lame, but I was really excited about it. I made
                changes to it all the time. It got me excited to build more
                websites. Find something like that.
              </p>
              <p>
                Learn basic HTML and CSS. Codecademy (
                <a href="https://www.codecademy.com/catalog/language/html-css">
                  codecademy.com
                </a>
                ) has really good interactive tutorials to get you started.
                Trudge through it, and then build your small idea. It
                doesn&apos;t have to be pretty, it just needs to work.
              </p>
              <p>
                Launch your first website. Even if you first site is horrible,
                launch it. For real, just launch it. Get that thing out there. I
                use a deployment platform called Vercel (
                <a href="https://vercel.com">vercel.com</a>) that lets you host
                a simple website for free. Just zip it up and launch it. Tell
                your friends about it. Tell your parents about it. Tell me about
                it.{` `}(
                <a href="https://www.linkedin.com/in/michaelbonner/">
                  https://www.linkedin.com/in/michaelbonner/
                </a>
                )
              </p>
              <h2>Build, build, build</h2>
              <p>
                The best way to learn is to find things you want to build and
                get to work. It&apos;s a lot easier to learn when you&apos;re
                solving a problem <em>you want</em> to solve. Look for tutorials
                about how to do the exact thing your stuck on. Keep your
                appetite small to begin with and let your curiosity carry you.
              </p>
              <p>
                Find local businesses that don&apos;t have a web presence and
                build them a site. Even if it&apos;s free. Get as much
                experience as you can building all the sites you can. When
                you&apos;re done with the site put your name with a link to you
                at the bottom. Could be a link to your LinkedIn, or your
                Instagram, or some way for people to get in touch with you. If
                you do good work people will notice and reach out.
              </p>
              <h2>Get to the next level</h2>
              <p>
                Learn Git. (
                <a href="https://www.codecademy.com/learn/learn-git">
                  https://www.codecademy.com/learn/learn-git
                </a>
                ). Git is a tool to keep track of changes to your code. It
                allows you to see what changes you made over time and roll
                things back if you need to. You can create branches to keep new
                ideas separate from production ready code. Everybody uses Git,
                and you&apos;ll lose out on job opportunities if you don&apos;t.
              </p>
              <p>
                Now that you have a decent base, spend some more time working
                through tutorials. Here&apos;s a few tutorial sites I really
                like.
              </p>
              <ul>
                <li>
                  <a href="https://www.freecodecamp.org/learn">
                    https://www.freecodecamp.org/learn
                  </a>
                </li>
                <li>
                  <a href="https://wesbos.com/courses">
                    https://wesbos.com/courses
                  </a>
                </li>
                <li>
                  <a href="https://www.leveluptutorials.com/">
                    https://www.leveluptutorials.com/
                  </a>
                </li>
              </ul>
              <p>
                Keep learning. Listen to podcasts (
                <a href="https://podcasts.michaelbonner.dev/">
                  https://podcasts.michaelbonner.dev/
                </a>
                ). Read blogs. Find developer subreddits. There is so much to
                learn. Find areas your passionate about and learn as much as you
                can.
              </p>
              <h2>Get your first job as a web developer</h2>
              <p>
                Look at job sites and find what skills companies are looking
                for, and then learn the skills for the job you want. It
                won&apos;t happen overnight, but over time you&apos;ll become a
                better developer. Exposure to new languages and frameworks will
                help you teach your brain to learn quickly. Be okay with being
                stuck on something. Go for a walk and come back to it. That
                frustration is part of the learning process, there&apos;s now
                way around it.
              </p>
              <p>
                Be honest in interviews. If you don&apos;t know something,
                it&apos;s completely fine to say &ldquo;I don&apos;t
                know.&rdquo; Lying about it is never the right answer. Trust me.
                People who have interviewed a handful of applicants can cut
                right through the BS and won&apos;t even entertain the idea of
                bringing on a developer that doesn&apos;t acknowledge the
                shortcomings they have. Good team members bring a growth
                mindset, and are willing to learn as much as they can from
                whoever they can. Be that person in general, especially in
                interviews. Take notes during interviews about the things you
                didn&apos;t know. Interviews are a great way to learn the things
                you don&apos;t know you didn&apos;t know.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
