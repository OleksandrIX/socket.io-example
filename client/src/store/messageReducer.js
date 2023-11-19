const defaultState = {
    messages: []
}

const ADD_ALL_MESSAGES = 'ADD_ALL_MESSAGES'
const ADD_MESSAGE = 'ADD_MESSAGE'

export const messageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_ALL_MESSAGES:
            return {
                ...state, messages: [...action.payload.messages]
            }
        case ADD_MESSAGE:
            return {...state, messages: [...state.messages, action.payload.message]}
        default:
            return state
    }
}

export const addAllMessagesAction = (payload) => ({type: ADD_ALL_MESSAGES, payload})
export const addMessageAction = (payload) => ({type: ADD_MESSAGE, payload})