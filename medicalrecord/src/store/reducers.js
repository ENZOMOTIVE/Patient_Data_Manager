export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return { ...state, connection: action.connection };
    case "NETWORK_LOADED":
      return { ...state, chainId: action.chainId };
    case "ACCOUNT_LOADED":
      return {
        ...state,
        account: action.account,
      };
    case "ETHER_BALANCE_LOADED":
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};

const DEFAULT_MEDICAL_STATE = {
  loaded: false,
  contract: {},
  transaction: {
    isPending: false,
    isSuccessful: false,
    isError: false, // Add isError to track transaction errors
  },
  allMedical: {
    loaded: false,
    data: [],
  },
  deleteMedical: {
    loaded: false,
    data: [],
  },
  events: [],
};

export const medical = (state = DEFAULT_MEDICAL_STATE, action) => {
  let index, data;
  switch (action.type) {
    case "MEDICAL_LOADED":
      return {
        ...state,
        loaded: true,
        contract: action.medical,
      };
    case "ALL_MEDICAL_RECORDS":
      return {
        ...state,
        allMedical: {
          loaded: true,
          data: action.medicalRecords,
        },
      };
    case "ALL_DELETED_RECORDS":
      return {
        ...state,
        deleteMedical: {
          loaded: true,
          data: action.deleteRecords,
        },
      };
    case "NEW_RECORD_LOADED":
    case "DELETE_REQUEST_INITIALIZED": // Updated action type
      return {
        ...state,
        transaction: {
          isPending: true,
          isSuccessful: false,
          isError: false, // Reset isError flag when new transaction starts
        },
      };
    case "NEW_RECORD_SUCCESS":
    case "DELETE_REQUEST_SUCCESS": // Updated action type
      index = state[action.type.includes("NEW") ? "allMedical" : "deleteMedical"].data.findIndex(
        (order) =>
          order.recordId.toString() === action[action.type.includes("NEW") ? "medicalOrder" : "deleteOrder"].recordId.toString()
      );
      if (index === -1) {
        data = [...state[action.type.includes("NEW") ? "allMedical" : "deleteMedical"].data, action[action.type.includes("NEW") ? "medicalOrder" : "deleteOrder"]];
      } else {
        data = state[action.type.includes("NEW") ? "allMedical" : "deleteMedical"].data;
      }
      return {
        ...state,
        [action.type.includes("NEW") ? "allMedical" : "deleteMedical"]: {
          ...state[action.type.includes("NEW") ? "allMedical" : "deleteMedical"],
          data,
        },
        transaction: {
          isPending: false,
          isSuccessful: true,
          isError: false, // Reset isError flag on successful transaction
        },
        events: [action.event, ...state.events],
      };
    case "NEW_RECORD_FAIL":
    case "DELETE_REQUEST_FAILED": // Updated action type
      return {
        ...state,
        transaction: {
          isPending: false,
          isError: true,
          isSuccessful: false,
        },
      };
    default:
      return state;
  }
};
