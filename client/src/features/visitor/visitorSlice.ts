import { createSlice } from "@reduxjs/toolkit";
import { VisitorAPIResponse } from "../../types";

type VisitorState = {
  todayVisitors: VisitorAPIResponse;
  todayVisitorsOut: VisitorAPIResponse;
  todayVisitorsIn: VisitorAPIResponse;
};

const initialState: VisitorState = {
  todayVisitors: {
    totalResults: 0,
    results: [],
  },
  todayVisitorsOut: {
    totalResults: 0,
    results: [],
  },
  todayVisitorsIn: {
    totalResults: 0,
    results: [],
  },
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {
    readAllToday(state, action) {
      const allVisitorsToday: VisitorAPIResponse = action.payload;
      state.todayVisitors = allVisitorsToday;
      state.todayVisitorsOut.results = allVisitorsToday.results.filter(
        (visitor) => (visitor.endDateTime ? visitor : null)
      );
      state.todayVisitorsOut.totalResults =
        state.todayVisitorsOut.results.length;
      state.todayVisitorsIn.results = allVisitorsToday.results.filter(
        (visitor) => (visitor.endDateTime ? null : visitor)
      );
      state.todayVisitorsIn.totalResults = state.todayVisitorsIn.results.length;
    },
    addVisitor(state, action) {
      const newVisitor = action.payload;
      state.todayVisitors.results = [
        newVisitor.result,
        ...state.todayVisitors.results,
      ];
      state.todayVisitors.totalResults = newVisitor.totalResults;
      state.todayVisitorsIn.results = [
        newVisitor.result,
        ...state.todayVisitorsIn.results,
      ];
      state.todayVisitorsIn.totalResults = state.todayVisitorsIn.results.length;
    },
    checkOutVisitor() {},
  },
});

export const { addVisitor, readAllToday, checkOutVisitor } =
  visitorSlice.actions;

export default visitorSlice.reducer;
