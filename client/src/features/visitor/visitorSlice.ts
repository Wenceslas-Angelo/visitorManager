import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { VisitorType } from "../../types";

type VisitorState = {
  todayVisitors: VisitorType[];
  todayVisitorsOut: VisitorType[];
  todayVisitorsIn: VisitorType[];
  allVisitors: VisitorType[];
};

const initialState: VisitorState = {
  allVisitors: [],
  todayVisitors: [],
  todayVisitorsOut: [],
  todayVisitorsIn: [],
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {
    readAllVisitors(state, action) {
      const allVisitors: VisitorType[] = action.payload;
      state.allVisitors = allVisitors;

      state.todayVisitors = allVisitors.filter((visitor) => {
        return moment(visitor.startDateTime).isSame(
          moment().startOf("day"),
          "day"
        );
      });

      state.todayVisitorsOut = state.todayVisitors.filter((visitor) =>
        visitor.endDateTime ? visitor : null
      );

      state.todayVisitorsIn = state.todayVisitors.filter((visitor) =>
        visitor.endDateTime ? null : visitor
      );
    },

    addVisitor(state, action) {
      const newVisitor = action.payload;
      state.allVisitors = [newVisitor.result, ...state.allVisitors];
      state.todayVisitors = [newVisitor.result, ...state.todayVisitors];
      state.todayVisitorsIn = [newVisitor.result, ...state.todayVisitorsIn];
    },

    checkOutVisitor(state, action) {
      const checkVisitor: VisitorType = action.payload;
      state.allVisitors = state.allVisitors.map((visitor) =>
        visitor._id === checkVisitor._id ? checkVisitor : visitor
      );
      state.todayVisitors = state.todayVisitors.map((visitor) =>
        visitor._id === checkVisitor._id ? checkVisitor : visitor
      );
      state.todayVisitorsIn = state.todayVisitorsIn.filter((visitor) =>
        visitor._id !== checkVisitor._id ? visitor : null
      );
      state.todayVisitorsOut = [checkVisitor, ...state.todayVisitorsOut];
    },
    deleteVisitor(state, action) {
      const visitorDeleted: VisitorType = action.payload;

      state.allVisitors = state.allVisitors.filter(
        (visitor) => visitor._id !== visitorDeleted._id
      );
    },
    updateVisitor(state, action) {
      const newVisitor: VisitorType = action.payload;
      state.allVisitors = state.allVisitors.map((visitor) => {
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
