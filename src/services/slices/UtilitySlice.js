import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATEQRCODE, DOWNLOADPDF, GETQRCODE, QRCODETAGS } from "../Api/ApiInstances";
import toast from "react-hot-toast";

//AsyncThunk For cretae QR code 
export const createQRcode = createAsyncThunk("/qrcode/create", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const result = await CREATEQRCODE(data);
        if (result?.data) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/taglist`);
            toast.success("Tag added successfully..!!", {
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
        const response = await DOWNLOADPDF(flag)
        if (response.statusText === "OK") {
            return response.data;
        } else {
            const error = await response.text();
            throw new Error(`Download failed: ${error}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
});





const UtilitySlice = createSlice({
    name: "UtilitySlice",
    initialState: {
        QRdata: null,
        data: null,
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
            state.loading = true;
        });
        builder.addCase(getQRcode.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.QRdata = payload;
        });
        builder.addCase(getQRcode.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
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
    }
})

export const { clearData, setDownloading, setDownloadError } = UtilitySlice.actions;
export default UtilitySlice.reducer;