import type { Dictionary } from '@/lib/i18n';

export default function Footer({ dict, name }: { dict: Dictionary; name: string }) {
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <p>
          © {new Date().getFullYear()} {name}. {dict.footer.built}
        </p>
        <a href="#main">{dict.footer.top} ↑</a>
      </div>
    </footer>
  );
}
