import React from 'react'
// import ExamockLogo from '..Images/logo.jpegg';

const LoginPage = () => {

  //--------------------------------------------------

  const handleGoogleLogin = () => {
    console.log("Initiating Google login...");
    window.location.href = 'http://localhost:3000/auth/google';
  };

  //--------------------------------------------------

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Handle email/password login logic here
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email, "Password:", password);
    // You can send this data to your backend for authentication
    // Example: axios.post('/api/login', { email, password })
    
    // Reset the form
    e.target.reset();
    
  };

  //------------------------------------------------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 border-rounded-lg shadow-md">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{ExamockLogo}</h1> */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login Form</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Welcome back</h2>

        {/* Email/Password Login */}
        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Log in
          </button>
        </form>

        {/* OR separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="space-y-4">

          <button
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            onClick={handleGoogleLogin}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.0003 4.54502C14.7118 4.54502 16.5828 5.76002 17.6538 6.79002L20.5738 3.96002C18.6738 2.17502 15.9088 1.04502 12.0003 1.04502C7.30634 1.04502 3.21034 3.73002 1.25834 7.50002L5.19034 10.59C6.00234 8.01002 8.78434 6.13502 12.0003 6.13502L12.0003 4.54502Z" />
              <path d="M22.2854 11.5601H12.0004V15.4501H18.2954C17.9154 17.4051 16.7354 18.8451 15.0004 19.9101L19.0304 22.9551C21.4604 20.7301 22.8254 17.6851 22.8254 14.1801C22.8254 13.0651 22.6904 12.2351 22.2854 11.5601Z" />
              <path d="M12.0003 23.045C15.9083 23.045 19.1083 21.735 21.0503 19.785L17.0203 16.74C15.8603 17.505 14.1453 18.045 12.0003 18.045C8.78434 18.045 6.00234 16.17 5.19034 13.59L1.25834 16.68C3.21034 20.45 7.30634 23.045 12.0003 23.045Z" />
              <path d="M1.25834 7.50002C1.16834 7.85002 1.04034 8.24002 1.04034 8.64502V15.4501H5.08034V12.4101L5.19034 10.59C5.46034 9.77002 5.92534 8.90502 6.53534 8.24002L1.25834 7.50002Z" />
            </svg>
            Login with Google
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default LoginPage