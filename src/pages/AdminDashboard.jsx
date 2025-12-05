import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./styles/AdminDashboard.css";

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
    <div className="admin-container">
      <div className="admin-header">
        <Link to="/admin/upload" className="admin-add-btn">
          + Add New Ebook
        </Link>
      </div>

      <div className="admin-list">
        {ebooks.map((book) => (
          <div className="admin-item" key={book._id}>
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="admin-cover"
              />
            )}

            <div className="admin-info">
              <h3 className="admin-book-title">{book.title}</h3>
              <p className="admin-price">₹{book.price}</p>
              <p className="admin-desc">{book.description}</p>
            </div>

            <div className="admin-actions">
              <button
                className="admin-btn-delete"
                onClick={() => deleteEbook(book._id)}
              >
                Delete
              </button>

              <Link
                to={`/admin/ebook/${book._id}/edit`}
                className="admin-btn-edit"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
