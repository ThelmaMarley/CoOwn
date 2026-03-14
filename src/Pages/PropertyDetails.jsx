import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import InvestmentActivity from "../Components/InvestmentActivity";

export default function PropertyDetails() {

const { id } = useParams();
const navigate = useNavigate();

const [property, setProperty] = useState(null);
const [shares, setShares] = useState(1);
const [investors, setInvestors] = useState([]);
const [loading, setLoading] = useState(true);
const [investing, setInvesting] = useState(false);

useEffect(() => {
fetchProperty();
fetchInvestors();
}, [id]);

async function fetchProperty() {

const { data, error } = await supabase
  .from("properties")
  .select("*")
  .eq("id", Number(id))
  .single();

if (error) {
  console.error(error);
} else {
  setProperty(data);
}

setLoading(false);

}

async function fetchInvestors() {

const { data, error } = await supabase
  .from("investments")
  .select(`
    fractions_bought,
    user_id,
    created_at,
    profiles (
      full_name
    )
  `)
  .eq("property_id", Number(id))
  .order("created_at", { ascending: false });

if (!error) {
  setInvestors(data);
}

}

async function handleInvest() {

setInvesting(true);

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  alert("Please login to invest.");
  setInvesting(false);
  return;
}

if (!property) {
  setInvesting(false);
  return;
}

if (property.shares_remaining === 0) {
  alert("This property is already fully funded.");
  setInvesting(false);
  return;
}

if (shares <= 0) {
  alert("Invalid number of shares.");
  setInvesting(false);
  return;
}

if (shares > property.shares_remaining) {
  alert("Not enough shares remaining.");
  setInvesting(false);
  return;
}

const totalCost = shares * property.price_per_share;

const { error: investError } = await supabase
  .from("investments")
  .insert([
    {
      user_id: user.id,
      property_id: property.id,
      fractions_bought: shares,
      amount_committed: totalCost
    }
  ]);

if (investError) {
  console.error(investError);
  alert("Investment failed: " + investError.message);
  setInvesting(false);
  return;
}

const newSharesRemaining = property.shares_remaining - shares;

const { error: updateError } = await supabase
  .from("properties")
  .update({ shares_remaining: newSharesRemaining })
  .eq("id", property.id);

if (updateError) {
  console.error(updateError);
  alert("Investment saved but property update failed.");
  setInvesting(false);
  return;
}

alert(`Investment successful!

Total commitment: ${totalCost.toLocaleString()} FCFA`);

await fetchProperty();
await fetchInvestors();

setInvesting(false);

}

if (loading) {
return (
<div className="p-20 text-center">
Loading Property...
</div>
);
}

if (!property) {
return (
<div className="p-20 text-center">
Property not found
</div>
);
}

const fundedPercent =
property.total_shares > 0
? Math.round(
((property.total_shares - property.shares_remaining) /
property.total_shares) * 100
)
: 0;

const isFullyFunded = property.shares_remaining === 0;

return (

<div className="max-w-6xl mx-auto px-4 py-10">

  <button
    onClick={() => navigate(-1)}
    className="mb-6 text-gray-500 hover:text-green-600"
  >
    ← Back to Marketplace
  </button>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

    <div className="lg:col-span-2">

      <img
        src={property.image}
        alt={property.title}
        className="w-full h-[400px] object-cover rounded-3xl mb-8 shadow-lg"
      />

      <h1 className="text-4xl font-bold mb-4">
        {property.title}
      </h1>

      <p className="text-gray-500 mb-6 text-lg">
        {property.location}
      </p>

      <p className="text-gray-600 leading-relaxed">
        {property.description || "No description available for this property yet."}
      </p>

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Investors ({investors.length})
        </h2>

        {investors.length === 0 ? (
          <p className="text-gray-500">
            No investors yet.
          </p>
        ) : (

          <div className="space-y-3">

            {investors.map((inv, index) => (

              <div
                key={index}
                className="flex justify-between bg-gray-100 p-3 rounded-lg"
              >

                <span>
                   {inv.profiles?.full_name || "Investor"}
                </span>

                <span>
                  {inv.fractions_bought} shares
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

    <div className="bg-white p-8 rounded-3xl shadow-xl border h-fit sticky top-24">

      <div className="mb-6">
        <span className="text-gray-500 block mb-1">
          Price per Share
        </span>

        <span className="text-3xl font-bold text-green-700">
          {property.price_per_share.toLocaleString()} FCFA
        </span>
      </div>

      <div className="mb-6 text-gray-600">
        <p>Total Shares: {property.total_shares}</p>
        <p>Shares Remaining: {property.shares_remaining}</p>
      </div>

      <div className="mb-6">

        <div className="flex justify-between text-sm mb-1">
          <span>{fundedPercent}% funded</span>
          <span>Goal</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">

          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${fundedPercent}%` }}
          ></div>

        </div>

      </div>

      <div className="mb-6">
        {isFullyFunded ? (
          <span className="text-red-600 font-semibold">
            Fully Funded
          </span>
        ) : (
          <span className="text-green-600 font-semibold">
            Open for Investment
          </span>
        )}
      </div>

      <div className="space-y-4 mb-8">

        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">

          <span className="font-semibold">
            Number of Shares
          </span>

          <input
            type="number"
            min="1"
            max={property.shares_remaining}
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            className="w-20 p-2 border rounded text-center"
            disabled={isFullyFunded || investing}
          />

        </div>

        <div className="flex justify-between text-lg font-bold border-t pt-4">

          <span>Total Investment</span>

          <span className="text-green-700">
            {(shares * property.price_per_share).toLocaleString()} FCFA
          </span>

        </div>

      </div>

      <button
        onClick={handleInvest}
        disabled={isFullyFunded || investing}
        className={`w-full py-4 rounded-xl font-semibold transition
          ${
            isFullyFunded
              ? "bg-gray-400 cursor-not-allowed"
              : investing
              ? "bg-gray-500 cursor-not-allowed text-white"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
      >
        {isFullyFunded
          ? "Fully Funded"
          : investing
          ? "Processing Investment..."
          : "Invest Now"}
      </button>

      <div className="mt-8">
        <InvestmentActivity propertyId={property.id} />
      </div>

    </div>

  </div>

</div>

);
}