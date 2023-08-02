function copyArray(arr: Array<any>): Array<any> {
  return arr.map((item) => {
      if (Array.isArray(item)) {
          return copyArray(item);
      } else if (typeof item === 'object' && item !== null) {
          return copyObject(item);
      } else {
          return item;
      }
  })
}

function copyObject(obj: any): any {
  const clone: any = {};
  for (const prop in obj) {
      const value = obj[prop];
      if (value != null && typeof value == "object") {
          if (Array.isArray(value)) {
              clone[prop] = copyArray(value);
          } else {
              clone[prop] = copyObject(value);
          }
      } else {
          clone[prop] = value;
      }
  }
  return clone;
}

export function deepCloneArray<T>(arr: Array<T>) : T[] {
  return copyArray(arr);
}
