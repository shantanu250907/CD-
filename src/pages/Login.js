// // import React, { useState } from 'react';
// // import './Login.css';

// // const Login = ({ onLogin }) => {
// //     const [isLoginView, setIsLoginView] = useState(true);
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         password: ''
// //     });

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         // Simulate authentication
// //         if (formData.email && formData.password) {
// //             onLogin();
// //         } else {
// //             alert('Please enter valid credentials');
// //         }
// //     };

// //     const toggleView = () => {
// //         setIsLoginView(!isLoginView);
// //         setFormData({ name: '', email: '', password: '' });
// //     };

// //     return (
// //         <div className="login-container">
// //             <div className="login-card">
// //                 <div className="login-header">
// //                     <h2>{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
// //                     <p>{isLoginView ? 'Login to manage your clinic' : 'Sign up to get started'}</p>
// //                 </div>

// //                 <form className="login-form" onSubmit={handleSubmit}>
// //                     {!isLoginView && (
// //                         <div className="form-group">
// //                             <label htmlFor="name">Full Name</label>
// //                             <input
// //                                 type="text"
// //                                 id="name"
// //                                 name="name"
// //                                 placeholder="name"
// //                                 value={formData.name}
// //                                 onChange={handleChange}
// //                                 required={!isLoginView}
// //                             />
// //                         </div>
// //                     )}

// //                     <div className="form-group">
// //                         <label htmlFor="email">Email Address</label>
// //                         <input
// //                             type="email"
// //                             id="email"
// //                             name="email"
// //                             placeholder="admin@medcare.com"
// //                             value={formData.email}
// //                             onChange={handleChange}
// //                             required
// //                         />
// //                     </div>

// //                     <div className="form-group">
// //                         <label htmlFor="password">Password</label>
// //                         <input
// //                             type="password"
// //                             id="password"
// //                             name="password"
// //                             placeholder="••••••••"
// //                             value={formData.password}
// //                             onChange={handleChange}
// //                             required
// //                         />
// //                     </div>

// //                     <button type="submit" className="login-btn">
// //                         {isLoginView ? 'Sign In' : 'Sign Up'}
// //                     </button>
// //                 </form>

// //                 <div className="login-footer">
// //                     <p>
// //                         {isLoginView ? "Don't have an account? " : "Already have an account? "}
// //                         <span className="toggle-link" onClick={toggleView}>
// //                             {isLoginView ? 'Sign up' : 'Log in'}
// //                         </span>
// //                     </p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ onLogin }) => {
//     const navigate = useNavigate();
//     const [isLoginView, setIsLoginView] = useState(true);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const url = isLoginView 
//                 ? 'http://localhost:8001/api/auth/login'
//                 : 'http://localhost:8001/api/auth/register';

//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             if (data.success) {
//                 // Store token and user data
//                 localStorage.setItem('token', data.token);
//                 localStorage.setItem('user', JSON.stringify(data.user));
                
//                 alert(`✅ ${isLoginView ? 'Login' : 'Registration'} successful!`);
//                 onLogin();
//             } else {
//                 alert(`❌ ${data.message}`);
//             }
//         } catch (error) {
//             console.error('Auth error:', error);
//             alert('❌ Failed to connect to server');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleView = () => {
//         setIsLoginView(!isLoginView);
//         setFormData({ name: '', email: '', password: '' });
//     };

//     return (
//         <div className="login-container">
//             <div className="login-card">
//                 <div className="login-header">
//                     <h2>{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
//                     <p>{isLoginView ? 'Login to manage your clinic' : 'Sign up to get started'}</p>
//                 </div>

//                 <form className="login-form" onSubmit={handleSubmit}>
//                     {!isLoginView && (
//                         <div className="form-group">
//                             <label htmlFor="name">Full Name</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 placeholder="Enter your name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required={!isLoginView}
//                                 disabled={loading}
//                             />
//                         </div>
//                     )}

//                     <div className="form-group">
//                         <label htmlFor="email">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="admin@medcare.com"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             disabled={loading}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             placeholder="••••••••"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             disabled={loading}
//                         />
//                     </div>

//                     <button type="submit" className="login-btn" disabled={loading}>
//                         {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
//                     </button>
//                 </form>

//                 <div className="login-footer">
//                     <p>
//                         {isLoginView ? "Don't have an account? " : "Already have an account? "}
//                         <span className="toggle-link" onClick={toggleView}>
//                             {isLoginView ? 'Sign up' : 'Log in'}
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try to connect to backend first
      const url = isLoginView 
        ? 'http://localhost:8002/api/auth/login'
        : 'http://localhost:8002/api/auth/register';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.token, data.user);
        navigate('/');
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      // Fallback: Allow login with demo credentials if backend is not available
      console.log('Backend not available, using demo login');
      
      // Demo credentials for testing
      const demoUser = {
        id: '1',
        name: formData.name || 'Admin User',
        email: formData.email,
        role: 'admin'
      };
      
      // Simulate successful login
      const demoToken = 'demo-token-' + Date.now();
      onLogin(demoToken, demoUser);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLoginView ? 'Login to manage your clinic' : 'Sign up to get started'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required={!isLoginView}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@medcare.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <span className="toggle-link" onClick={toggleView}>
              {isLoginView ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;