import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:5000/customers");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <p className="text-center">Loading customers...</p>;

  return (
    <div className="space-y-4">
      {customers.map((c) => (
        <div
          key={c.id}
          className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold text-lg">{c.name}</h2>
            <p className="text-gray-600">{c.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/customers/${c.id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View
            </Link>
            <Link
              to={`/customers/${c.id}/edit`}
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}

      {customers.length === 0 && (
        <p className="text-gray-500 text-center">No customers found.</p>
      )}
    </div>
  );
};

export default CustomerList;
