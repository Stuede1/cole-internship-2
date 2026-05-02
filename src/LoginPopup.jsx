import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { useAuth } from './components/AuthContext';
import './LoginPopup.css';

function LoginPopup({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { login, loginWithGoogle, signup, error, setError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuestLogin = () => {
    onClose();
    navigate('/for-you');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onClose();
      navigate('/for-you');
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signup(formData.email, formData.password);
    
    if (result.success) {
      onClose();
      navigate('/for-you');
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    const result = await loginWithGoogle();
    
    if (result.success) {
      onClose();
      navigate('/for-you');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="login-popup__close" onClick={onClose}>
          <AiOutlineClose />
        </button>
        <h2 className="login-popup__title">{isSignup ? 'Sign up for Summarist' : 'Log in to Summarist'}</h2>
        
        <button className="login-popup__btn login-popup__btn--guest" onClick={handleGuestLogin}>
          <BsPerson className="login-popup__btn-icon" />
          Login as a Guest
        </button>
        
        <div className="login-popup__divider">
          <span className="login-popup__divider-line"></span>
          <span className="login-popup__divider-text">or</span>
          <span className="login-popup__divider-line"></span>
        </div>
        
        <button 
          className="login-popup__btn login-popup__btn--google" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img src="/assets/google.png" alt="Google" className="login-popup__btn-icon" />
          {isLoading ? 'Signing in...' : 'Login with Google'}
        </button>
        
        <div className="login-popup__divider">
          <span className="login-popup__divider-line"></span>
          <span className="login-popup__divider-text">or</span>
          <span className="login-popup__divider-line"></span>
        </div>
        
        <form className="login-popup__form" onSubmit={isSignup ? handleSignup : handleEmailLogin}>
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            className="login-popup__input"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="login-popup__input"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </form>
        
        <button 
          className="login-popup__btn login-popup__btn--submit"
          onClick={isSignup ? handleSignup : handleEmailLogin}
          disabled={isLoading}
        >
          {isLoading ? (isSignup ? 'Creating account...' : 'Signing in...') : (isSignup ? 'Sign Up' : 'Login')}
        </button>
        
        {error && (
          <div className="login-popup__error">
            {error}
          </div>
        )}
        
        <a href="#" className="login-popup__link">Forgot your password?</a>
        <a 
          href="#" 
          className="login-popup__link"
          onClick={(e) => {
            e.preventDefault();
            setIsSignup(!isSignup);
            setError('');
          }}
        >
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </a>
      </div>
    </div>
  );
}

export default LoginPopup;
