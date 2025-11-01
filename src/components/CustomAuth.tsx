import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import './CustomAuth.css';

interface CustomAuthProps {
  formType: 'signIn' | 'signUp';
}

const CustomAuth: React.FC<CustomAuthProps> = ({ formType }) => {
  const [isActive, setIsActive] = useState(formType === 'signUp');
  const navigate = useNavigate();

  useEffect(() => {
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const handleRegisterClick = () => {
      setIsActive(true);
    };

    const handleLoginClick = () => {
      setIsActive(false);
    };

    if (registerBtn) {
      registerBtn.addEventListener('click', handleRegisterClick);
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', handleLoginClick);
    }

    return () => {
      if (registerBtn) {
        registerBtn.removeEventListener('click', handleRegisterClick);
      }
      if (loginBtn) {
        loginBtn.removeEventListener('click', handleLoginClick);
      }
    };
  }, []);

  const handleSocialLogin = () => {
    navigate('/role-selection');
  };

  return (
    <div className="custom-auth-container">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={handleSocialLogin}><FcGoogle /></a>
              <a href="#" className="icon" onClick={handleSocialLogin}><FaFacebookF /></a>
            </div>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={handleSocialLogin}><FcGoogle /></a>
              <a href="#" className="icon" onClick={handleSocialLogin}><FaFacebookF /></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAuth;
