
const initialState = {
  id: 1,
  username: '',
  profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export const updateUser = (user) => {
  console.log('updateUser: ',  user);
  return {
    type: UPDATE_USER,
    payload: {user}
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export default function reducer(state=initialState, action) {
  console.log('ACTION TYPE: ',action.type);
  switch(action.type) {
    case UPDATE_USER:
      console.log('Payload',action.payload)
      const {id, username, profile_pic} = action.payload.user;
      return {id, username, profile_pic};
    case LOGOUT:
      return {username: '', profile_pic: ''}
    default:
      return state;
  }
}