import React, { useEffect, useState } from "react";
import { Table,Switch ,Select } from "antd";
import { Link ,useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline, TiStar } from "react-icons/ti";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;

const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzAyYzI1ZGM4MjY1YzEzODJlNjhmZDEiLCJlbWFpbCI6ImJkc21AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwMjcyMjI2MDg4Iiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3MjgzODYyMTksImV4cCI6MTcyODk5MTAxOSwiaWF0IjoxNzI4Mzg2MjE5fQ.f-xfkW_Ts2vbcd1RedF_uU_4fTmy-Ykl4n-9AY_i2KA'; // Replace this with your actual token


const MainOrderItem = () => {
  const columns = [
    {
      title: "Number",
      dataIndex: "key",
    },
    {
      title: "Store Name",
      dataIndex: "store",
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
    }
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
     
      const ordersRes = await axios.get(`http://localhost:5272/api/Order/${orderId}/items`, {
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
      store: orders[i].vendorName,
      pname: orders[i].productName,
      price:orders[i].productPrice + ".00",
      quantity: orders[i].quantity,
      total: (orders[i].productPrice * orders[i].quantity) +".00", 
      ostatus: orders[i].fulfillmentStatus,
      
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

export default MainOrderItem;
