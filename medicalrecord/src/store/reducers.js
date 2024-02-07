export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
    return {
      ...state,
      connection: action.connection
    };
    case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      };

    case "ACCOUNT_LOADED":
      return{
        ...state,
        chainId: action.chainId,
      };
      
    case "ETHER_BALANCE_LOADED" :
      return{
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
};

export const medical = (state = DEFAULT_MEDICAL_STATE, action) => {
  switch (action.type) {
    case "MEDICAL_LOADED":
      return{
        ...state,
        loaded: true,
        contract: action.medical,
      };
      default:
        return state;
  }
};