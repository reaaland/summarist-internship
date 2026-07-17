export default function Footer() {
  const footerSections = [
    {
      title: "Actions",
      links: [
        "Summarist Magazine",
        "Cancel Subscription",
        "Help",
        "Contact us",
      ],
    },
    {
      title: "Useful Links",
      links: [
        "Pricing",
        "Summarist Business",
        "Gift Cards",
        "Authors & Publishers",
      ],
    },
    {
      title: "Company",
      links: [
        "About",
        "Careers",
        "Partners",
        "Code of Conduct",
      ],
    },
    {
      title: "Other",
      links: [
        "Sitemap",
        "Legal Notice",
        "Terms of Service",
        "Privacy Policies",
      ],
    },
  ];

  return (
    <div className="footer__top--wrapper">
      {footerSections.map((section: { title: string; links: string[] }) => (
        <div key={section.title} className="footer__block">
          <div className="footer__link--title">{section.title}</div>
          <div>
            {section.links.map((link: string) => (
              <div key={link} className="footer__link--wrapper">
                <a className="footer__link">{link}</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}