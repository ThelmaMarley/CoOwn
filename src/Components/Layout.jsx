import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import logo from "../assets/coown logo.png"

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">

      {/* NAVBAR */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img 
            src={logo}
            alt="CoOwn Logo"
            className="h-28 w-auto"></img>
            

            <div className="flex flex-col leading none">

              <span className="text-xs text-slate-500">
              Own property together
            </span>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-6 text-slate-700 font-medium">

            <Link
              to="/marketplace"
              className="hover:text-green-700 transition"
            >
              Marketplace
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-green-700 transition"
                >
                  My Portfolio
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-grow">
        {children}
      </main>

    </div>
  );
}