import React, { useEffect, useState } from "react";
import API from "../services/api";

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

  if (loading) return <p>Loading library...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto" }}>
      <h2>📚 My Library</h2>

      {items.length === 0 ? (
        <p>You haven’t purchased any ebooks yet.</p>
      ) : items.every((p) => p.deleted) ? (
        <p>
          Your library is empty. All ebooks you purchased were removed by admin.
        </p>
      ) : (
        items.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "15px",
            }}
          >
            {p.deleted ? (
              <div>
                <h3>📕 Deleted Ebook</h3>
                <p>This ebook is no longer available.</p>
              </div>
            ) : (
              <>
                {p.ebook.coverUrl && (
                  <img src={p.ebook.coverUrl} height="100" width="80" />
                )}

                <div style={{ flex: 1 }}>
                  <h3>{p.ebook.title}</h3>
                  <p>{p.ebook.description}</p>
                  <button onClick={() => downloadBook(p.ebook)}>
                    Download
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
