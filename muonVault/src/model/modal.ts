export interface Modal {
  title?: string;
  content?: string;
  content2?: string;
  contentsName?: string;
  imageUrl?: string;
  visible: boolean;
  success?: any;
  ok?: any;
  fail?: any;
  callback?: any;
  cancel?: any;
}

export interface DepositModal {
  show: boolean;
  ok?: Function;
  cancel?: Function;
}
