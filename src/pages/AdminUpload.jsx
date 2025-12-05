import React, { useState, useEffect } from "react";
import API from "../services/api";
import useDebounce from "../hooks/useDebounce";

export default function AdminUpload() {
  const [pdf, setPdf] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [productId, setProductId] = useState("");

  const debouncedProductId = useDebounce(productId, 500);

  const handleUpload = async () => {
    if (!pdf || !title || !price) {
      return setMessage("PDF, title, and price are required!");
    }

    const normalizedId = productId.toLowerCase().replace(/\s+/g, "-").trim();

    const form = new FormData();
    form.append("pdf", pdf);
    if (cover) form.append("cover", cover);
    form.append("title", title);
    form.append("price", price);
    form.append("description", description);
    form.append("productId", normalizedId);

    setLoading(true);
    try {
      const res = await API.post("/admin/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Uploaded successfully!");
      console.log(res.data);
      setCover(null);
      setPdf(null);
      setDescription("");
      setPrice("");
      setTitle("");
    } catch (err) {
      setMessage("Upload failed");
      console.error(err);
    }
    setLoading(false);
  };

  const checkProductId = async (productId) => {
    const res = await API.get(`/admin/check-product-id/${productId}`);
    if (res.data.exists) {
      alert(
        "This productId is already used. Reuse it only if reuploading same ebook."
      );
    }
  };

  useEffect(() => {
    if (debouncedProductId.trim().length > 0) {
      checkProductId(debouncedProductId);
    }
  }, [debouncedProductId]);

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

      <label>Product Id</label>
      <input
        type="text"
        placeholder="productId"
        value={productId}
        onBlur={() => checkProductId(productId)}
        onChange={(e) => {
          setProductId(e.target.value);
        }}
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
