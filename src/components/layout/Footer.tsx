import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-6 px-6 py-4 text-sm md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
          <Link
            to="/terms-and-conditions"
            className="transition hover:text-slate-900 hover:underline dark:hover:text-slate-200"
          >
            Terms & Conditions
          </Link>

          <Link
            to="/privacy-policy"
            className="transition hover:text-slate-900 hover:underline dark:hover:text-slate-200"
          >
            Privacy Policy
          </Link>

          <Link
            to="/faq"
            className="transition hover:text-slate-900 hover:underline dark:hover:text-slate-200"
          >
            FAQ
          </Link>
        </div>

        <div className="text-slate-500dark:text-slate-400">
          © 2026 Parijat Industries. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
