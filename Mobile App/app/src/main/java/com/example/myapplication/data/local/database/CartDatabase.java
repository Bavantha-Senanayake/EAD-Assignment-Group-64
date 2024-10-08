package com.example.myapplication.data.local.database;

import android.content.Context;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import com.example.myapplication.data.local.dao.CartDao;
import com.example.myapplication.data.local.entities.CartItem;

@Database(entities = {CartItem.class}, version = 4, exportSchema = false)
public abstract class CartDatabase extends RoomDatabase {

    public abstract CartDao cartDao();

    private static volatile CartDatabase INSTANCE;

    public static CartDatabase getDatabase(final Context context) {
        if (INSTANCE == null) {
            synchronized (CartDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                                    CartDatabase.class, "cart_database")
                            // Add migration logic or fallback strategy
                            .fallbackToDestructiveMigration()  // This will reset the database, avoid this if you want to keep data.
                            .build();
                }
            }
        }
        return INSTANCE;
    }
}
