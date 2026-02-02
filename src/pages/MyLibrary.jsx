import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./styles/MyLibrary.css";

export default function MyLibrary() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadBook = async (ebook) => {
    try {
      const res = await API.get(`/ebooks/${ebook._id}/download`);
      const downloadUrl = res.data.url;

      // blob download same as earlier
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${ebook.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert("Cannot download this ebook");
    }
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await API.get("/users/me/library");
        setItems(res.data.purchases);
      } catch (err) {
        console.log(err);
        alert("Unable to load your library");
      }
      setLoading(false);
    };
    fetchLibrary();
  }, []);

  if (loading) return <p className="library-loading">Loading library...</p>;

  return (
    <div className="library-container">
      {items.length === 0 ? (
        <h2 className="library-empty">You haven’t purchased any ebooks yet.</h2>
      ) : items.every((p) => p.deleted) ? (
        <p className="library-empty">
          Your library is empty. All ebooks you purchased were removed by admin.
        </p>
      ) : (
        <div className="library-list">
          {items.map((p) => (
            <div className="library-item" key={p._id}>
              {p.deleted ? (
                <div className="deleted-wrapper">
                  <h3 className="deleted-title">📕 Deleted Ebook</h3>
                  <p className="deleted-message">
                    This ebook is no longer available.
                  </p>
                </div>
              ) : (
                <>
                  {p.ebook.coverUrl && (
                    <img
                      className="library-cover"
                      src={p.ebook.coverUrl}
                      alt={p.ebook.title}
                    />
                  )}

                  <div className="library-info">
                    <h3 className="library-book-title">{p.ebook.title}</h3>
                    <p className="library-book-desc">{p.ebook.description}</p>

                    <button
                      className="library-btn"
                      onClick={() => downloadBook(p.ebook)}
                    >
                      Download
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
