import { configureStore, createSlice } from "@reduxjs/toolkit";

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("userId", "someUserId"); // Set userId during login
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

// Admin slice
const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("adminId", "someAdminId"); // Set adminId during login
      localStorage.setItem("token", "someToken"); // Set token during login
    },
    logout(state) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

// Export actions
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});
