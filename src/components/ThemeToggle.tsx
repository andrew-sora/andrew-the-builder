'use client';

export default function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const current = root.dataset.theme ?? 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage can be blocked, the toggle still works for this visit */
    }
  };

  return (
    <button type="button" className="btn-icon" aria-label={label} onClick={toggle}>
      ◐
    </button>
  );
}
