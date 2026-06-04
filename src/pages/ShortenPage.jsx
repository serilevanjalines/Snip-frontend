import { useState } from 'react'
import '../styles/Shorten.css'

function ShortenPage({ token, handleLogout }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://snip-omzp.onrender.com/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ url: longUrl })
      });
      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.short_url);
        setError("");
        setLongUrl("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="shorten-container">
      <div className="shorten-card">
        <div className="header">
          <h1>Snip - URL Shortener</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste your long URL here"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button type="submit">Shorten</button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p>Your short link:</p>
            <a href={shortUrl} target="_blank">{shortUrl}</a>
            <button onClick={() => navigator.clipboard.writeText(shortUrl)}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShortenPage;