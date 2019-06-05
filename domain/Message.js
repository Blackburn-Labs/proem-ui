/* eslint no-bitwise: ["error", { "allow": ["<<"] }] */
import BasicDomain from './BasicDomain';

export default class Message extends BasicDomain {
    getMyClass() { return Message; }

    constructor(props = {}) {
        super(props);
        this.id = props.id || props.objectId || `${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
        this.title = props.title || '';
        this.details = props.details || '';
        this.time = props.time || new Date();
        this.type = props.type || 'message';
        this.source = props.source || {};
    }

    getSecondsOld = () => ((new Date() - this.time) / 1000)
}
