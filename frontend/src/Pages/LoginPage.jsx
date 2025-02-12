import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
      login(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5 text-base-content/40'/>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='size-5 text-base-content/40'/>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input input-bordered w-full pl-10"
                required
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? <EyeOff className='size-5 text-base-content/40'/> : <Eye className='size-5 text-base-content/40'/>}
                </button>
              </div>
            </div>
          
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                  <Loader2 className='size-5 animate-spin'/>
                  Loading...
                  </>
                ):(
                  "Create Account"
                )}
              </button>
            </div>
          </div>
        </form>
        <div className='text-center'> 
          <p className='text-base-content/60'>
            Don't have an account?{" "}
            <Link to="/signup" className='link link-primary'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
   </div>
   <AuthImagePattern
    title="join our community"
    subtitle="Connect with friends,share moments,and stay in touch with your loved ones."/>
  </div>
  )
}

export default LoginPage