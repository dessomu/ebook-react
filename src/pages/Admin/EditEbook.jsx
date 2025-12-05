import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./styles/EditEbook.css";

export default function EditEbook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ebook, setEbook] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [pdfFile, setPdfFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    API.get(`/admin/ebook/${id}`).then((res) => {
      setEbook(res.data.ebook);

      setTitle(res.data.ebook.title);
      setPrice(res.data.ebook.price);
      setDescription(res.data.ebook.description);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("price", price);
    form.append("description", description);

    if (pdfFile) form.append("pdf", pdfFile);
    if (coverFile) form.append("cover", coverFile);

    try {
      await API.put(`/admin/ebook/${id}`, form);
      alert("Ebook updated successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Failed to update ebook");
      console.error(err);
    }
  };

  if (!ebook) return <p>Loading...</p>;

  return (
    <div className="edit-container">
      <div className="edit-card">
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="edit-grid">
            <div>
              <label className="edit-label">Title</label>
              <input
                className="edit-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="edit-label">Price (₹)</label>
              <input
                className="edit-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <label className="edit-label">Description</label>
          <textarea
            className="edit-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Cover preview */}
          {ebook?.coverUrl && (
            <div className="edit-preview-section">
              <p className="edit-preview-label">Current Cover:</p>
              <img
                src={ebook.coverUrl}
                alt="Current Cover"
                className="edit-current-cover"
              />
            </div>
          )}

          <label className="edit-label">Replace PDF</label>
          <input
            className="edit-file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />

          <label className="edit-label">Replace Cover</label>
          <input
            className="edit-file"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />

          <button type="submit" className="edit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
