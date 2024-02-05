import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CASHBACKBACKDATA, CREATEQRCODE, DASHBOARDDATA, DOWNLOADPDF, GETQRCODE, QRCODETAGS, REPORTDATA, STOREFEEDBACKDATA } from "../Api/ApiInstances";
import toast from "react-hot-toast";

//AsyncThunk For cretae QR code 
export const createQRcode = createAsyncThunk("/qrcode/create", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const result = await CREATEQRCODE(data);
        if (result?.data) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/taglist`);
            toast.success("Tag added successfully..!!", {
                duration: 3000,
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
        return rejectWithValue(err.response.data);
    }
});

//AsyncThunk For get QRcode tags
export const getQRcodeTags = createAsyncThunk("/qrcode/tags", async (payload, { rejectWithValue }) => {
    try {
        const result = await QRCODETAGS();
        return result?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// AsyncThunk For get QRcode
export const getQRcode = createAsyncThunk("/qrcode/get/", async ({ flag, page, pageSize }, { rejectWithValue }) => {
    try {
        const result = await GETQRCODE(flag, page, pageSize);
        return result?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// AsyncThunk For downloadPdf
export const downloadPdf = createAsyncThunk('/qrcode/pdf/', async ({ flag }, { rejectWithValue }) => {
    try {
        const response = await DOWNLOADPDF(flag);
        if (response?.statusText === "OK") {
            toast.success(response?.data?.message, {
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
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
});

// AsyncThunk For store feedback data
export const storeFeedbackData = createAsyncThunk('/sl/sm/', async ({ data, navigate, uuid }, { rejectWithValue }) => {
    try {
        const response = await STOREFEEDBACKDATA(data, uuid);
        if (response?.data?.data?.data !== "expired" && response?.data?.data?.flag !== false) {
            if (response?.data?.data?.is_lucky) {
                navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/congrats/${response?.data?.data?.uuid}`);
            } else {
                navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/participation/thankyou`);
            }
        } else {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/expired`);
        }
        return response?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// AsyncThunk For cashback data
export const getCashback = createAsyncThunk('/sl/sm/cashback/form', async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const response = await CASHBACKBACKDATA(data);
        if (response?.data?.data?.data === "thankyou" && response?.data?.data?.flag === true) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/thankyou`);
        }
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// AsyncThunk For get dashboard data
export const getDashboardData = createAsyncThunk("/dashboard/data", async (payload, { rejectWithValue }) => {
    try {
        const result = await DASHBOARDDATA();
        return result?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// AsyncThunk For get report data
export const getReportData = createAsyncThunk("/report/data", async (payload, { rejectWithValue }) => {
    try {
        const result = await REPORTDATA();
        return result?.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});





const UtilitySlice = createSlice({
    name: "UtilitySlice",
    initialState: {
        dashboardData: null,
        reportData: null,
        QRdata: null,
        data: null,
        feedbackData: null,
        QRloading: false,
        loading: false,
        downloadPdfData: null,
        isDownloading: false,
        downloadError: null,
        error: null,
    },
    reducers: {
        clearData: (state) => {
            state.QRdata = null;
        },
        clearFeedbackData: (state) => {
            state.feedbackData = null;
        },
        setDownloading: (state, { payload }) => {
            state.isDownloading = payload;
        },
        setDownloadError: (state, { payload }) => {
            state.downloadError = payload;
        },
    },
    extraReducers: (builder) => {
        //States for createQRcode
        builder.addCase(createQRcode.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.QRloading = true;
        });
        builder.addCase(createQRcode.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.QRloading = false;
            state.QRdata = payload;
        });
        builder.addCase(createQRcode.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.QRloading = false;
            state.error = payload;
        });

        //States for getQRcodeTags
        builder.addCase(getQRcodeTags.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        });
        builder.addCase(getQRcodeTags.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.data = payload;
        });
        builder.addCase(getQRcodeTags.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        });

        //States for getQRcode
        builder.addCase(getQRcode.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.QRloading = true;
        });
        builder.addCase(getQRcode.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.QRloading = false;
            state.QRdata = payload;
        });
        builder.addCase(getQRcode.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.QRloading = false;
            state.error = payload;
        });

        //States for downloadPdf
        builder.addCase(downloadPdf.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(downloadPdf.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.downloadPdfData = payload;
        })
        builder.addCase(downloadPdf.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        });

        //States for storeFeedbackData
        builder.addCase(storeFeedbackData.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(storeFeedbackData.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.feedbackData = payload;
        })
        builder.addCase(storeFeedbackData.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        });

        //States for getDashboardData
        builder.addCase(getDashboardData.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(getDashboardData.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.dashboardData = payload?.data;
        })
        builder.addCase(getDashboardData.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        });

        //States for getReportData
        builder.addCase(getReportData.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(getReportData.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.reportData = payload?.data;
        })
        builder.addCase(getReportData.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        });
    }
})

export const { clearData, setDownloading, setDownloadError, clearFeedbackData } = UtilitySlice.actions;
export default UtilitySlice.reducer;