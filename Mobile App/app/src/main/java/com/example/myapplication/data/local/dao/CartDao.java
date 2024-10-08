package com.example.myapplication.data.local.dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;
import androidx.room.Delete;
import com.example.myapplication.data.local.entities.CartItem;

import java.util.List;

@Dao
public interface CartDao {

    @Insert
    void insertCartItem(CartItem cartItem);

    @Update
    void updateCartItem(CartItem cartItem);

    @Delete
    void deleteCartItem(CartItem cartItem);

    @Query("DELETE FROM cart_items")
    void clearCart();

    @Query("SELECT * FROM cart_items")
    LiveData<List<CartItem>> getAllCartItems();

    @Query("SELECT SUM(productPrice * quantity) FROM cart_items")
    LiveData<Double> getTotalPrice();
}
