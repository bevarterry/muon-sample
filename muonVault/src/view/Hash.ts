import { getCommonInfo, setCommonInfo } from "~/store/global/state";

const stringToHash = function (s: string) {
  var h = 0, l = s.length, i = 0;
  if (l > 0)
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};


function isDuplicated(hashCodeRomoteMessage: number) {
  const v = getCommonInfo(hashCodeRomoteMessage + '');
  if (v === undefined || v === null) {
    setCommonInfo(hashCodeRomoteMessage + '', true);
    return false;
  }
  else return true;
}

export { stringToHash, isDuplicated };