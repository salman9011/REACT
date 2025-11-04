import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    cart:[],
    // cart:[
    //     {
    //         pizzaId:1,
    //         name:"Peppy Paneer",
    //         quantity:2,
    //         unitPrice:200,
    //         totalPrice:400,
    //     },
    // ]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action){
        state.cart.push(action.payload);
        },
        deleteItem(state,action){
            state.cart = state.cart.filter((item)=> item.pizzaId !==action.payload);
        },
        increaseItem(state,action){
        const item = state.cart.find((item)=> item.pizzaId === action.payload);
        item.quantity++;
        item.totalPrice = item.quantity*item.unitPrice;

        },
        decreaseItem(state,action){
                    const item = state.cart.find((item)=> item.pizzaId === action.payload);
        item.quantity--;
        item.totalPrice = item.quantity*item.unitPrice;

        // instead of writing delete logic again we can use funtionlity of redux
        if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state,action);

        },
        clearCart(state,action){
            state.cart =[];
        }

    }
}) 


export const {addItem,deleteItem,increaseItem,decreaseItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state)=>state.cart.cart;

export const getTotalCartPrice = (state)=>state.cart.cart.reduce((sum,item)=>sum+item.totalPrice,0);
export const getTotalQuantity = (state)=> state.cart.cart.reduce((count,item)=> count+item.quantity,0 );

// get current quantity of individual pizza
export const getIndividualQuantitiyByID = (id) => (state) => state.cart.cart.find(item =>item.pizzaId===id) ?.quantity ?? 0;