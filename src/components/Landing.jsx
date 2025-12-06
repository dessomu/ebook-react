import { Link } from "react-router-dom";
import "./styles/Landing.css";
import cover1 from "../assets/book1.jpg";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-left">
        <h1 className="about-title">A book can change your life.</h1>

        <p className="about-sub">
          Discover ebooks that inspire, educate, and unlock new opportunities.
        </p>

        <div className="about-actions">
          <Link to="/signup" className="about-btn-primary">
            Start Reading
          </Link>

          <Link to="/login" className="about-btn-outline">
            Already a member?
          </Link>
        </div>

        <div className="about-social">
          {/* <span>Follow us:</span> */}
          <div className="social-icons">
            <i className="ri-facebook-fill"></i>
            <i className="ri-instagram-line"></i>
            <i className="ri-twitter-x-line"></i>
          </div>
        </div>
      </div>

      <div className="about-right">
        <img src={cover1} alt="Book Display" className="about-book-image" />
      </div>
    </div>
  );
}
