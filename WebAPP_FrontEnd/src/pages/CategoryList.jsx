import React, { useEffect, useState } from "react";
import { Table,Switch } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import CustomModal from "../components/CustomModal";
import axios from "axios";

// Retrieve the token from localStorage
const getTokenFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData).token : null;
};

const columns = [
  {
    title: "Number",
    dataIndex: "key",
  },
  {
    title: "Category Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Active",
    dataIndex: "isActive",
    render: (isActive, record) => (
      <Switch
        checked={isActive}
        
      />
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [productCategoryId, setProductCategoryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setProductCategoryId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NzAyYzI1ZGM4MjY1YzEzODJlNjhmZDEiLCJlbWFpbCI6ImJkc21AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwMjcyMjI2MDg4Iiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3MjgyNzkwNzksImV4cCI6MTcyODg4Mzg3OSwiaWF0IjoxNzI4Mjc5MDc5fQ.Fzl0D4Rg3KgslPTWCP9DadT_cpRhoxx18Kk0fQR0I38';
        const response = await axios.get("http://localhost:5272/api/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Delete category
  const deleteProdCategory = async (id) => {
    try {
      const token = getTokenFromLocalStorage();
      await axios.delete(`http://localhost:8000/api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category._id !== id));
      setOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const data = categories.map((category, index) => ({
    key: index + 1,
    title: category.name,
    action: (
      <>
        <Link to={`/admin/category/${category._id}`} className="text-success fs-3">
          <BiEdit />
        </Link>

        <button
          className="ms-3 text-danger fs-3 bg-transparent border-0"
          onClick={() => showModal(category._id)}
        >
          <TiDeleteOutline />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProdCategory(productCategoryId)}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryList;
