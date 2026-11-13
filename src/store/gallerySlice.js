import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "@/lib/api";

const mediaQueryKey = ({ categoryId = "", subcategory = "" } = {}) =>
    `${categoryId || "all"}::${subcategory || ""}`;

export const fetchGalleryCategories = createAsyncThunk(
    "gallery/fetchCategories",
    async (_, { signal }) => {
        const categories = await fetchApi("/gallery/categories", { signal });
        return categories.map((category) => ({
            ...category,
            id: category._id,
            subcategories: category.subcategories || [],
        }));
    },
    {
        condition: (_, { getState }) => {
            const status = getState().gallery.categoriesStatus;
            return status === "idle" || status === "failed";
        },
    },
);

export const fetchGalleryMedia = createAsyncThunk(
    "gallery/fetchMedia",
    async ({ categoryId = "", subcategory = "" } = {}, { signal }) => {
        const params = new URLSearchParams();
        if (categoryId) params.set("categoryId", categoryId);
        if (categoryId && subcategory && subcategory !== "__all__") {
            params.set("subcategory", subcategory);
        }
        const query = params.toString();
        const result = await fetchApi(
            `/gallery/media${query ? `?${query}` : ""}`,
            { signal },
        );
        const mediaItems = result.map((item) => ({
            id: item.id,
            type: item.type,
            src: item.type === "video" ? item.url : item.thumbnailUrl || item.url,
            poster: item.thumbnailUrl,
            fallback: item.url,
            alt: item.title,
            caption: item.title,
            category: item.categoryName,
            subcategory: item.subcategory,
            width: 900,
            height: 1125,
            status: "institute",
        }));

        return {
            key: mediaQueryKey({ categoryId, subcategory }),
            items: [
                ...mediaItems.filter((item) => item.type !== "video"),
                ...mediaItems.filter((item) => item.type === "video"),
            ],
        };
    },
    {
        condition: (query, { getState }) => {
            const status =
                getState().gallery.mediaByQuery[mediaQueryKey(query)]?.status;
            return status !== "loading" && status !== "succeeded";
        },
    },
);

const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        categories: [],
        categoriesStatus: "idle",
        categoriesError: "",
        mediaByQuery: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGalleryCategories.pending, (state) => {
                state.categoriesStatus = "loading";
                state.categoriesError = "";
            })
            .addCase(fetchGalleryCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesStatus = "succeeded";
            })
            .addCase(fetchGalleryCategories.rejected, (state, action) => {
                state.categoriesStatus = "failed";
                state.categoriesError =
                    action.error.message || "Gallery categories could not be loaded.";
            })
            .addCase(fetchGalleryMedia.pending, (state, action) => {
                const key = mediaQueryKey(action.meta.arg);
                const current = state.mediaByQuery[key];
                state.mediaByQuery[key] = {
                    items: current?.items || [],
                    status: "loading",
                    error: "",
                };
            })
            .addCase(fetchGalleryMedia.fulfilled, (state, action) => {
                state.mediaByQuery[action.payload.key] = {
                    items: action.payload.items,
                    status: "succeeded",
                    error: "",
                };
            })
            .addCase(fetchGalleryMedia.rejected, (state, action) => {
                const key = mediaQueryKey(action.meta.arg);
                state.mediaByQuery[key] = {
                    items: [],
                    status: "failed",
                    error: action.error.message || "Gallery media could not be loaded.",
                };
            });
    },
});

export default gallerySlice.reducer;
