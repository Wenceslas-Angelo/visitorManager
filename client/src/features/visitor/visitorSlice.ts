import { createSlice } from "@reduxjs/toolkit";
import { VisitorAPIResponse, VisitorType } from "../../types";

type VisitorState = {
  todayVisitors: VisitorAPIResponse;
  todayVisitorsOut: VisitorType[];
  todayVisitorsIn: VisitorType[];
  allVisitors: VisitorAPIResponse;
};

const initialState: VisitorState = {
  todayVisitors: {
    totalResults: 0,
    results: [],
  },
  todayVisitorsOut: [],
  todayVisitorsIn: [],
  allVisitors: {
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
      state.todayVisitorsOut = allVisitorsToday.results.filter((visitor) =>
        visitor.endDateTime ? visitor : null
      );
      state.todayVisitorsIn = allVisitorsToday.results.filter((visitor) =>
        visitor.endDateTime ? null : visitor
      );
    },
    addVisitor(state, action) {
      const newVisitor = action.payload;
      state.todayVisitors.results = [
        newVisitor.result,
        ...state.todayVisitors.results,
      ];
      state.todayVisitors.totalResults = newVisitor.totalResults;
      state.todayVisitorsIn = [newVisitor.result, ...state.todayVisitorsIn];
    },
    checkOutVisitor(state, action) {
      const checkVisitor: VisitorType = action.payload;
      state.todayVisitors.results = state.todayVisitors.results.map((visitor) =>
        visitor._id === checkVisitor._id ? checkVisitor : visitor
      );
      state.todayVisitorsIn = state.todayVisitorsIn.filter((visitor) =>
        visitor._id !== checkVisitor._id ? visitor : null
      );
      state.todayVisitorsOut = [checkVisitor, ...state.todayVisitorsOut];
    },
    readAllVisitors(state, action) {
      const all: VisitorAPIResponse = action.payload;
      state.allVisitors = all;
    },
  },
});

export const { addVisitor, readAllToday, checkOutVisitor, readAllVisitors } =
  visitorSlice.actions;

export default visitorSlice.reducer;
