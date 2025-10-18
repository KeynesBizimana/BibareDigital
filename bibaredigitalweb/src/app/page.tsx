"use client";
import { useRouter } from "next/navigation";
import { login,signup } from "./login/actions";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("login");
  

  const handleLogin = () => {
    setCurrentPage("home");
  };

  const handleSignup = (email: string, password: string) => {
    setCurrentPage("home");
  };

  // const handleLogout = () => {
  //   setUser(null);
  //   setCurrentPage("login");
  // };

  // const handleAddEntry = (entry:any) => {
  //   const newEntry = {
  //     id: entries.length + 1,
  //     ...entry,
  //     status: "yego",
  //   };
  //   setEntries([newEntry, ...entries]);
  // };

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
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    
  };

  return (

    // <form>
    //     <label htmlFor="email">Email:</label>
    //     <input id="email" name="email" type="email" required />
    //     <label htmlFor="password">Password:</label>
    //     <input id="password" name="password" type="password" required />
    //     <button formAction={login}>Log in</button>
    //     <button formAction={signup}>Sign up</button>
    //   </form>
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-600/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
            Murakaza neza kuri Bibare Digital
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Emeli
              </label>
              <input
                type="email"
                id="email"
                name="email"
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
                required
                className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <button
              formAction={signup}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Kora Konte
            </button>

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

function LoginPage({ onLogin, onSwitchToSignup }: any) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-600/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
            Murakaza neza kuri Bibare Digital
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Emeli
              </label>
              <input
                type="email"
                id="email"
                name="email"
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
                required
                className="w-full px-4 py-3 bg-slate-300/70 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <button
              onClick={() => router.push("/home")}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Injira
            </button>

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

