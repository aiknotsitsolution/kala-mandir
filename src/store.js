import { configureStore } from "@reduxjs/toolkit";
import contactFormReducer from "@/store/contactFormSlice";
import eventsReducer from "@/store/eventsSlice";
import galleryReducer from "@/store/gallerySlice";

export const store = configureStore({
    reducer: {
        contactForm: contactFormReducer,
        events: eventsReducer,
        gallery: galleryReducer,
    },
});
