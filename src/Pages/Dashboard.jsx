import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const [propertiesOwned, setPropertiesOwned] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {

    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      fetchInvestments(user.id);
    }

  }

  async function fetchInvestments(userId) {

    const { data, error } = await supabase
      .from("investments")
      .select(`
        fractions_bought,
        amount_committed,
        created_at,
        properties (
          id,
          title,
          location,
          image
        )
      `)
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }

    setInvestments(data);

    // Calculate totals
    let invested = 0;
    let shares = 0;
    const propertySet = new Set();

    data.forEach((inv) => {
      invested += inv.amount_committed;
      shares += inv.fractions_bought;
      propertySet.add(inv.properties.id);
    });

    setTotalInvested(invested);
    setTotalShares(shares);
    setPropertiesOwned(propertySet.size);

  }

  return (

    <div className="bg-stone-50 min-h-screen p-10">

      <h1 className="text-3xl font-bold mb-8">
        Investor Dashboard
      </h1>

      {user && (
        <p className="mb-8 text-gray-600">
          Welcome back, {user.email}
        </p>
      )}

      {/* Stats cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Invested</h3>
          <p className="text-2xl font-bold text-emerald-600">
            {totalInvested.toLocaleString()} FCFA
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Properties Owned</h3>
          <p className="text-2xl font-bold">
            {propertiesOwned}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Shares Owned</h3>
          <p className="text-2xl font-bold">
            {totalShares}
          </p>
        </div>

      </div>

      {/* Investment list */}

      <h2 className="text-2xl font-bold mb-6">
        My Investments
      </h2>

      {investments.length === 0 ? (

        <p className="text-gray-500">
          You have not invested in any properties yet.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {investments.map((inv, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow p-4"
            >

              <img
                src={inv.properties.image}
                alt={inv.properties.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-bold">
                {inv.properties.title}
              </h3>

              <p className="text-gray-500 mb-3">
                {inv.properties.location}
              </p>

              <p>
                Shares Owned: <strong>{inv.fractions_bought}</strong>
              </p>

              <p>
                Amount Invested:{" "}
                <strong>
                  {inv.amount_committed.toLocaleString()} FCFA
                </strong>
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Invested on{" "}
                {new Date(inv.created_at).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
