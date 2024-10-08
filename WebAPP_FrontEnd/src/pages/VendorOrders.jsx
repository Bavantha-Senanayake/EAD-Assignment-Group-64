import React, { useEffect, useState } from "react";
import { Table,Switch } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline, TiStar } from "react-icons/ti";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { toast } from "react-toastify";


const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzA0Y2UyMmUwM2UzOTU3YmIwOTZkMGEiLCJlbWFpbCI6InNoaXJhbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjA3ODQ4NDg2OTYiLCJyb2xlIjoiVmVuZG9yIiwibmJmIjoxNzI4Mzc0MjE5LCJleHAiOjE3Mjg5NzkwMTksImlhdCI6MTcyODM3NDIxOX0.9OhZQCGWckOE8mIWmvJuwzOmEXuphum9JJFbiTUAS1g'; // Replace this with your actual token


const VendorOrders = () => {
  const columns = [
    {
      title: "Number",
      dataIndex: "key",
    },
    {
      title: "OrderID",
      dataIndex: "orderid",
      sorter: (a, b) => a.vname.length - b.vname.length,
    },
    {
      title: "customer Name",
      dataIndex: "cname",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Delivery Address",
      dataIndex: "address",
      sorter: (a, b) => a.business.length - b.business.length,
    },
    {
      title: "Phone Number",
      dataIndex: "pnumber",
    },
    {
        title: "Ordered Date",
        dataIndex: "date",
    },
    {
        title: "Order Status",
        dataIndex: "ostatus",
    },
    {
        title: "Order Items",
        dataIndex: "oitem",
    },
  ];

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchOrdersAndCustomers();

  }, []);

  // Fetch all products
  const fetchOrdersAndCustomers = async () => {
    try {
      // Fetch orders
      const ordersRes = await axios.get("http://localhost:5272/api/Order/vendor", {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
          "Content-Type": "application/json",
        },
      });

      // Fetch all customers
      const customersRes = await axios.get("http://localhost:5272/api/Users/customer", {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
          "Content-Type": "application/json",
        },
      });

      // Set both orders and customers data
      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };


  

 


  // Fetch all colors
  


  const data = orders.map((order, index) => {
    // Find the customer by customerId in the customers array
    const customer = customers.find((c) => c.id === order.userId) || {};

    return {
      key: index + 1,
      orderid: order.id,
      cname: customer.username || "Unknown", // Display the customer's name
      address: `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.zip}`,
      pnumber: customer.phoneNumber || "Unknown",
      tamount: order.totalAmount + ".00",
      date: new Date(order.createdAt).toLocaleDateString(),
      ostatus: order.status,
      oitem: (
        <Link
        to={`/vendor/vendor-orders/${order.id}`}
        style={{
          backgroundColor: "#f0f0f0", // Set your desired background color
          padding: "5px 10px", // Add some padding for better appearance
          borderRadius: "4px", // Optional: Make the edges rounded
          color: "#007bff", // Adjust text color for contrast
          textDecoration: "none", // Remove underline
        }}
      >
        View Order Items
      </Link>
      ),
    };
  });


  const toggleProductStatus = async (id, isActive) => {

    console.log(id);
    console.log(isActive);

    try {
      const endpoint = isActive
        ? `http://localhost:5272/api/product/${id}/activate`
        : `http://localhost:5272/api/product/${id}/deactivate`;
      
        await axios.patch(endpoint, {}, {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            "Content-Type": "application/json",
          },
        });

      toast.success(`Product ${isActive ? "activated" : "deactivated"} successfully`);
      fetchOrdersAndCustomers(); // Refetch products after status change
    } catch (error) {
      toast.error("Error updating product status");
    }
  };

  const deleteAProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5272/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            "Content-Type": "application/json"
          }
        }
      ); // Replace with actual delete product API
      toast.success("Product deleted successfully");
      setOpen(false);
      fetchOrdersAndCustomers(); // Refetch products after deletion
    } catch (error) {
      toast.error("Error deleting product");
    }
  };


  
  return (
    <div>
      <h3 className="mb-4 title">Vendor Order List</h3>
      <div>
        <Table  columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProduct(productId);
        }}
        title="Are you sure you want to remove the vendor?"
      />
    </div>
  );
};

export default VendorOrders;
