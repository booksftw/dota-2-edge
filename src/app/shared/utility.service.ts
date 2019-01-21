import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  isObjectInArray(theArray, objectIdValue) {
    const arrayTruthCheck = theArray.some(
      (obj) => {
        // GET THE INDEX OF THIS AND REMOVE IT FROM AARRAY
        return obj['id'] === objectIdValue;
      });
    return arrayTruthCheck;
  }

  findBadIndex(theArray, undefinedObjId) {
    console.log(typeof(theArray), ' undefined obj: ', undefinedObjId );
    const undefinedObjIndex = theArray['findIndex'](
      (e) => {
        // console.log(undefinedObjId, 'undefind obj');
        return e === undefinedObjId;
      });
    return undefinedObjIndex;
  }
}


