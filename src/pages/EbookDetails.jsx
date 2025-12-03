import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import CheckoutButton from "../components/CheckoutButton";

export default function EbookDetails() {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    try {
      API.get(`/ebooks/${id}`).then((res) => setEbook(res.data));
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const getDownload = async () => {
    try {
      const res = await API.get(`/ebooks/${id}/download`);
      setDownloadUrl(res.data.url);
    } catch (err) {
      alert("You haven't purchased this book.", err);
    }
  };

  if (!ebook) return <div>Loading...</div>;

  return (
    <div>
      <h2>{ebook.title}</h2>
      {ebook.coverUrl && <img src={ebook.coverUrl} height={180} />}
      <p>{ebook.description}</p>
      <p>Price: ₹{ebook.price}</p>

      <CheckoutButton ebook={ebook} />

      <button onClick={getDownload}>Download (if purchased)</button>

      {downloadUrl && (
        <div>
          <a href={downloadUrl} target="_blank">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
