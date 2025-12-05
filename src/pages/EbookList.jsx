import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./styles/EbookList.css";

export default function EbookList() {
  const [ebooks, setEbooks] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    try {
      API.get("/ebooks").then((res) => setEbooks(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="ebook-container">
      <div className="ebook-grid">
        {ebooks.map((book) => (
          <div className="ebook-card" key={book._id}>
            {book.coverUrl && (
              <img
                className="ebook-cover"
                src={book.coverUrl}
                alt={book.title}
              />
            )}

            <h3 className="ebook-title">{book.title}</h3>

            {role === "user" && <p className="ebook-price">₹{book.price}</p>}

            <Link className="view-btn" to={`/ebook/${book._id}`}>
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
