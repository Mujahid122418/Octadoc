import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction} from "@reduxjs/toolkit";
import { addcategory, getcategories , deleteCategory } from "./CategoryAPI";



interface Category {
  category: any;
  isLoading: Boolean;
  error: string;
  status: string;
  allcategory :any[];
 
}

const initialState: Category = {
  category: {},
  isLoading: false,
  status: "",
  error: "",
  allcategory : [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [addcategory.pending.type]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addcategory.fulfilled.type]: (state, { payload }) => {
      state.status = "success";
      state.category = payload;
      state.isLoading = false;
    },
    [addcategory.rejected.type]: (state, action) => {
      state.status = "failed";
      state.isLoading = false;
    },
    // ======= getCategory ======
    [getcategories.pending.type]: (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      },
    [getcategories.fulfilled.type]: (state,  payload ) => {
        state.status = "success";
        state.allcategory = payload.payload;
        state.isLoading = false;
    },
    [getcategories.rejected.type]: (state, action) => {
        state.status = "failed";
        state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function

// export const { addTemplate, getTemplate, updateTemplate, deleteTemplate } =
//   templateSlice.actions;

export default categorySlice.reducer;
