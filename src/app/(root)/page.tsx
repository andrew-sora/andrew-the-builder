// "/" has no content of its own. A tiny inline script picks the language
// (saved choice, otherwise default Bahasa Indonesia /id/) and replaces the URL.
const script = `(function(){var l='id';try{var s=localStorage.getItem('locale');if(s==='id'||s==='en')l=s;}catch(e){}location.replace('/'+l+'/');})();`;

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
