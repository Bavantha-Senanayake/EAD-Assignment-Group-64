import React, { useEffect, useState } from "react";
import { Table, Switch } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzAyNTQxNTgzNjk3OTI4NWMxMTc4MWQiLCJlbWFpbCI6ImJhdmFudGhhQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDI3MjIyNjA4OCIsInJvbGUiOiJWZW5kb3IiLCJuYmYiOjE3MjgyOTYwMzIsImV4cCI6MTcyODkwMDgzMiwiaWF0IjoxNzI4Mjk2MDMyfQ.AU37ne7_VrNfhuJ6nZI14Qp9rXpfP6D7SP2HQXn5wp0'; // Replace this with your actual token

const columns = [
  {
    title: "Number",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Created Date",
    dataIndex: "date",
  },
  {
    title: "Activation/Deactivation",
    dataIndex: "isActive",
    render: (isActive, record) => (
      <Switch
        checked={isActive}
        //onChange={() => toggleUserStatus(record.id, !isActive)}
      />
    ),
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch users (customers)
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5272/api/Users/customer", {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
        },
      });
      setCustomers(res.data);
    } catch (error) {
      toast.error("Error fetching customers");
    }
  };

  // Toggle user activation status
  const toggleUserStatus = async (id, newStatus) => {
    try {
      const endpoint = newStatus
        ? `http://localhost:5272/api/users/${id}/activate`
        : `http://localhost:5272/api/users/${id}/deactivate`;

      await axios.patch(endpoint, null, {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
        },
      });
      toast.success(`User ${newStatus ? "activated" : "deactivated"} successfully`);
      fetchCustomers(); // Refetch the customers after status change
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const data = customers.map((customer, index) => ({
      key: index + 1,
      name: customer.username,
      email: customer.email,
      mobile: customer.phoneNumber,
      date: new Date(customer.createdAt).toLocaleDateString(),
      isActive: customer.isActive,
      id: customer.id,
    }));

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customers;
