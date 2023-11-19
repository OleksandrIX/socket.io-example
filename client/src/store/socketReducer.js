const defaultState = {
    socket: null,
}

const ADD_SOCKET = 'ADD_SOCKET'
const REMOVE_SOCKET = 'REMOVE_SOCKET'

export const socketReducer = (state = defaultState, action) => {
    switch (action.type){
        case ADD_SOCKET:
            return {
                ...state,
                socket: action.payload.socket,
            }
        case REMOVE_SOCKET:
            return {
                ...state,
                socket: null,
            }
        default:
            return state
    }
}

export const addSocketAction = (payload)=> ({type: ADD_SOCKET, payload})
export const removeSocketAction = (payload)=> ({type: REMOVE_SOCKET, payload})