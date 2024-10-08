package com.example.myapplication.data.local.entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "cart_items")
public class CartItem {

    @PrimaryKey(autoGenerate = true)
    private int id;
    private String productId;
    private String productName;
    private int quantity;
    private int vendorId;
    private int vendorName;
    private int fulfillmentStatus;
    private  double totalAmount;

    private double totalAmountFullOrder;

    private double productPrice;
    private String imageUrl;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    public int getVendorName() {
        return vendorName;
    }

    public void setVendorName(int vendorName) {
        this.vendorName = vendorName;
    }

    public int getFulfillmentStatus() {
        return fulfillmentStatus;
    }

    public void setFulfillmentStatus(int fulfillmentStatus) {
        this.fulfillmentStatus = fulfillmentStatus;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTotalAmountFullOrder() {
        return totalAmountFullOrder;
    }

    public void setTotalAmountFullOrder(double totalAmountFullOrder) {
        this.totalAmountFullOrder = totalAmountFullOrder;
    }
}
