const initialState = {
    email: null,
    token: null,
    user_id: null,
    user_name: null,
}
  
const authen = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTHEN":
            return {    ...state, 
                        email: action.email,
                        token: action.token,
                        user_id: action.email,
                        email: action.user_name
                    }
        case "SET_VALUE":
            return { ...state, [action.name]: action.value}
        default:
            return { ...state }
    }
}
  
export default authen
  