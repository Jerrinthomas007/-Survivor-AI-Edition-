import { Link } from 'react-router-dom';

// Inside your return()
<form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded shadow-md w-96"
>
  <h2 className="text-2xl font-bold mb-4">
    {type === 'login' ? 'Login' : 'Signup'}
  </h2>
  <input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Email"
    required
    className="w-full p-2 border mb-4 rounded"
  />
  <input
    type="password"
    name="password"
    value={form.password}
    onChange={handleChange}
    placeholder="Password"
    required
    className="w-full p-2 border mb-4 rounded"
  />
  <button
    type="submit"
    className="w-full bg-blue-500 text-white p-2 rounded"
  >
    {type === 'login' ? 'Login' : 'Signup'}
  </button>

  <div className="mt-4 text-sm text-center">
    {type === 'login' ? (
      <>
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-600 underline">
          Signup
        </Link>
      </>
    ) : (
      <>
        Already have an account?{' '}
        <Link to="/" className="text-blue-600 underline">
          Login
        </Link>
      </>
    )}
  </div>
</form>
