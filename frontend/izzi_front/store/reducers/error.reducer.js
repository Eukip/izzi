const initialState = {
    error: {
        data:{
            message:""
        }
    }
}

export const errorReducer = (state= initialState, action) =>{
    switch (action.type) {
        case "GET_ERROR":
            return{
                error: action.payload
            }
        case "CLEAR_ERROR":
            return{
                error: {
                    data:{
                        message:""
                    }
                }
            }
        default:
            return{
                ...state
            }
    }
}