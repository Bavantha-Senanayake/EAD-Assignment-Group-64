package com.example.myapplication.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.example.myapplication.data.local.dao.CartDao;
import com.example.myapplication.data.local.database.CartDatabase;
import com.example.myapplication.data.local.entities.CartItem;

import java.util.List;

public class CartRepository {
    private CartDao cartDao;
    private LiveData<List<CartItem>> allCartItems;
    private LiveData<Double> totalPrice;

    public CartRepository(Application application) {
        CartDatabase db = CartDatabase.getDatabase(application);
        cartDao = db.cartDao();
        allCartItems = cartDao.getAllCartItems();
        totalPrice = cartDao.getTotalPrice();
    }

    public LiveData<List<CartItem>> getAllCartItems() {
        return allCartItems;
    }

    public LiveData<Double> getTotalPrice() {
        return totalPrice;
    }

    public void insertCartItem(CartItem cartItem) {
        new Thread(() -> cartDao.insertCartItem(cartItem)).start();
    }

    public void updateCartItem(CartItem cartItem) {
        new Thread(() -> cartDao.updateCartItem(cartItem)).start();
    }

    public void deleteCartItem(CartItem cartItem) {
        new Thread(() -> cartDao.deleteCartItem(cartItem)).start();
    }

    public void clearCart() {
        new Thread(() -> cartDao.clearCart()).start();
    }
}
