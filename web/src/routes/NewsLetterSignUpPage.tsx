
import './NewsLetterSignUpPage.css';

const NewsLetterSignUpPage = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-header">
        <h1 className="newsletter-title">Subscribe to the Newsletter</h1>
        <p className="newsletter-description">
          Stay updated with our latest news and updates. Join our community and never miss a beat.
        </p>
      </div>

      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="newsletter-input" 
          required 
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>

      <div className="newsletter-footer">
        <p>&copy; 2026 Newsletter. All rights reserved.</p>
      </div>
    </div>
  )
}

export default NewsLetterSignUpPage