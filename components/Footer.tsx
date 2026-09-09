const columns = [
  {
    title: "Site",
    links: [
      { label: "Discover", href: "/#discover" },
      { label: "Categories", href: "/#categories" },
      { label: "Best Picks", href: "/#best-picks" },
      { label: "Shop All", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/80 bg-bone">
      <div className="mx-auto max-w-content px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-xl font-medium text-ink">TBP Picks</span>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">Trendy &amp; Best Picks</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm text-ink">{column.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line/80 pt-6">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} TBP Picks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
