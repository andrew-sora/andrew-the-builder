import type { Dictionary } from '@/lib/i18n';

type Apk = { url: string; version: string; sizeMb: number; sha256: string; minAndroid?: string };

export default function ApkDownload({ apk, dict }: { apk: Apk; dict: Dictionary['apk'] }) {
  return (
    <section className="card apk" aria-labelledby="apk-title">
      <h3 id="apk-title">{dict.title}</h3>
      <p className="note">{dict.intro}</p>
      <dl>
        <dt className="mono">{dict.version}</dt>
        <dd>{apk.version}</dd>
        <dt className="mono">{dict.size}</dt>
        <dd>{apk.sizeMb.toFixed(1)} MB</dd>
        {apk.minAndroid && (
          <>
            <dt className="mono">{dict.minAndroid}</dt>
            <dd>≥ {apk.minAndroid}</dd>
          </>
        )}
        <dt className="mono">{dict.sha}</dt>
        <dd>
          <code>{apk.sha256}</code>
        </dd>
      </dl>
      <div>
        <a className="btn btn--solid" href={apk.url} rel="noopener">
          {dict.download} ↓
        </a>
      </div>
      <div>
        <h4 className="mono" style={{ margin: '4px 0 8px' }}>
          {dict.howTitle}
        </h4>
        <ol>
          {dict.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <p className="note">{dict.verify}</p>
    </section>
  );
}
