import { Link } from "react-router-dom";

export default function OpportunityCard({ opportunity }) {

  const price = opportunity.amount_per_fraction || opportunity.price_per_share || 0;
  const total = opportunity.total_amount || opportunity.total_investment || 0;
  const progressPercent = opportunity.funded || 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">

      <div className="relative">

        <img
          src={opportunity.image_url || "https://via.placeholder.com/400x300"}
          className="w-full h-56 object-cover"
          alt={opportunity.title}
        />

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-700 uppercase">
          {opportunity.location}
        </div>

      </div>

      <div className="p-6">

        <h3 className="text-xl font-bold mb-3 truncate">
          {opportunity.title}
        </h3>

        <div className="space-y-2 text-sm text-slate-500 mb-4">

          <div className="flex justify-between">
            <span>Fraction Price</span>
            <span className="font-bold text-slate-900">
              {price.toLocaleString()} FCFA
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Investment</span>
            <span className="font-bold text-slate-900">
              {total.toLocaleString()} FCFA
            </span>
          </div>

        </div>

        {/* Funding Progress */}

        <div className="mb-6">

          <div className="flex justify-between text-xs mb-1 font-bold">

            <span>{progressPercent}% Funded</span>

            <span>
              Goal: {total.toLocaleString()} FCFA
            </span>

          </div>

          <div className="w-full bg-slate-100 rounded-full h-2">

            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            ></div>

          </div>

        </div>

        <Link
          to={`/opportunity/${opportunity.id}`}
          className="block text-center bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}