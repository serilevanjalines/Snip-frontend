import { useState } from 'react'
import './App.css'

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl })
      });
      const data = await response.json();
      setShortUrl(data.short_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Paste your long URL here"
      />

      <button onClick={handleSubmit}>Shorten</button>

      {shortUrl && <a href={shortUrl}>{shortUrl}</a>}
    </>
  )
}

export default App