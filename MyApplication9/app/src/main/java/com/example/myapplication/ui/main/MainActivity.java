package com.example.myapplication.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.R;
import com.example.myapplication.ui.cart.CartActivity;
import com.example.myapplication.ui.viewmodel.CartViewModel;
import com.example.myapplication.ui.viewmodel.ProductViewModel;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private ProductViewModel productViewModel;
    private CartViewModel cartViewModel;  // Add CartViewModel for cart operations
    private ProductAdapter productAdapter;
    private LinearLayout myOrdersLayout;
    private LinearLayout wishlistLayout;
    private LinearLayout cartLayout;
    private LinearLayout profileLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Initialize the bottom app bar LinearLayouts
        myOrdersLayout = findViewById(R.id.orderLayout);
        wishlistLayout = findViewById(R.id.wishlistlayout);
        cartLayout = findViewById(R.id.cartlayout);
        profileLayout = findViewById(R.id.profilelayout);

        // Set click listeners for each LinearLayout
        myOrdersLayout.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, MainActivity.class);
            startActivity(intent);
        });

//        wishlistLayout.setOnClickListener(v -> {
//            Intent intent = new Intent(MainActivity.this, WishlistActivity.class);
//            startActivity(intent);
//        });

        cartLayout.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, CartActivity.class);
            startActivity(intent);
        });

//        profileLayout.setOnClickListener(v -> {
//            Intent intent = new Intent(MainActivity.this, ProfileActivity.class);
//            startActivity(intent);
//        });
        // Initialize RecyclerView and set up with GridLayoutManager for 2 items per row
        RecyclerView recyclerView = findViewById(R.id.popularView);
        GridLayoutManager gridLayoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(gridLayoutManager);

        // Initialize the CartViewModel
        cartViewModel = new ViewModelProvider(this).get(CartViewModel.class);

        // Initialize the ProductAdapter and pass the CartViewModel
        productAdapter = new ProductAdapter(this, new ArrayList<>(), cartViewModel);
        recyclerView.setAdapter(productAdapter);

        // Initialize ProductViewModel
        productViewModel = new ViewModelProvider(this).get(ProductViewModel.class);

        // Observe product data from ProductViewModel
        productViewModel.getAllProducts().observe(this, products -> {
            if (products != null) {
                productAdapter.setProducts(products);  // Update adapter with new data
            } else {
                Toast.makeText(MainActivity.this, "Failed to load products", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
