export const initialState = {
  basket: [],
  user: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET": {
      return { ...state, basket: [...state.basket, action.items] };
    }
    case "REMOVE_FROM_BASKET": {
      let newBasket = [...state.basket];
      let index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product id:${action.id} as its not in basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "EMPTY_BASKET": {
      return {
        ...state,
        basket:[]
      };
    }
    default:
      return state;
  }
};
export const getBasketTotal = (basket) => {
  return basket?.reduce((total, item) => total + item.price, 0);
};
