import {LOADING_UI, STOP_LOADING_UI } from '../types/types';


export const loadingAction = async (dispatch, action) => {
    dispatch({type: LOADING_UI})
    try{
    await action();
    dispatch({type: STOP_LOADING_UI})
    }catch (e){
        console.error(e);
        dispatch({type: STOP_LOADING_UI})
    }
}