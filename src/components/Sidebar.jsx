import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsBook, BsBookmark, BsGear, BsQuestionCircle, BsBoxArrowRight } from 'react-icons/bs';
import { useAuth } from './AuthContext';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { path: '/for-you', label: 'For you', icon: null },
    { path: '/my-library', label: 'My Library', icon: <BsBook /> },
    { path: '/highlights', label: 'Highlights', icon: <BsBookmark /> },
    { path: '/search', label: 'Search', icon: <AiOutlineSearch /> },
    { path: '/settings', label: 'Settings', icon: <BsGear /> },
    { path: '/help', label: 'Help & Support', icon: <BsQuestionCircle /> },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src="/assets/logo.png" alt="Summarist" />
      </div>
      
      <div className="sidebar__search">
        <AiOutlineSearch className="sidebar__search-icon" />
        <input type="text" placeholder="Search" className="sidebar__search-input" />
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar__nav-item ${location.pathname === item.path ? 'sidebar__nav-item--active' : ''}`}
          >
            {item.icon && <span className="sidebar__nav-icon">{item.icon}</span>}
            <span className="sidebar__nav-label">{item.label}</span>
          </Link>
        ))}
        <button
          className="sidebar__nav-item"
          onClick={handleLogout}
        >
          <span className="sidebar__nav-icon"><BsBoxArrowRight /></span>
          <span className="sidebar__nav-label">Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
