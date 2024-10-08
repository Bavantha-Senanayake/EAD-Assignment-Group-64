package com.example.myapplication.ui.product;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.data.local.entities.CartItem;
import com.example.myapplication.data.model.Product;
import com.example.myapplication.ui.viewmodel.CartViewModel;
import com.example.myapplication.ui.viewmodel.ProductViewModel;

public class ProductDetailsActivity extends AppCompatActivity {

    private ProductViewModel productViewModel;
    private CartViewModel cartViewModel;
    private ImageView imgProductImage;
    private TextView tvProductName, tvProductPrice, tvDescription;
    private Button addToCartButton;

    private Product currentProduct; // Store the currently loaded product

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.product_details);

        imgProductImage = findViewById(R.id.productImg);
        tvProductName = findViewById(R.id.productTtitleText);
        tvProductPrice = findViewById(R.id.priceText);
        tvDescription = findViewById(R.id.prodcutDescriptionText);
        addToCartButton = findViewById(R.id.buyNowBtn);

        String productId = getIntent().getStringExtra("product_id");

        productViewModel = new ViewModelProvider(this).get(ProductViewModel.class);
        cartViewModel = new ViewModelProvider(this).get(CartViewModel.class);

        productViewModel.getProductById(productId).observe(this, product -> {
            if (product != null) {
                currentProduct = product; // Save the loaded product
                showProductDetails(product);
            } else {
                Toast.makeText(this, "Failed to load product details", Toast.LENGTH_SHORT).show();
            }
        });

        // Handle Add to Cart button click
        addToCartButton.setOnClickListener(v -> {
            if (currentProduct != null) {
                CartItem cartItem = new CartItem();
                cartItem.setProductId(currentProduct.getId());
                cartItem.setProductName(currentProduct.getName());
                cartItem.setProductPrice(currentProduct.getPrice());
                cartItem.setQuantity(1); // Default quantity is 1
                cartItem.setImageUrl(currentProduct.getImageUrl());

                cartViewModel.insert(cartItem);
                Toast.makeText(this, "Added to Cart", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showProductDetails(Product product) {
        tvProductName.setText(product.getName());
        tvProductPrice.setText("Rs" + product.getPrice());
        tvDescription.setText(product.getDescription());
        Glide.with(this).load(product.getImageUrl()).into(imgProductImage);
    }
}
