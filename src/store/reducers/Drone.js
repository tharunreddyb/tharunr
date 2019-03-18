import {FETCH_DRONE_DATA, FETCH_DRONE_DATA_SUCCESS,API_ERROR, START_POLLING, STOP_POLLING } from '../actions';

const defaultStateList = {
  isFetching: false,
  items:[],
  error:{},
  isPolling: false,
};

const drone = (state = defaultStateList, action) => {
  switch (action.type){
  case FETCH_DRONE_DATA:
    return {...state, isFetching:true};
  case FETCH_DRONE_DATA_SUCCESS:
    return {...state, isFetching:false, items:action.data};
  case API_ERROR:
    return {...state, isFetching:false, error:action.data};
  case START_POLLING:
    return {...state, isPolling: true};
  case STOP_POLLING:
    return {...state, isPolling: false};
  default:
    return state;
  }
};

export default drone;