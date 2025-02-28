import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import DataSlice from "./DataSlice"; // ✅ Make sure the default export is the reducer

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
    blacklist: ["_persist"],
    // transforms: [
    //     encryptTransform({
    //       secretKey: 'my-super-secret-key',
    //       onError: function (error) {
    //         // Handle the error.
    //       },
    //     }),
    //   ],
   
};

// ✅ Ensure that `persistReducer` receives a valid reducer function
const persistedReducer = persistReducer(persistConfig, DataSlice);

// ✅ Configure the store
export const store = configureStore({
    reducer: {
        DataForm: persistedReducer, // persistedReducer wraps DataSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

// ✅ Persistor for the store
export const persistor = persistStore(store);

export default store;
