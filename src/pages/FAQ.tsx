import { useMemo, useState } from 'react';
import Container from '@/components/common/Container';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  label: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        question: 'What is an FAQ?',
        answer:
          'An FAQ (Frequently Asked Questions) is a list of common questions and answers to help users quickly find information about a specific topic or system.',
      },
      {
        question: 'What is Parijat Wallet?',
        answer:
          'Parijat Wallet is a central hub for the sales teams (CSD, IB, and Retail) to update data, download reports, and view analyses to streamline their operations.',
      },
    ],
  },
  {
    id: 'login-access',
    label: 'Login & Access',
    items: [
      {
        question: 'How do I log in to Parijat Wallet?',
        answer:
          'You can log in using your company email ID ending with @parijat.in and the same password you use to log into your company laptop.',
      },
      {
        question: 'What should I do if I forgot my password?',
        answer:
          'If you forget your password, please reach out to the IT Helpdesk for assistance with resetting it.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    items: [
      {
        question:
          "What should I do if I'm facing issues in any module of Parijat Wallet?",
        answer:
          "If you encounter issues in any module, click the Help button located at the top near the Profile button. Select the module where you're facing the issue, describe the problem, attach a screenshot if necessary, and submit the form. You can also track the status of your requests there.",
      },
    ],
  },
];

function FAQ() {
  const [activeTab, setActiveTab] = useState(faqCategories[0].id);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const activeCategory = useMemo(
    () => faqCategories.find((category) => category.id === activeTab),
    [activeTab],
  );

  const allIndexes = useMemo(
    () => activeCategory?.items.map((_, index) => index) ?? [],
    [activeCategory],
  );

  const isAllExpanded =
    activeCategory !== undefined &&
    activeCategory.items.length > 0 &&
    openItems.length === activeCategory.items.length;

  const toggle = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setOpenItems([]);
  };

  const handleToggleAll = () => {
    setOpenItems(isAllExpanded ? [] : allIndexes);
  };

  return (
    <section className="py-10">
      <Container>
        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
          <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h1>

          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              {faqCategories.map((category) => {
                const isActive = activeTab === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleTabChange(category.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="relative group">
              <button
                type="button"
                onClick={handleToggleAll}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {isAllExpanded ? (
                  // Collapse icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 19l7-7 7 7"
                    />
                  </svg>
                ) : (
                  // Expand icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 5l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {/* Tooltip */}
              <div className="pointer-events-none absolute right-1/2 top-full z-50 mt-2 translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 shadow transition-all group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                {isAllExpanded ? 'Collapse all' : 'Expand all'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {activeCategory?.items.map((faq, index) => {
              const isOpen = openItems.includes(index);

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200 transition dark:border-slate-800"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    <span>{faq.question}</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19 9-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
