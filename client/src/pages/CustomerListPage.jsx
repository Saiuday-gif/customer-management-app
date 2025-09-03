import { useState, useEffect } from 'react';
import CustomerFormPage from './CustomerFormPage';
import CustomerEditForm from './CustomerEditForm';

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5001/customers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError('Could not fetch customers.');
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:5001/customers/${id}', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete customer.');
      }
      // Re-fetch the customers list to update the UI
      fetchCustomers();
    } catch (error) {
      setError('Could not delete customer.');
      console.error('Error deleting customer:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      {loading && <div>Loading customers...</div>}
      {error && <div>Error: {error}</div>}
      
      {customers.length === 0 && !loading && !error && (
        <p>No customers found.</p>
      )}

      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.email}
            <button onClick={() => setEditingCustomer(customer)}>Edit</button>
            <button onClick={() => handleDelete(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <hr />
      
      {editingCustomer ? (
        <CustomerEditForm 
          customer={editingCustomer} 
          onUpdateSuccess={() => {
            setEditingCustomer(null);
            fetchCustomers();
          }} 
        />
      ) : (
        <CustomerFormPage onCustomerAdded={fetchCustomers} />
      )}
    </div>
  );
}

export default CustomerListPage;
