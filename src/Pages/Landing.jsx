import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import PropertyCard from "../Components/PropertyCard";
import  land2  from "../assets/land2.png"
import  appartment from "../assets/appartment.jpg"
import duplex2 from "../assets/duplex2.jpg"



export default function Landing() {
 useEffect(() =>{
  async function testConnection(){

    const { data, error } = await supabase 
       .from("properties")
       .select("*")

       console.log(data)
       console.log(error)
  }

  testConnection()

}, [])

  return (
    <div className="bg-stone-50">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-900 to-green-700 text-white py-20 px-6 text-center">

        {/* Floating Background Shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 opacity-20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-floatSlow"></div>
        <div className="absolute top-40 right-1/3 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl animate-float"></div>

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto animate-fadeIn">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Invest in Property.
            <br />
            <span className="text-yellow-400">Own It Together.</span>
          </h1>

          <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            CoOwn lets you invest in verified land projects across Cameroon
            with other investors. Transparent, secure and accessible.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">

            <Link
              to="/marketplace"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-yellow-300 hover:shadow-xl transition"
            >
              Explore Opportunities
            </Link>

            <Link
              to="/auth"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-900 transition"
            >
              Start Investing
            </Link>

          </div>

        </div>
      </section>


      {/* FEATURED TITLE */}
      <div className="text-center mt-16 mb-12 px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Featured Investment Opportunities
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Explore verified property projects across Cameroon and start
          co-owning real estate with as little as 100,000 FCFA.
        </p>

      </div>


      {/* FEATURED OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="grid md:grid-cols-3 gap-8">

          <PropertyCard
            image={land2}
            location="Bomaka"
            title="Spacious Land Project"
            fractionPrice="500,000 FCFA"
            totalInvestment="10,000,000 FCFA"
            funded={65}
          />

          <PropertyCard
            image={appartment}
            location="Douala"
            title="Modern Appartment"
            fractionPrice="750,000 FCFA"
            totalInvestment="15,000,000 FCFA"
            funded={40}
          />

          <PropertyCard
            image={duplex2}
            location="Limbe"
            title="Luxury Duplex"
            fractionPrice="1,000,000 FCFA"
            totalInvestment="25,000,000 FCFA"
            funded={30}
          />

        </div>

      </section> 

      <section className="bg-stone-100 py-20 px-6">

  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-800">
      Why Invest With CoOwn
    </h2>

    <p className="text-gray-500 mt-3">
      Real estate investment made simple, secure, and accessible.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

    {/* Card 1 */}
    <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition transform duration-300">
      <h3 className="text-xl font-semibold mb-3 text-green-700">
        Verified Properties
      </h3>
      <p className="text-gray-600">
        All properties listed on CoOwn are carefully verified before they appear on the platform.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition transform duration-300">
      <h3 className="text-xl font-semibold mb-3 text-green-700">
        Start With 100,000 FCFA
      </h3>
      <p className="text-gray-600">
        Start investing in real estate with small amounts and co-own properties with other investors.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition transform duration-300">
      <h3 className="text-xl font-semibold mb-3 text-green-700">
        Transparent Ownership
      </h3>
      <p className="text-gray-600">
        Track your investments and ownership shares directly from your personal dashboard.
      </p>
    </div>

  </div>

</section>

      


      {/* TRUST SECTION */}
      <section className="max-w-6xl mx-auto py-12 px-4">

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition transform duration-300">

            <h3 className="text-4xl font-bold text-green-700 mb-2">
              50+
            </h3>

            <p className="text-slate-600">
              Investors already co-owning land
            </p>

          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition transform duration-300">

            <h3 className="text-4xl font-bold text-green-700 mb-2">
              10+
            </h3>

            <p className="text-slate-600">
              Verified property projects
            </p>

          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition transform duration-300">

            <h3 className="text-4xl font-bold text-green-700 mb-2">
              100K+
            </h3>

            <p className="text-slate-600">
              FCFA minimum investment
            </p>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="bg-white py-16 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-12">
            How CoOwn Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-6">

              <div className="text-green-700 text-5xl mb-4 font-bold">1</div>

              <h3 className="font-semibold text-xl mb-2">
                Browse Opportunities
              </h3>

              <p className="text-slate-600">
                Explore verified land investment projects available on our marketplace.
              </p>

            </div>

            <div className="p-6">

              <div className="text-green-700 text-5xl mb-4 font-bold">2</div>

              <h3 className="font-semibold text-xl mb-2">
                Invest With Others
              </h3>

              <p className="text-slate-600">
                Buy fractional shares of land starting from 100,000 FCFA.
              </p>

            </div>

            <div className="p-6">

              <div className="text-green-700 text-5xl mb-4 font-bold">3</div>

              <h3 className="font-semibold text-xl mb-2">
                Track Your Portfolio
              </h3>

              <p className="text-slate-600">
                Monitor your property investments and ownership from your dashboard.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="bg-green-900 text-white py-16">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-xl font-bold mb-3">CoOwn</h3>

            <p className="text-green-200">
              A platform that enables investors to co-own property projects
              and build wealth through fractional real estate investment.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Platform</h4>

            <ul className="space-y-2 text-green-200">
              <li>Marketplace</li>
              <li>How It Works</li>
              <li>Investor Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>

            <ul className="space-y-2 text-green-200">
              <li>Terms</li>
              <li>Privacy</li>
              <li>Investor Guidelines</li>
            </ul>
          </div>

        </div>

        <div className="text-center text-green-300 mt-12 text-sm">
          © {new Date().getFullYear()} CoOwn. All rights reserved.
        </div>

      </footer>

    </div>
  );
}