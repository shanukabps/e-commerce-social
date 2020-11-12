

export const initialState = {//inirial data layer
    basket: [],
    user: null
}

//Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) =>parseFloat(item.price) + amount, 0);


const reducer = (state, action) => {
   // console.log(action)
    switch (action.type) {

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "CLEAR":
            return {

                user: null
            }

               case "UPDATE":
            return {

                ...state,
               user:{
                   ...state.user,
                   followers:action.user.followers,
                   following:action.user.following
                }
             
            }

               case "UPDATEPIC":
            return {

                ...state,
               user:{
                   ...state.user,
                  pic:action.user.pic
                }
             
            }

case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            }

        case "REMOVE_FROM_BASKET":

            const index = state.basket.findIndex(
                basketItem => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not inbasket!`
                )
            }

            return {
                ...state,
                basket: newBasket
            }




        default:
            return state
    }
}

export default reducer