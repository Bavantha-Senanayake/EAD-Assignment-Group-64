package com.example.myapplication.ui.cart;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.data.local.entities.CartItem;

import java.util.List;

public class CartAdapter extends RecyclerView.Adapter<CartAdapter.CartViewHolder> {

    private List<CartItem> cartItemList;
    private OnCartItemClickListener listener;

    public CartAdapter(List<CartItem> cartItemList, OnCartItemClickListener listener) {
        this.cartItemList = cartItemList;
        this.listener = listener;
    }

    public void setCartItems(List<CartItem> cartItemList) {
        this.cartItemList = cartItemList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CartViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.view_holder_cart, parent, false);
        return new CartViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CartViewHolder holder, int position) {
        CartItem item = cartItemList.get(position);
        holder.bind(item);
    }

    @Override
    public int getItemCount() {
        return cartItemList == null ? 0 : cartItemList.size();
    }

    class CartViewHolder extends RecyclerView.ViewHolder {
        private TextView productName, productPrice, productQuantity;
        private ImageView productImage;
        private ImageView deleteIcon;

        private TextView plus,minus,totalEach;


        public CartViewHolder(@NonNull View itemView) {
            super(itemView);
            productName = itemView.findViewById(R.id.productNamecart);
            productPrice = itemView.findViewById(R.id.productitempricecart);
            productQuantity = itemView.findViewById(R.id.quantitycartitem);
            deleteIcon = itemView.findViewById(R.id.cartdeleteic);
            plus = itemView.findViewById(R.id.textView25);
            minus = itemView.findViewById(R.id.textView29);
            totalEach = itemView.findViewById(R.id.textView22);
            productImage = itemView.findViewById(R.id.imageView3);

            plus.setOnClickListener(view -> listener.onQuantityChange(cartItemList.get(getAdapterPosition()), 1));
            minus.setOnClickListener(view -> listener.onQuantityChange(cartItemList.get(getAdapterPosition()), -1));

            deleteIcon.setOnClickListener(view -> listener.onDeleteCartItem(cartItemList.get(getAdapterPosition())));
        }

        public void bind(CartItem item) {
            productName.setText(item.getProductName());
            productPrice.setText("Rs " + item.getProductPrice());
            productQuantity.setText(" " + item.getQuantity());
            totalEach.setText(""+item.getTotalAmount());
            // Load image using Glide
            Glide.with(itemView.getContext())
                    .load(item.getImageUrl())
                    .into(productImage);
        }
    }

    public interface OnCartItemClickListener {
        void onDeleteCartItem(CartItem cartItem);
        void onQuantityChange(CartItem cartItem, int change);

    }
}
