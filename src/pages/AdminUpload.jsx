import React, { useState } from "react";
import API from "../services/api";

export default function AdminUpload() {
  const [pdf, setPdf] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!pdf || !title || !price) {
      return setMessage("PDF, title, and price are required!");
    }

    const form = new FormData();
    form.append("pdf", pdf);
    if (cover) form.append("cover", cover);
    form.append("title", title);
    form.append("price", price);
    form.append("description", description);

    setLoading(true);
    try {
      const res = await API.post("/admin/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      setMessage("Upload failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>📚 Upload New Ebook</h2>

      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Price (₹)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>PDF File</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
      />

      <label>Cover Image (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCover(e.target.files[0])}
      />

      <button disabled={loading} onClick={handleUpload}>
        {loading ? "Uploading..." : "Upload Ebook"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
