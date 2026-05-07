import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';

function Footer() {
  return (
    <footer className="px-4 pb-5 pt-2 sm:px-6 lg:px-8">
      <Container>
        <div className="app-surface flex flex-col gap-4 rounded-[1.8rem] px-5 py-4 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300">
            <Link
              to="/terms-and-conditions"
              className="font-medium hover:text-slate-950 dark:hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy-policy"
              className="font-medium hover:text-slate-950 dark:hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/faq"
              className="font-medium hover:text-slate-950 dark:hover:text-white"
            >
              FAQ
            </Link>
          </div>

          <div className="text-slate-500 dark:text-slate-400">
            © 2026 Parijat Industries. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
