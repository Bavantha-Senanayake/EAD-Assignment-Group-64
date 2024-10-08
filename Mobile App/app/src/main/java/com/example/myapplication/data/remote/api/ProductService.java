package com.example.myapplication.data.remote.api;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

import com.example.myapplication.data.model.Product;

public interface ProductService {

    // Fetch all products from the server
    @GET("Product/All")
    Call<List<Product>> getAllProducts();


    @GET("Product/{id}")  // New endpoint for fetching a product by ID
    Call<Product> getProductById(@Path("id") String productId);

    // Search products by query (e.g., search by product name or category)
    @GET("api/products/search")
    Call<List<Product>> searchProducts(@Query("query") String query);
}
