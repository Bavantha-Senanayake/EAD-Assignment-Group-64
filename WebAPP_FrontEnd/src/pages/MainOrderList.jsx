import React, { useEffect, useState } from "react";
import { Table, Switch, Select, Modal, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;

const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzAyYzI1ZGM4MjY1YzEzODJlNjhmZDEiLCJlbWFpbCI6ImJkc21AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwMjcyMjI2MDg4Iiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3MjgzODYyMTksImV4cCI6MTcyODk5MTAxOSwiaWF0IjoxNzI4Mzg2MjE5fQ.f-xfkW_Ts2vbcd1RedF_uU_4fTmy-Ykl4n-9AY_i2KA'; // Replace this with your actual token

const MainOrderList = () => {
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
      title: "Customer Name",
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
    {
      title: "Change Status",
      dataIndex: "changeStatus",
    },
  ];

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationNote, setCancellationNote] = useState("");

  useEffect(() => {
    fetchOrdersAndCustomers();
  }, []);

  const fetchOrdersAndCustomers = async () => {
    try {
      const ordersRes = await axios.get("http://localhost:5272/api/Order", {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
          "Content-Type": "application/json",
        },
      });

      const customersRes = await axios.get("http://localhost:5272/api/Users/customer", {
        headers: {
          Authorization: `Bearer ${hardcodedToken}`,
          "Content-Type": "application/json",
        },
      });

      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleStatusChange = (value, order) => {
    if (value === "Cancelled") {
      setSelectedOrder(order);
      setOpen(true);
    } else {
      updateOrderStatus(order.id, value);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:5272/api/Order/${orderId}/status`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order status updated successfully!");
      fetchOrdersAndCustomers();
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const handleCancelOrder = async () => {
    try {
      await axios.patch(`http://localhost:5272/api/Order/${selectedOrder.id}/cancel`, 
        { note: cancellationNote },
        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order cancelled successfully!");
      setOpen(false);
      setCancellationNote("");
      fetchOrdersAndCustomers();
    } catch (error) {
      toast.error("Error cancelling order");
    }
  };

  const data = orders.map((order, index) => {
    const customer = customers.find((c) => c.id === order.userId) || {};

    return {
      key: index + 1,
      orderid: order.id,
      cname: customer.username || "Unknown",
      address: `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.zip}`,
      pnumber: customer.phoneNumber || "Unknown",
      tamount: order.totalAmount + ".00",
      date: new Date(order.createdAt).toLocaleDateString(),
      ostatus: order.status,
      oitem: (
        <Link
          to={`/administrator/main-orders/${order.id}`}
          style={{
            backgroundColor: "#f0f0f0",
            padding: "5px 10px",
            borderRadius: "4px",
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          View
        </Link>
      ),
      changeStatus: (
        <Select
          defaultValue={order.status}
          onChange={(value) => handleStatusChange(value, order)}
          style={{ width: 120 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="PartiallyFulfilled">Partially Fulfilled</Option>
          <Option value="Fulfilled">Fulfilled</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    };
  });

  return (
    <div>
      <h3 className="mb-4 title">All Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Cancel Order"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancelOrder}>
            Submit
          </Button>,
        ]}
      >
        <p>Please provide a reason for cancellation:</p>
        <Input.TextArea
          value={cancellationNote}
          onChange={(e) => setCancellationNote(e.target.value)}
          rows={4}
          placeholder="Enter cancellation note"
        />
      </Modal>
    </div>
  );
};

export default MainOrderList;
