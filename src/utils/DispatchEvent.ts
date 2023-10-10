/**
 * 发布订阅
 * */
interface Event {
  on: (name: string, cb: Function) => void,
  emit: (name: string, ...args: Array<any>) => void,
  off: (name: string, cb: Function) => void,

}

interface IEvent {
  [key: string]: Function[];
}

class DispatchEvent implements Event {
  events: IEvent = {};

  on(name: string, cb: Function) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(cb);
  }

  emit(name: string, ...args: Array<any>) {
    if (!this.events[name]) {
      console.error("该事件不存在，下次再来");
    } else {
      this.events[name].forEach(cb => {
        cb.apply(this, args);
      });
    }

  }
  off(name:string, cb:Function){
    let events = this.events[name]
    if(events && cb){
      let index = events.findIndex(event=> event === cb)
      index > -1 && events.splice(index,1)
    } else {
      console.log("该事件已被删除")
    }
  }
}

export default new DispatchEvent();
