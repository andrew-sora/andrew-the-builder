// "/" has no content of its own. A tiny inline script picks the language
// (saved choice, then browser language, default English) and replaces the URL.
const script = `(function(){var l=((navigator.language||'').toLowerCase().indexOf('id')===0)?'id':'en';try{var s=localStorage.getItem('locale');if(s==='id'||s==='en')l=s;}catch(e){}location.replace('/'+l+'/');})();`;

export default function RootRedirect() {
  return (
    <main className="redirect">
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <h1>Andrew the Builder</h1>
      <p>
        <a href="/id/">Bahasa Indonesia</a> · <a href="/en/">English</a>
      </p>
    </main>
  );
}
