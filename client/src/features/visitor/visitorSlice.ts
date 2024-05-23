import { createSlice } from "@reduxjs/toolkit";
import { ReadAllVisitorsResponse, VisitorType } from "../../types";

type VisitorState = {
  allVisitors: ReadAllVisitorsResponse;
};

const initialState: VisitorState = {
  allVisitors: {
    visitors: [],
    totalPages: 0,
    totalVisitors: 0,
    currentPage: 0,
  },
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {
    readAllVisitors(state, action) {
      const allVisitors: ReadAllVisitorsResponse = action.payload;
      state.allVisitors = allVisitors;
    },

    addVisitor(state, action) {
      const newVisitor = action.payload;
      state.allVisitors.visitors = [newVisitor, ...state.allVisitors.visitors];
    },

    checkOutVisitor(state, action) {
      const checkVisitor: VisitorType = action.payload;
      state.allVisitors.visitors = state.allVisitors.visitors.map((visitor) =>
        visitor._id === checkVisitor._id ? checkVisitor : visitor
      );
    },
    deleteVisitor(state, action) {
      const visitorDeleted: VisitorType = action.payload;
      state.allVisitors.visitors = state.allVisitors.visitors.filter(
        (visitor) => visitor._id !== visitorDeleted._id
      );
    },
    updateVisitor(state, action) {
      const newVisitor: VisitorType = action.payload;
      state.allVisitors.visitors = state.allVisitors.visitors.map((visitor) => {
        if (visitor._id === newVisitor._id) {
          return newVisitor;
        }
        return visitor;
      });
    },
  },
});

export const {
  addVisitor,
  checkOutVisitor,
  readAllVisitors,
  deleteVisitor,
  updateVisitor,
} = visitorSlice.actions;

export default visitorSlice.reducer;
