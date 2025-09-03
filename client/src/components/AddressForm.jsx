import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AddressList = () => {
  const { customerId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/customers/${customerId}/addresses`);
        const data = await res.json();
        setAddresses(data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [customerId]);

  if (loading) return <p className="text-center">Loading addresses...</p>;

  return (
    <div className="space-y-4">
      {addresses.map((a) => (
        <div key={a.id} className="bg-gray-100 rounded-lg p-4">
          <p className="font-semibold">{a.street}, {a.city}</p>
          <p className="text-gray-600">{a.state}, {a.zip}</p>
          <Link
            to={`/customers/${customerId}/addresses/${a.id}/edit`}
            className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </Link>
        </div>
      ))}

      {addresses.length === 0 && (
        <p className="text-gray-500 text-center">No addresses found.</p>
      )}
    </div>
  );
};

export default AddressList;
