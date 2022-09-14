import { combineReducers, createStore } from "redux";
import { ACTION_TYPE, IActionData } from "./actions";

const initCommonData: any = {};

const commonStatus = (state = initCommonData, action: IActionData): any => {
    if ( action.type === ACTION_TYPE.COMMON_DATA ) {
        if ( action.name && action.data ) {
            state[ action.name ] = action.data;
        }
    }
    return state;
};

const commonControl = combineReducers({
    commonStatus
});

export default createStore(commonControl);

export function commonStore(): any {
    const ocb = createStore(commonControl);
    return ocb;
}

/**
 * 화면에서만 사용할 공통 저장 데이터를 가져올 때 사용
 * @param name key 값
 * @return key값의 데이터 정보
 */
export function getCommonInfo( name: string ): any {
    const item = commonStore().getState().commonStatus;
    if ( item && item[name] ) {
        return item[name];
    }
    return null;
}

/**
 * 화면에서만 사용할 공통 저장 데이터를 저장 함수
 * @param name key 값
 * @param data 저장할 데이터 값
 */
export function setCommonInfo( name: string, data: any = null ) {
    commonStore().dispatch( { type: ACTION_TYPE.COMMON_DATA, name, data } );
}

/**
 * 화면에서만 사용할 공통 저장 데이터를 삭제
 * @param name 삭제할 key 값
 */
export function removeCommonInfo( name: string ) {
    const item = commonStore().getState().commonStatus;
    if ( item && item[name] ) {
        delete item[name];
    }
}
