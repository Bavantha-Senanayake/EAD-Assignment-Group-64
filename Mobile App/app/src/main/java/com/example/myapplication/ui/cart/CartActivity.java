package com.example.myapplication.ui.cart;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.R;
import com.example.myapplication.data.local.entities.CartItem;
import com.example.myapplication.ui.viewmodel.CartViewModel;

import java.util.ArrayList;

public class CartActivity extends AppCompatActivity implements CartAdapter.OnCartItemClickListener {

    private CartViewModel cartViewModel;
    private CartAdapter cartAdapter;
    private TextView tvTotalPrice;
    private TextView beforetvTotalPrice;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cart);

        // Initialize UI components
        RecyclerView recyclerView = findViewById(R.id.recycleViewcart);
        tvTotalPrice = findViewById(R.id.textView20);
        beforetvTotalPrice = findViewById(R.id.textView18);


        //btnCheckout = findViewById(R.id.btnCheckout);

        // Setup RecyclerView
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        cartAdapter = new CartAdapter(new ArrayList<>(), this);
        recyclerView.setAdapter(cartAdapter);

        // Initialize ViewModel
        cartViewModel = new ViewModelProvider(this).get(CartViewModel.class);

        // Observe changes in the cart items
        cartViewModel.getAllCartItems().observe(this, cartItems -> {
            cartAdapter.setCartItems(cartItems);  // Update the adapter with the latest cart items
        });

       //Observe changes in the total price
        cartViewModel.getTotalPrice().observe(this, total -> {
            if (total != null) {
                tvTotalPrice.setText("Rs " + total);
                double beftotal= total-250;
                beforetvTotalPrice.setText(""+beftotal);
            } else {
                tvTotalPrice.setText("Rs: $0.00");
                double beftotal= total-250;
                beforetvTotalPrice.setText(""+beftotal);
            }
        });
        //out.setOnClickListener(view -> {
        //                    if (cartA Handle checkout button click
//        btnCheckdapter.getItemCount() > 0)  else {{
//            cartViewModel.clearCart();this,
//                    Toast.makeText("Checkout complete!", Toast.LENGTH_SHORT).show();
//            tvTotalPrice.setText("Total: $0.00");
//        }
//                Toashis, "No items in the cart", Toast.LENGTH_SHORT).show();
//            }t.makeText(t
//        });
    }

    // Handle item delete operation
    @Override
    public void onDeleteCartItem(CartItem cartItem) {
        cartViewModel.delete(cartItem);
        Toast.makeText(this, "Item removed from cart", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onQuantityChange(CartItem cartItem, int change) {
        int newQuantity = cartItem.getQuantity() + change;

        if (newQuantity > 0) {
            cartItem.setQuantity(newQuantity);
            cartViewModel.update(cartItem);
            double newTotalEach = cartItem.getProductPrice()*cartItem.getQuantity();
            cartItem.setTotalAmount(newTotalEach);
        }
    }
}
