import * as Yup from 'yup';

export const createQRtagSchema = Yup.object({
    tag: Yup.string().required("Please Enter a Tag Name."),
    count: Yup.number().required("Please Mention Total QR Count."),
    cashback_lucky_users: Yup.number().required("Please Mention Lucky User Count."),
    cashback_amount: Yup.string().required("Please Mention Cashback Amount"),
})

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().required('Password is required'),
});

export const signUpValidationSchema = Yup.object({
    full_name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    conf_password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], "Password & Confirm Password Not Matched."),
});

export const feedbackFormValidationSchema = Yup.object({
    full_name: Yup.string().required("Your Name is required"),
    upi_id: Yup.string()
        .matches(/@/, 'Invalid UPI ID')
        .required("Please enter a valid UPI ID"),
    mobile_number: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile Number must have exactly 10 digits')
        .required("Mobile Number is required"),
});
