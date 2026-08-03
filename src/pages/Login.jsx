import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="pt-32 pb-24 max-w-lg mx-auto px-6 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="font-sans text-4xl text-geeks-dark mb-4">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-geeks-dark/60 text-sm">
          {isLogin 
            ? 'Sign in to access your orders, saved items, and rewards.' 
            : 'Join Amaré to track your orders, save your favorite shades, and earn rewards.'}
        </p>
      </div>

      <div className="bg-white p-8 sm:p-12 border border-gray-100 shadow-xl">
        <form className="space-y-6">
          {!isLogin && (
            <>
              <input 
                type="text" 
                placeholder="First Name" 
                className="w-full p-4 border border-gray-200 focus:border-geeks-dark outline-none bg-transparent transition-colors" 
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="w-full p-4 border border-gray-200 focus:border-geeks-dark outline-none bg-transparent transition-colors" 
              />
            </>
          )}
          
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-4 border border-gray-200 focus:border-geeks-dark outline-none bg-transparent transition-colors" 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 border border-gray-200 focus:border-geeks-dark outline-none bg-transparent transition-colors" 
          />

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-xs text-geeks-dark/60 hover:text-geeks-dark transition-colors border-b border-transparent hover:border-geeks-dark pb-0.5">
                Forgot your password?
              </a>
            </div>
          )}

          <Link to="/account" className="w-full py-4 bg-pink-600 text-white shadow-md font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-pink-700 transition-colors">
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="mt-8 text-center text-sm text-geeks-dark/60">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-geeks-dark font-medium hover:underline"
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
