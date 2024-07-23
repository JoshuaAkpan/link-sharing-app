export function debounce(func: Function, delay: number) {
    let timerId: NodeJS.Timeout;
  
    return function(this: any, ...args: any[]) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  