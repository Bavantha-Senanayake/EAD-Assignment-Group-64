import React, { useEffect, useState } from "react";
import { Table,Switch } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { toast } from "react-toastify";


const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzAyNTQxNTgzNjk3OTI4NWMxMTc4MWQiLCJlbWFpbCI6ImJhdmFudGhhQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDI3MjIyNjA4OCIsInJvbGUiOiJWZW5kb3IiLCJuYmYiOjE3MjgyOTYwMzIsImV4cCI6MTcyODkwMDgzMiwiaWF0IjoxNzI4Mjk2MDMyfQ.AU37ne7_VrNfhuJ6nZI14Qp9rXpfP6D7SP2HQXn5wp0'; // Replace this with your actual token


const ProductList = () => {
  const columns = [
    {
      title: "Number",
      dataIndex: "key",
    },
    {
      title: "Product Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },

    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => toggleProductStatus(record.id, !isActive)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [products, setProducts] = useState([]);

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
    fetchProducts();

  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5272/api/Product/Vendor",

        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            "Content-Type": "application/json",
            },
            }

      ); // Replace with actual product API
      setProducts(res.data);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };


  

 


  // Fetch all colors
  


  const data = [];
  for (let i = 0; i < products.length; i++) {
    data.push({
      key: i + 1,
      code: products[i].productId,
      name: products[i].name,
      category:products[i].name,
      stock: products[i].stock,
      price: products[i].price +".00",
      isActive: products[i].isActive, 
      id: products[i].id,
      action: (
        <>
          <Link
            to={`/admin/product/${products[i]._id}`}
            className="text-success fs-3"
          >
            <BiEdit />
          </Link>

          <button
            className="ms-3 text-danger fs-3 bg-transparent border-0"
            onClick={() => showModal(products[i].id)}
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
      fetchProducts(); // Refetch products after status change
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
      fetchProducts(); // Refetch products after deletion
    } catch (error) {
      toast.error("Error deleting product");
    }
  };


  
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProduct(productId);
        }}
        title="Are you sure you want to delete the Product?"
      />
    </div>
  );
};

export default ProductList;
