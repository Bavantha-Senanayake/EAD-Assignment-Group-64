import React, { useEffect, useState } from "react";
import { Table,Switch } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline, TiStar } from "react-icons/ti";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { toast } from "react-toastify";


const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzAyNTQxNTgzNjk3OTI4NWMxMTc4MWQiLCJlbWFpbCI6ImJhdmFudGhhQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDI3MjIyNjA4OCIsInJvbGUiOiJWZW5kb3IiLCJuYmYiOjE3MjgyOTYwMzIsImV4cCI6MTcyODkwMDgzMiwiaWF0IjoxNzI4Mjk2MDMyfQ.AU37ne7_VrNfhuJ6nZI14Qp9rXpfP6D7SP2HQXn5wp0'; // Replace this with your actual token


const VendorList = () => {
  const columns = [
    {
      title: "Number",
      dataIndex: "key",
    },
    {
      title: "Vendor Name",
      dataIndex: "vname",
      sorter: (a, b) => a.vname.length - b.vname.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Business Name",
      dataIndex: "business",
      sorter: (a, b) => a.business.length - b.business.length,
    },
    {
      title: "Average Rating[5]",
      dataIndex: "arating",
    },

    {
      title: "Comments",
      dataIndex: "comment"
    },
    {
        title: "Registered Date",
        dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [vendors, setVendors] = useState([]);

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
    fetchVendor();

  }, []);

  // Fetch all products
  const fetchVendor = async () => {
    try {
      const res = await axios.get("http://localhost:5272/api/Vendor",

        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            "Content-Type": "application/json",
            },
            }

      ); // Replace with actual product API
      setVendors(res.data);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };


  

 


  // Fetch all colors
  


  const data = [];
  for (let i = 0; i < vendors.length; i++) {
    data.push({
      key: i + 1,
      vname: vendors[i].username,
      email:vendors[i].email,
      business: vendors[i].businessName,
      arating: (<>
      {vendors[i].averageRating} 
      <TiStar/>
      </>),
      comment: (
        <button className="btn btn-primary" >
          View 
        </button>
      ), // Add 
      date: new Date(vendors[i].createdAt).toLocaleDateString(),
      action: (
        <>
          <Link
            to={`/admin/product/${vendors[i]._id}`}
            className="text-success fs-3"
          >
            <BiEdit />
          </Link>

          <button
            className="ms-3 text-danger fs-3 bg-transparent border-0"
            onClick={() => showModal(vendors[i].id)}
          >
            <TiDeleteOutline />
          </button>
        </>
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
      fetchVendor(); // Refetch products after status change
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
      fetchVendor(); // Refetch products after deletion
    } catch (error) {
      toast.error("Error deleting product");
    }
  };


  
  return (
    <div>
      <h3 className="mb-4 title">Vendor List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
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

export default VendorList;
