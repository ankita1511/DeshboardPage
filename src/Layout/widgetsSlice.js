// src/features/widgets/widgetsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  widgets: [
    { id: 1, category: 'CSPM Executive Dashboard', name: 'Cloud Accounts', content: 'Some data or graph here' },
    { id: 2, category: 'CSPM Executive Dashboard', name: 'Cloud Account Risk Assessment', content: 'Some data or graph here' },
   
  ],
};

export const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter(widget => widget.id !== action.payload);
    },
  },
});

export const { addWidget, removeWidget } = widgetsSlice.actions;

export default widgetsSlice.reducer;
