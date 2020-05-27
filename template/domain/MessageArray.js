import BasicArray from './BasicArray';
import Message from './Message';

export default class MessageArray extends BasicArray {
    getMyClass() { return MessageArray; }

    getMyItemClass() { return Message; }

    constructor(items = []) {
        super(items);
    }

    clone = () => new MessageArray(this.filter((e) => e.getSecondsOld() < 60));
}
