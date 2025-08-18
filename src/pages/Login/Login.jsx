import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import navigation
import { onAuthStateChanged } from 'firebase/auth'; // import session listener
import { auth, signup, login } from '../../firebse'; // make sure auth is exported in firebse.js
import './login.css';
import logo from '../../assets/logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Session handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // redirect if logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (signState === 'Sign Up' && !name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const user_auth = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      // ✅ navigation will automatically happen via onAuthStateChanged
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className='login-spinner'>
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === 'Sign Up' && (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Your name'
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email or phone number'
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password'
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button onClick={user_auth} type='submit'>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? (
            <p>
              New to Netflix?{' '}
              <span onClick={() => { setSignState("Sign Up"); setErrors({}); }}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => { setSignState("Sign In"); setErrors({}); }}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login;
