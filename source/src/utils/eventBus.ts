// Простейшая шина событий, что бы не тянуть сторонние либы
declare module 'vue' {
  interface ComponentCustomProperties {
    $bus: any;
  }
}

class Event {
  events: any = {};

  // eslint-disable-next-line @typescript-eslint/ban-types
  $on(eventName: string, fn: Function) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  $off(eventName: string, fn: Function) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  $emit(eventName: string, data?: any) {
    if (this.events[eventName]) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      this.events[eventName].forEach(function (fn: Function) {
        fn(data);
      });
    }
  }
}

export default new Event();
