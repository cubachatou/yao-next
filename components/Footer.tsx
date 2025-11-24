// import { siteConfig } from '../config/site';

export default function Footer() {
  return (
    <footer className="h-16">
      {/* <div className="flex items-center justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.title}
        </p>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="{{ site.socials.toObject().telegram.value }}"
                target="_blank"
                className="capitalize hover:underline"
                rel="noopener noreferrer nofollow"
              >
                Telegram
              </a>
            </li>

            <li>
              <a
                href="{{ site.socials.toObject().instagram.value }}"
                target="_blank"
                className="capitalize hover:underline"
                rel="noopener noreferrer nofollow"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div> */}
    </footer>
  );
}
