
const initialState = {
  username: '',
  profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {username: user.username, profile_pic: user.profile_pic}
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      const {username, profile_pic} = action.payload;
      return {username, profile_pic};
    case LOGOUT:
      return {username: '', profile_pic: ''}
    default:
      return state;
  }
}