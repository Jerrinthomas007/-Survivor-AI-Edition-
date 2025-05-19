import AuthForm from '../components/AuthForm';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (form) => {
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default Signup;
