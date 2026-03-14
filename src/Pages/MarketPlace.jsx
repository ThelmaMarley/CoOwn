import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PropertyCard from "../Components/PropertyCard";
import { Link } from "react-router-dom";

export default function Marketplace() {

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {

    try {

      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          investments(fractions_bought)
        `)
        .gt("shares_remaining", 0);

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      const processed = data.map((property) => {

        // TOTAL SHARES SOLD
        const totalSold =
          property.investments?.reduce(
            (sum, inv) => sum + (inv.fractions_bought || 0),
            0
          ) || 0;

        // INVESTOR COUNT
        const investorCount =
          property.investments?.filter(
            (inv) => inv.fractions_bought > 0
          ).length || 0;

        return {
          ...property,
          soldShares: totalSold,
          investorCount: investorCount
        };

      });

      setOpportunities(processed);

    } catch (err) {
      console.error("Unexpected error:", err);
    }

    setLoading(false);

  }

  const filtered = opportunities.filter((property) => {

    const query = search.toLowerCase();

    return (
      property.city?.toLowerCase().includes(query) ||
      property.town?.toLowerCase().includes(query) ||
      property.location?.toLowerCase().includes(query)
    );

  });

  const activeProjects = filtered.filter(
    (p) => p.funded_status?.toLowerCase().trim() !== "funded"
  );

  return (

    <div className="bg-stone-50">

      {/* HERO */}

      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20 px-6 text-center">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Explore Property Investments
            <br />
            <span className="text-yellow-400">
              Start Co-Owning Today
            </span>
          </h1>

          <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Discover verified property investment opportunities across Cameroon
            and invest alongside other investors through fractional ownership.
          </p>

          <input
            type="text"
            placeholder="Search town or city (Bonamousadi, Douala, Limbe...)"
            className="w-full max-w-xl mx-auto bg-white text-black px-6 py-4 rounded-full shadow-lg focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </section>

      {/* ACTIVE OPPORTUNITIES */}

      <section className="max-w-7xl mx-auto px-4 py-16">

        <h2 className="text-3xl font-bold text-center mb-12">
          Latest Investment Opportunities
        </h2>

        {loading ? (

          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {activeProjects.map((property) => (

              <div
                key={property.id}
                className="hover:shadow-xl hover:-translate-y-2 transition transform duration-300"
              >

                <PropertyCard
                  id={property.id}
                  image={
                    property.image ||
                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                  }
                  title={property.title}
                  location={property.location}
                  fractionPrice={`FCFA ${property.price_per_share}`}
                  totalInvestment={`FCFA ${property.total_amount}`}
                  totalShares={property.total_shares}
                  soldShares={property.soldShares}
                  sharesRemaining={property.total_shares - property.soldShares}
                  investorCount={property.investorCount}
                />

              </div>

            ))}

          </div>

        )}

      </section>

      {/* LINK TO FUNDED PROJECTS */}

      <section className="text-center py-10">

        <p className="text-gray-600 mb-4">
          Curious about deals that investors have already funded?
        </p>

        <Link
          to="/funded-projects"
          className="text-green-700 font-semibold hover:underline"
        >
          View Fully Funded Projects →
        </Link>

      </section>

      {/* CTA */}

      <section className="bg-green-900 text-white py-20 text-center">

        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-6">
            Start Building Your Property Portfolio Today
          </h2>

          <p className="text-green-200 mb-8">
            Join other investors and start co-owning verified real estate
            opportunities across Cameroon.
          </p>

          <Link
            to="/marketplace"
            className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl hover:bg-yellow-300 transition"
          >
            Start Investing
          </Link>

        </div>

      </section>

    </div>

  );
}