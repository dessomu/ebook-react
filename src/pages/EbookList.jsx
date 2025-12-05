import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

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
    <div>
      <h2>All Ebooks</h2>

      {ebooks.map((book) => (
        <div key={book._id} style={{ marginBottom: 20 }}>
          {book.coverUrl && <img src={book.coverUrl} height={120} />}
          <h3>{book.title}</h3>
          {role === "user" && <p>₹{book.price}</p>}
          <Link to={`/ebook/${book._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
