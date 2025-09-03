import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/customers/${id}`);
        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchCustomer();
  }, [id]);

  if (!customer) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/customers")}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{customer.name}</h1>
      <p className="text-gray-700">Email: {customer.email}</p>
      <p className="text-gray-700">Phone: {customer.phone}</p>

      <button
        onClick={() => navigate(`/customers/${id}/edit`)}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default CustomerDetailPage;
