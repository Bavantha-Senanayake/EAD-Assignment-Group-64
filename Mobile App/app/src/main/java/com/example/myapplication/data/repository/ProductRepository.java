package com.example.myapplication.data.repository;

import android.util.Log;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.data.model.Product;
import com.example.myapplication.data.remote.RetrofitClient;
import com.example.myapplication.data.remote.api.ProductService;

import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProductRepository {

    private static final String TAG = "ProductRepository";  // Tag for logging
    private ProductService productService;

    public ProductRepository() {
        productService = RetrofitClient.getClient().create(ProductService.class);
    }

    // Fetch all products from the API
    public LiveData<List<Product>> getAllProducts() {
        MutableLiveData<List<Product>> productsLiveData = new MutableLiveData<>();
        Log.d(TAG, "Starting getAllProducts API call...");

        productService.getAllProducts().enqueue(new Callback<List<Product>>() {
            @Override
            public void onResponse(Call<List<Product>> call, Response<List<Product>> response) {
                // Log the URL being called
                Log.d(TAG, "Request URL: " + call.request().url().toString());

                if (response.isSuccessful()) {
                    Log.d(TAG, "Response Code: " + response.code());
                    Log.d(TAG, "Response Message: " + response.message());

                    if (response.body() != null) {
                        productsLiveData.setValue(response.body());
                        Log.d(TAG, "Received Product Data: " + response.body().toString());
                    } else {
                        Log.e(TAG, "Response body is null. Status Code: " + response.code());
                    }
                } else {
                    Log.e(TAG, "API Response failed. Error Code: " + response.code());
                    Log.e(TAG, "Error Message: " + response.message());
                    try {
                        if (response.errorBody() != null) {
                            Log.e(TAG, "Error Body: " + response.errorBody().string());
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to parse error body", e);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Product>> call, Throwable t) {
                Log.e(TAG, "Network call failed: " + t.getMessage(), t);
                productsLiveData.setValue(null);  // Handle error
            }
        });

        return productsLiveData;
    }

    // Search for products by query
    public LiveData<List<Product>> searchProducts(String query) {
        MutableLiveData<List<Product>> searchResultsLiveData = new MutableLiveData<>();
        Log.d(TAG, "Starting searchProducts API call... Query: " + query);

        productService.searchProducts(query).enqueue(new Callback<List<Product>>() {
            @Override
            public void onResponse(Call<List<Product>> call, Response<List<Product>> response) {
                // Log the URL being called
                Log.d(TAG, "Request URL: " + call.request().url().toString());

                if (response.isSuccessful()) {
                    Log.d(TAG, "Response Code: " + response.code());
                    Log.d(TAG, "Response Message: " + response.message());

                    if (response.body() != null) {
                        searchResultsLiveData.setValue(response.body());
                        Log.d(TAG, "Search Results: " + response.body().toString());
                    } else {
                        Log.e(TAG, "Response body is null. Status Code: " + response.code());
                    }
                } else {
                    Log.e(TAG, "API Response failed. Error Code: " + response.code());
                    Log.e(TAG, "Error Message: " + response.message());
                    try {
                        if (response.errorBody() != null) {
                            Log.e(TAG, "Error Body: " + response.errorBody().string());
                        }
                    } catch (Exception e) {
                        Log.e(TAG, "Failed to parse error body", e);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Product>> call, Throwable t) {
                Log.e(TAG, "Network call failed: " + t.getMessage(), t);
                searchResultsLiveData.setValue(null);  // Handle error
            }
        });

        return searchResultsLiveData;
    }

    // New method to fetch product by ID
    public LiveData<Product> getProductById(String productId) {
        MutableLiveData<Product> productLiveData = new MutableLiveData<>();

        productService.getProductById(productId).enqueue(new Callback<Product>() {
            @Override
            public void onResponse(Call<Product> call, Response<Product> response) {
                if (response.isSuccessful() && response.body() != null) {
                    productLiveData.setValue(response.body());
                }
            }

            @Override
            public void onFailure(Call<Product> call, Throwable t) {
                productLiveData.setValue(null);  // Handle error
            }
        });

        return productLiveData;
    }
}
