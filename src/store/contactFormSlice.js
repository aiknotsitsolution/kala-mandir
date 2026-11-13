import { createSlice } from "@reduxjs/toolkit";

const contactFormSlice = createSlice({
    name: "contactForm",
    initialState: {
        status: "idle",
        submitError: "",
    },
    reducers: {
        resetContactFormStatus(state) {
            state.status = "idle";
            state.submitError = "";
        },
        setContactFormError(state, action) {
            state.status = "error";
            state.submitError = action.payload;
        },
        submissionStarted(state) {
            state.status = "submitting";
            state.submitError = "";
        },
        submissionSucceeded(state) {
            state.status = "submitted";
        },
        submissionSavedWithEmailError(state) {
            state.status = "saved-email-error";
        },
    },
});

export const {
    resetContactFormStatus,
    setContactFormError,
    submissionStarted,
    submissionSucceeded,
    submissionSavedWithEmailError,
} = contactFormSlice.actions;
export default contactFormSlice.reducer;
