import AuthForm from '../components/AuthForm';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
