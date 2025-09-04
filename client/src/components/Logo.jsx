import logo from '../assets/images/Logo.png';

function Logo({ width = 150 }) {
  return <img src={logo} alt="MyJobTracker" className="logo" style={{ width: `${width}px`, height: 'auto' }}/>;
}

export default Logo;