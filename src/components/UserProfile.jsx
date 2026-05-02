import { useAuth } from './AuthContext';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import './UserProfile.css';

function UserProfile() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      // User will be logged out automatically via AuthContext
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__info">
        <AiOutlineUser className="user-profile__avatar" />
        <div className="user-profile__details">
          <div className="user-profile__name">
            {currentUser.displayName || currentUser.email}
          </div>
          <div className="user-profile__email">
            {currentUser.email}
          </div>
        </div>
      </div>
      <button 
        className="user-profile__logout"
        onClick={handleLogout}
        title="Logout"
      >
        <AiOutlineLogout />
      </button>
    </div>
  );
}

export default UserProfile;
