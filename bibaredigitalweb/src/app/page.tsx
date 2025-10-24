"use client";
import { redirect, useRouter } from "next/navigation";
import { login,signup } from "./login/actions";

import { useState } from "react";
import { CheckCircle, XCircle,Loader2 } from "lucide-react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("login");
  const [submitting, setSubmitting] = useState(false);

  

  const handleLogin = () => {
    setCurrentPage("home");
  };

  const handleSignup = (email: string, password: string) => {
    setCurrentPage("home");
  };


  if (currentPage === "signup") {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentPage("login")}
      />
    );
  }

  if (currentPage === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentPage("signup")}
      />
    );
  }



  return null;
}

function SignupPage({ onSignup, onSwitchToLogin }: any) {
  const [isLoading, setisLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const formDataObject = new FormData(e.currentTarget);
      await signup(formDataObject);
    } catch (error) {
      console.log("Signup error ", error);
    } finally {
      setisLoading(false);
    }

    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-600/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
            Murakaza neza kuri Bibare Digital
          </h1>

          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Emeli
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Ijambobanga
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                {isLoading ?
                
                  (
                    <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                      "tegereza..."
                      </>) :
                  (" Kora Konte")}
              </button>
            </form>

            <div className="text-center">
              <p className="text-white mb-3">Ufite Konti ?</p>
              <button
                onClick={onSwitchToLogin}
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-8 rounded-full transition-colors"
              >
                Injira
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({  onSwitchToSignup }: any) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const formDataObject = new FormData(e.currentTarget);
      await login(formDataObject);
      
    } catch (error) {
      console.log("LOgin Error ", error);
      
    } finally {
      setisLoading(false);
    }
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-600/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
            Murakaza neza kuri Bibare Digital
          </h1>

          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Emeli
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Ijambobanga
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full transition-colors mt-4"
              >
                {
                  isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2 inline-block" />
                      Tegereza...
                    </>
                  ): (
                    "Injira"
                  )
                }
                
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={onSwitchToSignup}
                className="text-white underline hover:text-slate-300"
              >
                Nta konte ufite? Kora konte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

