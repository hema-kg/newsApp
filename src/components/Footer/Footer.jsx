import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-newsletter">
          <h4>Don't Miss Out</h4>
          <p className="muted">Subscribe to our newsletter to get the latest updates.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe to newsletter">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" placeholder="you@example.com" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="socials" aria-hidden>
            <span className="social">Twitter</span>
            <span className="social">LinkedIn</span>
            <span className="social">Instagram</span>
          </div>
        </div>

        <div className="footer-column">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Customer Services</h5>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>More to Explore</h5>
          <ul>
            <li><a href="#">Advertise with Us</a></li>
            <li><a href="#">Media Kit</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} NewsApp — All rights reserved.</small>
      </div>
    </footer>
  )
}
