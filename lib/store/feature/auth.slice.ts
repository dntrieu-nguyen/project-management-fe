"use client";

import { encryptData, removeAuth, removeItems, setItems } from "@/utils/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { login, logout } from "@/apis/auth";
import { ILogout } from "@/types/auth";
import { message } from "antd";
export interface AuthState {
  isLogin: boolean;
  currentUser: any;
  loading: boolean;
  err: string | null;
  isAdmin: boolean;
  isRemember: boolean;
  savedUser: any;
}
// Login google
export const loginUser = createAsyncThunk("auth/login", async (data: any, thunkAPI) => {
  try {
    const res: any = await login(data);
    if (res.success) {
      return res.data;
    }
    return res.data;
  } catch (error: any) {
    const errorMsg: string[] = [];

    if (error?.data && typeof error.data === "object") {
      const keyErrors = Object.keys(error.data);

      keyErrors.forEach((key) => {
        if (error.data[key]) {
          errorMsg.push(`${key}: ${error.data[key]}`);
        }
      });
    } else if (error?.message) {
      errorMsg.push(error.message);
    } else {
      errorMsg.push("An unknown error occurred.");
    }

    return thunkAPI.rejectWithValue({ message: errorMsg.join(", "), rawError: error });
  }
});
// Logout
export const logOut = createAsyncThunk("auth/logout", async (data: ILogout, thunkAPI) => {
  try {
    const response = await logout(data);
    return response;
  } catch (error) {
    return error instanceof Error ? thunkAPI.rejectWithValue(error.message) : thunkAPI.rejectWithValue("Logout error");
  }
});

const initialState: AuthState = {
  isLogin: false,
  currentUser: null,
  loading: false,
  err: null,
  isAdmin: false,
  isRemember: true,
  savedUser: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.isLogin = true;
      state.currentUser = action.payload;
      if (action?.payload?.is_staff) {
        state.isAdmin = true;
      }
      if (!action.payload) {
        state.isLogin = false;
        state.isAdmin = false;
        state.currentUser = null;
      }
    },

    toggleRemember: (state, action: PayloadAction<any>) => {
      state.isRemember = !state.isRemember;
    },

    register: () => {},

    updateSavedUser: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.savedUser = action.payload.savedUser;
      }

      if (!action.payload) {
        state.savedUser = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Email
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLogin = true;
        state.loading = false;

        const hashUser = encryptData({
          user: action.payload.data,
          isRemember: state.isRemember,
          isLogin: true,
          isAdmin: state.isAdmin,
        });

        if (action.payload && hashUser) {
          state.currentUser = hashUser;
          setItems("accessToken", action.payload.access_token);
          setItems("currentUser", hashUser);
          Cookies.set("user", hashUser, {
            expires: 60 * 60 * 24 * 30,
          });
          Cookies.set("refreshToken", action.payload.refresh_token, {
            expires: 60 * 60 * 24 * 30,
          });
        }

        // check remember user:

        if (state.isRemember) {
          setItems("savedUser", {
            savedUser: {
              email: action.payload.email,
              password: action.payload.password,
            },
            isRemember: state.isRemember,
          });
          state.savedUser = {
            ...state.savedUser,
            email: action.payload.data.email,
            password: action.payload.data.password,
          };
        }

        if (!state.isRemember) {
          removeItems("savedUser");
          state.savedUser = null;
        }
        message.success({
          content: "login successfully",
        });

        window.location.href = "/dashboard";
      })

      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.err = action.payload ? (action.payload as any).message : "Login failed";
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      // Logout
      .addCase(logOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLogin = false;
        state.loading = false;
        state.currentUser = null;
        removeAuth();
        if (typeof window !== "undefined") window.location.href = "/login";
      })

      .addCase(logOut.rejected, (state, action: PayloadAction<any>) => {
        state.err = action.payload;
        state.loading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { updateUser, register, toggleRemember, updateSavedUser } = AuthSlice.actions;
export default AuthSlice.reducer;
