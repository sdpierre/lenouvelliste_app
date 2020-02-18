export default (state = {}, action) => {
  
    switch (action.type) {
        case 'SET_USER_INFO':
            state['userInfo'] = action.info;
            return state;
        default:
            return state;
    }
};
