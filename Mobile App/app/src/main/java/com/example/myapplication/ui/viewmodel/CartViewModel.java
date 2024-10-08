package com.example.myapplication.ui.viewmodel;

import android.app.Application;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import com.example.myapplication.data.local.entities.CartItem;
import com.example.myapplication.data.repository.CartRepository;

import java.util.List;

public class CartViewModel extends AndroidViewModel {
    private CartRepository repository;
    private LiveData<List<CartItem>> allCartItems;
    private LiveData<Double> totalPrice;

    public CartViewModel(Application application) {
        super(application);
        repository = new CartRepository(application);
        allCartItems = repository.getAllCartItems();
        totalPrice = repository.getTotalPrice();
    }

    public LiveData<List<CartItem>> getAllCartItems() {
        return allCartItems;
    }

    public LiveData<Double> getTotalPrice() {
        return totalPrice;
    }

    public void insert(CartItem cartItem) {
        repository.insertCartItem(cartItem);
    }

    public void update(CartItem cartItem) {
        repository.updateCartItem(cartItem);
    }

    public void delete(CartItem cartItem) {
        repository.deleteCartItem(cartItem);
    }

    public void clearCart() {
        repository.clearCart();
    }
}
