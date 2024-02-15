import { createSelector } from "reselect";
import moment from "moment/moment";

const allData = (state) => state.medical.allMedical.data || [];
const deleteData = (state) => state.medical.deleteMedical.data || [];
const account = (state) => state.provider.account;
const events = (state) => state.medical.events;

const openData = createSelector(
  [allData, deleteData],
  (all, delet) => {
    return all.filter(data => !delet.some(o => o.recordId.toString() === data.recordId.toString()));
  }
);

export const dataBookSelector = createSelector(
  [openData],
  (data) => {
    return data.map(decorateOpenData);
  }
);

const decorateOpenData = (data) => {
  const precision = 100000;
  let recordIdNew = Math.round(data.recordId * precision) / precision;
  let ageNew = Math.round(data.age * precision) / precision;
  return {
    ...data,
    recordIdNew,
    ageNew,
    formattedTimestamp: moment
      .unix(data.timestamp)
      .format("h:mm:ssa d MMM yyyy"),
  };
};

export const myEventsSelector = createSelector(
  [account, events],
  (account, events) => {
    return events;
  }
);