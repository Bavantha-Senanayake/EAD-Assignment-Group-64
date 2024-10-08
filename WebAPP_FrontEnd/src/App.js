import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";
import { PrivateRoutes } from "./routing/privateRoute";
import { OpenRoutes } from "./routing/openRoutes";
import AdminLayout from "./components/AdminLayout";
import AddVendor from "./pages/AddVendor";
import VendorList from "./pages/VendorList";
import VendorOrders from "./pages/VendorOrders";
import VendorOrderItem from "./pages/VendorOrderItem";
import MainOrderList from "./pages/MainOrderList";
import MainOrderItem from "./pages/MainOrderItem";
import VendorLayout from "./components/VendorLayout";
import CsrLayout from "./components/CsrLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnquiry />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="blog-category/:id" element={<AddBlogCategory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />
        </Route>

        <Route
          path="/administrator"
          element={
            <PrivateRoutes>
             <AdminLayout/>
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="category" element={<AddCategory />} />
          <Route path='vendor' element={<AddVendor/>}/>
          <Route path='vendor-list' element={<VendorList/>}/>
          <Route path='main-orders' element={<MainOrderList/>}/>
          <Route path="category-list" element={<CategoryList />} />
          <Route path='main-orders/:orderId' element={<MainOrderItem/>}/>
          




         
        </Route>

        <Route
          path="/vendor"
          element={
            <PrivateRoutes>
             <VendorLayout/>
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="category" element={<AddCategory />} />
          <Route path='vendor' element={<AddVendor/>}/>
          <Route path='vendor-list' element={<VendorList/>}/>
          <Route path='vendor-orders' element={<VendorOrders/>}/>
          <Route path='vendor-orders/:orderId' element={<VendorOrderItem/>}/>
          <Route path='main-orders' element={<MainOrderList/>}/>
          <Route path='main-orders/:orderId' element={<MainOrderItem/>}/>
          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />




         
        </Route>

        <Route
          path="/csr"
          element={
            <PrivateRoutes>
             <CsrLayout/>
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
        
          
          <Route path='main-orders' element={<MainOrderList/>}/>
          <Route path='main-orders/:orderId' element={<MainOrderItem/>}/>
          <Route path="customers" element={<Customers />} />
       




         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
