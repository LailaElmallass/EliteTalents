import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ajouter un utilisateur
export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/users", newUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || error.response.data);
    }
  }
);

// Modifier un utilisateur
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8000/users/${updatedUser.id}`, updatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || error.response.data);
    }
  }
);

// Supprimer un utilisateur
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || error.response.data);
    }
  }
);

// Récupérer la liste des utilisateurs
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
