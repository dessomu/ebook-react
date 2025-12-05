import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import CheckoutButton from "../components/CheckoutButton";
import "./styles/EbookDetails.css";

export default function EbookDetails() {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [checking, setChecking] = useState(true);
  const role = localStorage.getItem("role");

  const checkPurchaseStatus = useCallback(async () => {
    try {
      const res = await API.get(`/ebooks/${id}/status`);
      setPurchased(res.data.purchased);
    } catch (err) {
      setPurchased(false);
      console.log(err);
    }
    setChecking(false);
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const book = await API.get(`/ebooks/${id}`);
        setEbook(book.data);
      } catch (err) {
        console.log(err);
      }

      await checkPurchaseStatus();
    })();
  }, [id, checkPurchaseStatus]);

  const getDownload = async () => {
    try {
      const res = await API.get(`/ebooks/${id}/download`);
      const downloadUrl = res.data.url;

      // Fetch the file as a Blob
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      // Create a temporary download link with correct filename
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${ebook.title}.pdf`; // <-- correct filename
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("You haven't purchased this book.");
      console.error(err);
    }
  };

  if (!ebook) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <div className="cover-section">
          {ebook.coverUrl && (
            <img
              className="details-cover"
              src={ebook.coverUrl}
              alt={ebook.title}
            />
          )}
        </div>

        <div className="info-section">
          <h2 className="details-title">{ebook.title}</h2>

          <p className="details-description">{ebook.description}</p>

          <p className="details-price">₹{ebook.price}</p>

          <div className="details-actions">
            {checking ? (
              <p className="checking-status">Checking purchase status...</p>
            ) : purchased ? (
              <button className="details-btn" onClick={getDownload}>
                Download Ebook
              </button>
            ) : role === "user" ? (
              <CheckoutButton ebook={ebook} onSuccess={checkPurchaseStatus} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
