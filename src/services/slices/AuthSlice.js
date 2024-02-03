import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN, REGISTRATION } from "../Api/ApiInstances";
import { EncryptData } from "../../helper/EncryptDcrypt ";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

//AsyncThunk For Login 
export const UserLogin = createAsyncThunk("/auth/admin/login", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const result = await LOGIN(data);
        if (result?.data?.success) {
            if (result?.data?.data?.rememberme === true) {
                Cookies.set('user', JSON.stringify(data));
            } else {
                Cookies.remove("user")
            }
            const user = EncryptData(JSON.stringify(result?.data?.data));

            window.localStorage.setItem("token", JSON.stringify(result?.data?.token));
            window.localStorage.setItem("user", user);

            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`);

            toast.success(result?.data?.message, {
                duration: 2000,
                style: {
                    background: "black",
                    color: "white",
                },
                iconTheme: {
                    primary: '#FFF',
                    secondary: 'green',
                },
            });
        }
        return result?.data;
    } catch (err) {
        if (!err?.response?.data?.success) {
            toast.error(err?.response?.data?.message, {
                duration: 4000,
                style: {
                    background: "black",
                    color: "white",
                },
                iconTheme: {
                    primary: '#FFF',
                    secondary: 'red',
                },
            });
        }
        return rejectWithValue(err.response.data);
    }

});

//AsyncThunk For Signup 
export const UserSignup = createAsyncThunk("/auth/admin/registration", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const result = await REGISTRATION(data);
        if (result?.data?.success) {
            const user = EncryptData(JSON.stringify(result?.data?.data));

            window.localStorage.setItem("token", JSON.stringify(result?.data?.token));
            window.localStorage.setItem("user", user);

            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`);

            toast.success(result?.data?.message, {
                duration: 2000,
                style: {
                    background: "black",
                    color: "white",
                },
                iconTheme: {
                    primary: '#FFF',
                    secondary: 'green',
                },
            });
        }
        return result?.data;
    } catch (err) {
        if (!err?.response?.data?.success) {
            toast.error(err?.response?.data?.message, {
                duration: 4000,
                style: {
                    background: "black",
                    color: "white",
                },
                iconTheme: {
                    primary: '#FFF',
                    secondary: 'red',
                },
            });
        }
        return rejectWithValue(err.response.data);
    }

});

// Creating Slice
const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: {
        user: null,
        token: "",
        status: "",
        error: null,
        loading: false
    },
    reducers: {
        // Logout reducer
        doLogOut: (state) => {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
            state.user = null;
            state.token = "";
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        //States for UserLogin
        builder.addCase(UserLogin.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(UserLogin.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.user = payload?.data?.data;
            state.token = payload?.data?.token;
        })
        builder.addCase(UserLogin.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        })

        //States for UserSignup
        builder.addCase(UserSignup.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(UserSignup.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.user = payload?.data?.data;
            state.token = payload?.data?.token;
        })
        builder.addCase(UserSignup.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        })
    }
})

export const { doLogOut, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;