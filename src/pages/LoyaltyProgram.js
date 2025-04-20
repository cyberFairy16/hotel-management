import React from "react";

const LoyaltyProgram = ({ customer }) => {
  const { name, totalSpend, completedBookings } = customer;

  const points = totalSpend;
  const eligibleForDiscount = points >= 500;
  const eligibleForSpa = points >= 1000;
  const eligibleForUpgrade = completedBookings >= 5;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Loyalty Program</h1>
      <p className="text-lg mb-4">Welcome back, <strong>{name}</strong>!</p>

      <div className="space-y-3">
        <div><strong>Total Spend:</strong> ${totalSpend}</div>
        <div><strong>Total Points:</strong> {points} pts</div>
        <div><strong>Completed Bookings:</strong> {completedBookings}</div>

        <div className="mt-4">
          <h2 className="font-semibold">Your Rewards:</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li className={eligibleForDiscount ? "text-green-600" : "text-gray-600"}>
              {eligibleForDiscount ? "✅" : "❌"} $10 off after 500 points
            </li>
            <li className={eligibleForSpa ? "text-green-600" : "text-gray-600"}>
              {eligibleForSpa ? "✅" : "❌"} Free spa treatment after 1,000 points
            </li>
            <li className={eligibleForUpgrade ? "text-green-600" : "text-gray-600"}>
              {eligibleForUpgrade ? "✅" : "❌"} Free room upgrade after 5 completed bookings
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
