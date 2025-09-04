import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/styledWrappers/LandingPage';
import { Logo } from '../components';

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> Website
          </h1>
          <p>
            MyJobTracker helps you stay organized during your job hunt. Keep all your
            applications, interviews, and follow-ups in one simple dashboard. No more
            missed deadlines or forgotten opportunities!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
        
      </div>
      <div className="social-icons">
        <a
          href="https://github.com/Kumar0Amit"
          target="_blank"
          rel="noopener noreferrer"
          className="icon github"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/amit-kumar-kaaaa3266668888/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon linkedin"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </Wrapper>
  );
}

export default Landing;

