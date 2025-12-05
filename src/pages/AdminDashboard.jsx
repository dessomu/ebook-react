import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteEbook = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/ebook/${id}`);
      setEbooks(ebooks.filter((b) => b._id !== id));
    } catch (err) {
      alert("Delete failed", err);
    }
  };

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await API.get("/admin/ebooks");
        setEbooks(res.data.ebooks);
      } catch (err) {
        console.log(err);
        alert("Error fetching ebooks");
      }
      setLoading(false);
    };
    fetchEbooks();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }}>
      <h2>📘 Admin Dashboard</h2>

      <Link to="/admin/upload">
        <button>Add New Ebook</button>
      </Link>

      <div style={{ marginTop: 20 }}>
        {ebooks.map((book) => (
          <div
            key={book._id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              borderBottom: "1px solid #ddd",
              paddingBottom: 10,
            }}
          >
            {book.coverUrl && <img src={book.coverUrl} height={80} />}
            <div style={{ marginLeft: 20, flexGrow: 1 }}>
              <h3>{book.title}</h3>
              <p>₹{book.price}</p>
              <p>{book.description}</p>
            </div>

            <button
              style={{ marginRight: 10 }}
              onClick={() => deleteEbook(book._id)}
            >
              Delete
            </button>

            <Link to={`/admin/ebook/${book._id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
