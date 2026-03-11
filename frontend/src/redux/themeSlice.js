import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // actions
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';

            // Apply theme to <html>
            const root = document.documentElement;
            if (state.theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;