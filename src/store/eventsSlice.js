import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "@/lib/api";

export const fetchEvents = createAsyncThunk(
    "events/fetchAll",
    (_, { signal }) => fetchApi("/events", { signal }),
    {
        condition: (_, { getState }) => {
            const status = getState().events.status;
            return status === "idle" || status === "failed";
        },
    },
);

export const fetchEventCategories = createAsyncThunk(
    "events/fetchCategories",
    (_, { signal }) => fetchApi("/event-categories", { signal }),
    {
        condition: (_, { getState }) => {
            const status = getState().events.categoriesStatus;
            return status === "idle" || status === "failed";
        },
    },
);

export const fetchEventDetails = createAsyncThunk(
    "events/fetchDetails",
    async (id, { signal }) => ({
        id,
        event: await fetchApi(`/events/${encodeURIComponent(id)}`, { signal }),
    }),
    {
        condition: (id, { getState }) => {
            const status = getState().events.details[id]?.status;
            return status !== "loading" && status !== "succeeded";
        },
    },
);

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        items: [],
        status: "idle",
        error: "",
        categories: [],
        categoriesStatus: "idle",
        categoriesError: "",
        details: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Events could not be loaded.";
            })
            .addCase(fetchEventCategories.pending, (state) => {
                state.categoriesStatus = "loading";
                state.categoriesError = "";
            })
            .addCase(fetchEventCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesStatus = "succeeded";
            })
            .addCase(fetchEventCategories.rejected, (state, action) => {
                state.categoriesStatus = "failed";
                state.categoriesError =
                    action.error.message || "Event categories could not be loaded.";
            })
            .addCase(fetchEventDetails.pending, (state, action) => {
                state.details[action.meta.arg] = {
                    event: null,
                    status: "loading",
                    error: "",
                };
            })
            .addCase(fetchEventDetails.fulfilled, (state, action) => {
                state.details[action.payload.id] = {
                    event: action.payload.event,
                    status: "succeeded",
                    error: "",
                };
            })
            .addCase(fetchEventDetails.rejected, (state, action) => {
                state.details[action.meta.arg] = {
                    event: null,
                    status: "failed",
                    error: action.error.message || "Event could not be loaded.",
                };
            });
    },
});

export default eventsSlice.reducer;
