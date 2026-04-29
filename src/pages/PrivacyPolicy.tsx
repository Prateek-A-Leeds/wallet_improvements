import Container from '@/components/common/Container';
import { formatDateWithSuffix } from '@/components/common/FormatDateSuffix';

const lastUpdatedDate = '09-10-2017';

const sections = [
  {
    id: 'privacy-policy-intro',
    title: 'Privacy and Policy',
    content: [
      'Welcome to the Parijat Privacy Policy. When you access Parijat’s Web, your privacy is important to us.',
      'This Privacy Policy is meant to help you understand what data we collect, why we collect it and what we do with it. This is important; we hope you will take time to read it carefully.',
      'Remember, you can find controls to manage your information and protect your privacy and security.',
      'We take a proactive approach to user privacy and ensure that necessary steps are taken to protect the privacy policy of the users through their visiting experience.',
    ],
  },
  {
    id: 'key-privacy-principles',
    title: 'Six Key Privacy Principles',
    content: [
      'We are working to earn your trust every day by focusing on six key privacy principles:',
      'Control: We will put you in control of your privacy with easy-to-use tools and clear choices.',
      'Transparency: We will be transparent about data collection and use so you can make informed decisions.',
      'Security: We will protect the data you entrust to us through strong security and encryption.',
      'Strong legal protections: We will respect your local privacy laws and fight for legal protection of your privacy as a fundamental human right.',
      'No content-based targeting: We will not use your email, chat, files or other personal content to target ads to you.',
      'Benefits to you: The collect data will be used for your benefit only and to make our services better which will always have oriented to make your experiences better.',
    ],
  },
  {
    id: 'our-commitment',
    title: 'Our Commitment',
    content: [
      'We are committed to protect your privacy. Authorized employees within ourselves, on a need to know basis only, use any information collected from individual users.',
      'We constantly review our systems and data to ensure the best possible service to our users.',
      'We will adhere by the laws in place that create offences for unauthorized actions against computer systems and data. We will investigate any such actions with a view to prosecuting and/or taking civil proceedings to recover damages against those responsible.',
    ],
  },
  {
    id: 'transparency-and-choice',
    title: 'Transparency and Choice',
    content: [
      'People have different privacy concerns. Our goal is to be clear about what information we collect, so that you can make meaningful choices about how it is used.',
    ],
  },
  {
    id: 'accessing-and-updating-info',
    title: 'Accessing and Updating Your Personal Information',
    content: [
      'Whenever you access our Web, we aim to provide you with access to your personal information.',
      'If that information is wrong, we strive to give you ways to update it quickly or to delete it – unless we have to keep that information for legitimate business or legal purposes.',
      'When updating your personal information, we may ask you to verify your identity before we can act on your request.',
      'We may reject requests that are unreasonably repetitive, require disproportionate technical effort, risk the privacy of others, or would be extremely impractical.',
      'Where we can provide information access and correction, we will do so free of charge, except where it would require a disproportionate effort.',
      'After you delete information from our services, we may not immediately delete residual copies from our active servers and may not remove information from our backup systems to protect against accidental or malicious destruction.',
    ],
  },
  {
    id: 'information-we-share',
    title: 'Information that we share',
    content: [
      'We do not share personal information with companies, organizations and individuals outside of Parijat unless one of the following circumstances applies:',
      '1. With your consent: We require opt-in consent for the sharing of any sensitive personal information.',
      '2. For external processing: We provide information to affiliates or trusted businesses to process it based on our instructions and in compliance with our Privacy Policy.',
      '3. For legal reasons: We share information if we have a good faith belief that disclosure is necessary to meet applicable laws, enforce Terms of Service, detect fraud/security issues, or protect the rights and safety of Parijat and the public.',
      'In case of a merger, acquisition or asset sale, we will ensure confidentiality and give users notice before information is transferred.',
    ],
  },
  {
    id: 'information-security',
    title: 'Information Security',
    content: [
      'We work hard to protect Parijat and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information that we hold.',
    ],
  },
  {
    id: 'policy-application-and-compliance',
    title: 'Compliance and Changes',
    content: [
      'Our Privacy Policy applies when you access our Web.',
      'We regularly review our compliance. When we receive formal written complaints, we will contact the person to follow up and work with local data protection authorities to resolve issues.',
      'Our Privacy Policy may change from time to time. We will not reduce your rights without explicit consent. Significant changes will be accompanied by a prominent notice or email notification.',
    ],
  },
];

function TermsAndConditions() {
  return (
    <section className="py-8 md:py-10">
      <Container>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                  Legal
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
                  Privacy Policy
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
                  Please review the privacy policy below.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                <p className="text-slate-500 dark:text-slate-400">
                  Last updated
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                  {formatDateWithSuffix(lastUpdatedDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  On this page
                </p>

                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-5">
              {sections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {section.title}
                      </h2>

                      <div className="mt-4 space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <p
                            key={itemIndex}
                            className={`text-sm leading-7 text-slate-600 dark:text-slate-400mt-4 font-medium dark:text-slate-200`}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TermsAndConditions;
