import { Link } from "react-router-dom";

export default function PropertyCard({
id,
image,
location,
title,
fractionPrice,
totalInvestment,
totalShares,
sharesRemaining,
investorCount
}) {

const funded =
totalShares > 0
? Math.round(((totalShares - sharesRemaining) / totalShares) * 100)
: 0;

return (
<div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

  <div className="relative">

    <img
      src={image}
      alt={title}
      className="h-56 w-full object-cover"
    />

    <span className="absolute top-4 left-4 bg-white text-green-800 text-xs font-semibold px-4 py-1 rounded-full shadow">
      {location}
    </span>

  </div>

  <div className="p-6">

    <h3 className="text-xl font-bold text-slate-800 mb-4">
      {title}
    </h3>

    <div className="flex justify-between text-sm mb-2">
      <span className="text-slate-500">Fraction Price</span>
      <span className="font-semibold">{fractionPrice}</span>
    </div>

    <div className="flex justify-between text-sm mb-4">
      <span className="text-slate-500">Total Investment</span>
      <span className="font-semibold">{totalInvestment}</span>
    </div>

    <div className="mb-4">

      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold">{funded}% Funded</span>
        <span className="text-slate-500">Goal</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2">

        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${funded}%` }}
        ></div>

      </div>

    </div>

    <div className="text-sm text-slate-500 mb-4 flex items-center gap-2">
       {investorCount || 0} Investors
    </div>

    <Link
      to={`/property/${id}`}
      className="block text-center bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
    >
      View Details
    </Link>

  </div>

</div>

);
}