import * as Yup from 'yup';

// create QR tag validation
export const createQRtagSchema = Yup.object({
    tag: Yup.string().required("Please Enter a Tag Name."),
    count: Yup.number()
        .typeError("Please enter a valid number for Total QR Count.")
        .required("Please Mention Total QR Count."),
    cashback_lucky_users: Yup.number()
        .typeError("Please enter a valid number for Lucky User Count.")
        .required("Please Mention Lucky User Count."),
    cashback_amount: Yup.number()
        .typeError("Please enter a valid number for Cashback Amount.")
        .required("Please Mention Cashback Amount"),
});

// login validation
export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().required('Password is required'),
});

// sign up validation
export const signUpValidationSchema = Yup.object({
    full_name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    conf_password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], "Password & Confirm Password Not Matched."),
});

// feedback form validation
export const feedbackFormValidationSchema = Yup.object({
    full_name: Yup.string().required("Your Name is required"),
    // upi_id: Yup.string()
    //     .matches(/@/, 'Invalid UPI ID')
    //     .required("Please enter a valid UPI ID"),
    mobile_number: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile Number must have exactly 10 digits')
        .required("Mobile Number is required"),
    Recent_Purchases: Yup.string().required("Please Select One"),
    Purchase_Location: Yup.string().required("Please Select One"),
    Purchase_Price: Yup.string().required("Please Select One"),
    Quality_Rating: Yup.string().required("Please Select One"),
    Future_Purchases: Yup.string().required("Please Select One"),
});

// cash back form validation
export const cashBackFormValidationSchema = Yup.object().shape({
    upi_id: Yup.string()
        .matches(/@/, 'Invalid UPI ID'),
    account_number: Yup.string(),
    ifsc_code: Yup.string(),
});
