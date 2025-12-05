import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

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
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Edit Ebook</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Replace PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />

        <label>Replace Cover</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverFile(e.target.files[0])}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
