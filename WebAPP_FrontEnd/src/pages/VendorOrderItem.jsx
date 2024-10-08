import React, { useEffect, useState } from "react";
import { Table,Switch ,Select } from "antd";
import { Link ,useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline, TiStar } from "react-icons/ti";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;

const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzA0Y2UyMmUwM2UzOTU3YmIwOTZkMGEiLCJlbWFpbCI6InNoaXJhbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjA3ODQ4NDg2OTYiLCJyb2xlIjoiVmVuZG9yIiwibmJmIjoxNzI4Mzc0MjE5LCJleHAiOjE3Mjg5NzkwMTksImlhdCI6MTcyODM3NDIxOX0.9OhZQCGWckOE8mIWmvJuwzOmEXuphum9JJFbiTUAS1g'; // Replace this with your actual token


const VendorOrderItem = () => {
  const columns = [
    {
      title: "Number",
      dataIndex: "key",
    },
    {
      title: "ProductId",
      dataIndex: "productid",
      sorter: (a, b) => a.productid.length - b.productid.length,
    },
    {
      title: "Product Name",
      dataIndex: "pname",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
        title: "Product Price",
        dataIndex: "price",
    },
    {
      title: "Order Item Quantity",
      dataIndex: "quantity",
    },
    {
        title: "Total",
        dataIndex: "total",
    },
    {
        title: "Order Item Status",
        dataIndex: "ostatus",
    },
    {
        title: "Change Status",
        dataIndex: "changeStatus",
    },
  ];

  const [orders, setOrders] = useState([]);
  const { orderId } = useParams();
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

  }, [orderId]);

  // Fetch all products
  const fetchOrdersAndCustomers = async () => {
    try {
      // Fetch orders   /api/Order/{orderId}/vendor/items
      
      const ordersRes = await axios.get(`http://localhost:5272/api/Order/${orderId}/vendor/items`, {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
          "Content-Type": "application/json",
        },
      });

     
      // Set both orders and customers data
      setOrders(ordersRes.data);
  
    } catch (error) {
      toast.error("Error fetching data");
    }
  };


  

 


  // Fetch all colors
  


  const data = [];
  for (let i = 0; i < orders.length; i++) {
    data.push({
      key: i + 1,
      productid: orders[i].productId,
      pname: orders[i].productName,
      price:orders[i].productPrice + ".00",
      quantity: orders[i].quantity,
      total: (orders[i].productPrice * orders[i].quantity) +".00", 
      ostatus: orders[i].fulfillmentStatus,
      changeStatus: (
        <Select
          defaultValue={orders[i].fulfillmentStatus}
         
          style={{ width: 120 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    });
  }



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
      <h3 className="mb-4 title">##OrderID-OD56547656656 Order Items</h3>
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

export default VendorOrderItem;
