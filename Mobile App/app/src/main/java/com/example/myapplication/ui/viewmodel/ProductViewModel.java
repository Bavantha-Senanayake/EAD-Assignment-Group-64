package com.example.myapplication.ui.viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;

import com.example.myapplication.data.model.Product;
import com.example.myapplication.data.repository.ProductRepository;

import java.util.List;

public class ProductViewModel extends ViewModel {

    private ProductRepository repository;

    public ProductViewModel() {
        repository = new ProductRepository();
    }

    public LiveData<List<Product>> getAllProducts() {

        return repository.getAllProducts();

    }
    public LiveData<Product> getProductById(String productId) {
        return repository.getProductById(productId);
    }

    public LiveData<List<Product>> searchProducts(String query) {
        return repository.searchProducts(query);
    }
}
