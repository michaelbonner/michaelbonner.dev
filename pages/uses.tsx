import { HiLink } from "react-icons/hi";
import Layout from "../components/layout";

const A = ({ href, children }) => {
  return (
    <a
      className="flex space-x-1 items-center underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default function Uses() {
  return (
    <Layout
      title="Michael Bonner | Developer in Salt Lake, UT"
      description="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT"
    >
      <main className="container mx-auto px-8 py-12">
        <h1 className="leading-relaxed text-4xl tracking-wide lg:pr-8 max-w-3xl">
          Hi! I&apos;m{" "}
          <span className="font-medium whitespace-nowrap">Michael Bonner</span>,
          and here&apos;s some of the stuff I use
        </h1>
        <div className="text-lg">
          <h2 className="mt-8 text-2xl">Software</h2>
          <div className="mt-4 grid grid-cols-2 max-w-xl">
            <span>Code Editor:</span>
            <A href="https://code.visualstudio.com/">
              <HiLink />
              <span>VS Code</span>
            </A>
            <span>Terminal:</span>
            <A href="https://iterm2.com/">
              <HiLink />
              <span>iTerm2</span>
            </A>
            <span>Shell:</span>
            <A href="https://ohmyz.sh/">
              <HiLink />
              <span>oh my zsh</span>
            </A>
            <span>Editor Font:</span>
            <A href="https://github.com/tonsky/FiraCode">
              <HiLink />
              <span>Fira Code</span>
            </A>
            <span>Local server:</span>
            <A href="https://laravel.com/docs/8.x/sail">
              <HiLink />
              <span>Docker (with Laravel Sail)</span>
            </A>
            <span>Password manager</span>
            <A href="https://1password.com/">
              <HiLink />
              <span>1Password</span>
            </A>
            <span>Snippet/Doc reference tool</span>
            <A href="https://kapeli.com/dash">
              <HiLink />
              <span>Dash</span>
            </A>
            <span>Clipboard Manager</span>
            <A href="https://apps.apple.com/us/app/paste-clipboard-manager/id967805235">
              <HiLink />
              <span>Paste</span>
            </A>
            <span>Window management &amp; shortcuts</span>
            <A href="https://folivora.ai/">
              <HiLink />
              <span>BetterTouchTool</span>
            </A>
            <span>Just check it out, it&apos;s awesome</span>
            <A href="https://webcatalog.app/">
              <HiLink />
              <span>Webcatalog</span>
            </A>
          </div>

          <h2 className="mt-8 text-2xl">Hardware</h2>
          <div className="mt-4 grid grid-cols-2 max-w-xl">
            <span>Computer:</span>
            <A href="https://www.apple.com/shop/buy-mac/macbook-pro/14-inch-space-gray-10-core-cpu-16-core-gpu-1tb">
              <HiLink />
              <span>MacBook Pro 14&quot; M1 Pro</span>
            </A>

            <span>Display:</span>
            <A href="https://www.amazon.com/Samsung-U32J590-32-Inch-LED-Lit-Monitor/dp/B07CS3JGPC/ref=sr_1_2?crid=2PDUXL1TLDEI9&dchild=1&keywords=samsung%2B4k%2B32%2Binch%2Bmonitor&qid=1622763845&sprefix=samsung%2B4k%2B32%2Caps%2C217&sr=8-2&th=1">
              <HiLink />
              <span>Samsung 32&quot; 4k</span>
            </A>

            <span>Webcam:</span>
            <A href="https://www.logitech.com/en-us/products/webcams/streamcam.960-001289.html">
              <HiLink />
              <span>Logitech Streamcam</span>
            </A>

            <span>Microphone:</span>
            <A href="https://www.bluemic.com/en-us/products/yeti-x/">
              <HiLink />
              <span>
                Blue Yeti<sup>x</sup>
              </span>
            </A>
            <span>Headphones:</span>
            <A href="https://www.apple.com/airpods-max/">
              <HiLink />
              <span>AirPods Max</span>
            </A>
          </div>
        </div>
      </main>
    </Layout>
  );
}
