const FOOTER_LINKS = [
  "Terms of Service",
  "Privacy Policy",
  "Shipping Info",
  "Contact Us",
];

export default function Footer() {
  return (
    <footer className="w-full pb-2.5 max-[1108px]:pb-[150px] text-center bg-transparent shrink-0">
      <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 mb-0.5">
        {FOOTER_LINKS.map((link, index) => (
          <span key={link} className="inline-flex items-center gap-2">
            <a
              href="#"
              className="font-condensed text-[12px] font-semibold uppercase tracking-wider text-black transition-opacity hover:opacity-60"
            >
              {link}
            </a>
            {index < FOOTER_LINKS.length - 1 && (
              <span className="text-[12px] font-bold text-black" aria-hidden>
                |
              </span>
            )}
          </span>
        ))}
      </div>
      <p className="font-condensed text-[12px] font-semibold uppercase tracking-wider text-black">
        © 2026 The Artisan Kiln. All rights reserved.
      </p>
    </footer>
  );
}
