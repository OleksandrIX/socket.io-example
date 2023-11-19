const defaultState = {
    currentUser: {
        id: '',
        username: '',
        isActive: false,
        selectUser: {
            selectUserId: '',
            selectUsername: '',
            isSelected: false,
        },
    },
    users: [],
}

const ADD_CURRENT_USER = 'ADD_CURRENT_USER'
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'
const ADD_ALL_USERS = 'ADD_ALL_USERS'
const ADD_USER = 'ADD_USER'
const REMOVE_USERS = 'REMOVE_USERS'
const SELECT_USER = 'SELECT_USER'

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_CURRENT_USER:
            return {
                ...state, currentUser: {
                    id: action.payload.id,
                    username: action.payload.username,
                    isActive: action.payload.isActive,
                    selectUser: {
                        selectUserId: '',
                        selectUsername: '',
                        isSelected: false,
                    }
                }
            }
        case REMOVE_CURRENT_USER:
            return {
                ...state, currentUser: {
                    id: '',
                    username: '',
                    isActive: false,
                    selectUser: {
                        selectUserId: '',
                        selectUsername: '',
                        isSelected: false,
                    }
                }
            }
        case ADD_ALL_USERS:
            return {...state, users: [...action.payload]}
        case ADD_USER:
            return {...state, users: [...state.users, action.payload.user]}
        case REMOVE_USERS:
            return {...state, users: []}
        case SELECT_USER:
            return {
                ...state, currentUser: {
                    id: action.payload.id,
                    username: action.payload.username,
                    isActive: action.payload.isActive,
                    selectUser: {
                        selectUserId: action.payload.selectUserId,
                        selectUsername: action.payload.selectUsername,
                        isSelected: true,
                    }
                }
            }
        default:
            return state
    }
}

export const addCurrentUserAction = (payload) => ({type: ADD_CURRENT_USER, payload})
export const removeCurrentUserAction = (payload) => ({type: REMOVE_CURRENT_USER, payload})
export const addAllUsersAction = (payload) => ({type: ADD_ALL_USERS, payload})
export const addUserAction = (payload) => ({type: ADD_USER, payload})
export const removeUsersAction = (payload) => ({type: REMOVE_USERS, payload})
export const selectUserAction = (payload) => ({type: SELECT_USER, payload})