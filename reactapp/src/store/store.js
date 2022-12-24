import { createStore, applyMiddleware, compose } from 'redux';
const initialState = {
    post_id:undefined,
    loggedin:false,
    authpage:false,
    userPost:false,
    isLoading:false
}

const getIdReducer = (state=initialState,action) =>{
    switch (action.type) {
      

        case 'get_post_id':
            return {
                ...state,
                post_id:action.payload
            }

        case 'auth_page':
            return {
                ...state,
                authpage: true
            }
    
        case 'not_auth_page':
            return {
                ...state,
                authpage: false
            }
    
       
        case 'loggedIn':
            return {
                ...state,
                loggedin: true
            }
     
        case 'not_loggedIn':
            return {
                ...state,
                loggedin: false
            }
        case 'user_post':
            return {
                ...state,
                userPost: true
            }
     
        case 'isLoading':
            return {
                ...state,
                isLoading: true
            }
     
        case 'is_Not_Loading':
            return {
                ...state,
                isLoading: false
            }
     
        default:
            return state
    }
}

const ReduxStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        getIdReducer,
        composeEnhancers(applyMiddleware()
        ));
    return store;
}


export default ReduxStore
