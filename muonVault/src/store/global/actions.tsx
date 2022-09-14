export enum ACTION_TYPE {
    COMMON_DATA
}

export interface IActionData {
    type: ACTION_TYPE;
    name?: string;
    data?: any;
}
