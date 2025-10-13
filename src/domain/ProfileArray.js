import BasicArray from './BasicArray';
import Profile from './Profile.js';

export default class ProfileArray extends BasicArray {
    get myClass() { return ProfileArray; }

    get myItemClass() { return Profile; }

    constructor(items = []) {
        super(items);
    }
}
