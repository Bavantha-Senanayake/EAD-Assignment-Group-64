package com.example.myapplication.ui.main;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.data.local.entities.CartItem;
import com.example.myapplication.data.model.Product;
import com.example.myapplication.ui.product.ProductDetailsActivity;
import com.example.myapplication.ui.viewmodel.CartViewModel;

import java.util.List;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ProductViewHolder> {

    private List<Product> productList;
    private CartViewModel cartViewModel;  // CartViewModel reference
    private Context context;

    // Constructor for setting the product list and CartViewModel
    public ProductAdapter(Context context, List<Product> productList, CartViewModel cartViewModel) {
        this.context = context;
        this.productList = productList;
        this.cartViewModel = cartViewModel;
    }

    // Update the product list in the adapter
    public void setProducts(List<Product> productList) {
        this.productList = productList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ProductViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.viewholder_pop_list, parent, false);
        return new ProductViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) {
        Product product = productList.get(position);
        holder.bind(product);
        // Set click listener for the item
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, ProductDetailsActivity.class);
            intent.putExtra("product_id", product.getId());
            System.out.println("ddddd"+product.getId());// Pass product ID
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return productList == null ? 0 : productList.size();
    }

    // ViewHolder class for binding the views
    public class ProductViewHolder extends RecyclerView.ViewHolder {
        private TextView productName;
        private TextView productPrice;
        private ImageView productImage;
        private ImageView btnAddToCart;

        public ProductViewHolder(@NonNull View itemView) {
            super(itemView);
            productName = itemView.findViewById(R.id.productTitleText);
            productPrice = itemView.findViewById(R.id.feeText);
            productImage = itemView.findViewById(R.id.pic);
            btnAddToCart = itemView.findViewById(R.id.cartIcon);

            // Handle "Add to Cart" button click
            btnAddToCart.setOnClickListener(v -> {
                int position = getAdapterPosition();
                if (position != RecyclerView.NO_POSITION) {
                    Product product = productList.get(position);
                    addToCart(product);
                    Toast.makeText(itemView.getContext(), product.getName() + " added to cart", Toast.LENGTH_SHORT).show();
                }
            });
        }

        public void bind(Product product) {
            productName.setText(product.getName());
            productPrice.setText("Rs " + product.getPrice());

            // Use Glide to load images from URL
            Glide.with(itemView.getContext())
                    .load(product.getImageUrl())
                    .into(productImage);
        }

        // Method to add product to cart using CartViewModel
        private void addToCart(Product product) {
            CartItem cartItem = new CartItem();
            cartItem.setProductId(product.getId());
            cartItem.setProductName(product.getName());
            cartItem.setQuantity(1); // Default quantity for demo purposes
            cartItem.setProductPrice(product.getPrice());
            cartItem.setImageUrl(product.getImageUrl());

            // Insert item into the cart using ViewModel
            cartViewModel.insert(cartItem);
        }
    }
}
