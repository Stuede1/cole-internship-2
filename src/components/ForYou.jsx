import Sidebar from './Sidebar.jsx';
import TopNavbar from './TopNavbar.jsx';
import './ForYou.css';

function ForYou() {
  return (
    <div className="for-you">
      <Sidebar />
      <TopNavbar />
      <div className="for-you__content">
        {/* Content will be loaded via API */}
        <div className="for-you__placeholder">
          <h2>For You</h2>
          <p>Content will be loaded from API</p>
        </div>
      </div>
    </div>
  );
}

export default ForYou;
