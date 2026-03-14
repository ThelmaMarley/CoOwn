import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PropertyCard from "../Components/PropertyCard";

export default function FundedProjects() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFundedProjects();
  }, []);

  async function fetchFundedProjects() {

    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        investments(count)
      `)
      .eq("shares_remaining", 0);

    if (error) {
      console.error("Supabase error:", error);
    } else {
      console.log("Funded properties:", data);
      setProjects(data);
    }

    setLoading(false);
  }

  function calculateFunding(property) {

    if (!property.total_shares) return 0;

    return Math.round(
      ((property.total_shares - property.shares_remaining) /
        property.total_shares) * 100
    );
  }

  return (

    <div className="bg-stone-50 min-h-screen py-20">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-12">
          Successfully Funded Projects
        </h1>

        {loading ? (

          <div className="flex justify-center">
            <div className="animate-spin h-10 w-10 border-b-2 border-green-700"></div>
          </div>

        ) : projects.length === 0 ? (

          <p className="text-center text-gray-500">
            No funded projects yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {projects.map((property) => (

              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.image}
                title={property.title}
                location={property.location}
                fractionPrice={`FCFA ${property.price_per_share}`}
                totalInvestment={`FCFA ${property.total_amount}`}
                funded={calculateFunding(property)}
                investors={property.investments?.[0]?.count || 0}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}