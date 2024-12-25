import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: {
		id_number: "",
		first_name: "",
		middle_name: "",
		last_name: "",
		first_name_am: "",
		middle_name_am: "",
		last_name_am: "",
		full_name_en: "",
		full_name_am: "",
		phone_number: 0,
		email: "",
		gender: "",
		organization_type: "",
		organization_name: "",
		is_2fa_enabled: false,
		is_staff: false,
	},
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		SetCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		ClearCurrentUser: (state) => {
			state.currentUser = initialState.currentUser; // Resets to initial state
		},
	},
});

export const { SetCurrentUser, ClearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
