import BasicDomain from './BasicDomain';

export default class User extends BasicDomain {
    getMyClass() { return User; }

    constructor(props = {}) {
        super(props);
        this.id = props.id || props.objectId || undefined;
        this.username = props.username || '';
        this.email = props.email || '';
        this.createdAt = props.createdAt || undefined;
        this.updatedAt = props.updatedAt || undefined;
        this.ACL = props.ACL || { '*': { read: false } };
        this.sessionToken = props.sessionToken || undefined;
    }
}
