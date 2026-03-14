import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InvestmentActivity({ propertyId }) {

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    fetchInvestments();

    // Auto refresh every 4 seconds
    const interval = setInterval(() => {
      fetchInvestments();
    }, 4000);

    return () => clearInterval(interval);

  }, [propertyId]);

  async function fetchInvestments() {

    const { data, error } = await supabase
      .from("investments")
      .select(`
        fractions_bought,
        amount_committed,
        created_at,
        profiles (
          full_name
        )
      `)
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching investments:", error);
    } else {
      setInvestments(data);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">

      <h2 className="text-lg font-bold mb-4">
         Recent Investment Activity
      </h2>

      {investments.length === 0 ? (
        <p className="text-gray-500">No investment activity yet.</p>
      ) : (

        investments.map((investment, index) => (

          <div key={index} className="border-b py-3">

            <p className="font-semibold">
               {investment.profiles?.full_name || "Investor"} invested {investment.fractions_bought} shares
            </p>

            <p className="text-sm text-gray-500">
               {investment.amount_committed.toLocaleString()} FCFA
            </p>

          </div>

        ))

      )}

    </div>
  );
}