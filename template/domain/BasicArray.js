import BasicDomain from './BasicDomain';

export default class BasicArray extends Array {
    getMyClass() { return BasicArray; }

    getMyItemClass() { return BasicDomain; }

    constructor(items = []) {
        super();
        for (let i = 0; i < items.length; i += 1) {
            this.add(items[i]);
        }
        this.sort();
    }

    clone = () => {
        const C = this.getMyClass();
        return new C(this);
    };

    add = (item) => {
        const C = this.getMyItemClass();
        this.push(new C(item));
        this.sort();
        return this;
    };

    update = (item) => {
        for (let i = 0, len = this.length; i < len; i += 1) {
            if (this[i].equals(item)) {
                this[i] = item;
            }
        }
        return this;
    };

    get = (id) => this.find((e) => e.id === id);

    contains = (item) => this.get(item.id) != null;

    remove = (target) => {
        const newList = this.filter((item) => !item.equals(target));
        this.splice(0);
        newList.forEach((item) => this.push(item));
        return this;
    };

    isEmpty = () => (this.length === 0);

    comparator = (a, b) => {
        const nameA = a.toString();
        const nameB = b.toString();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    };

    sort = () => super.sort(this.comparator);

    toJSON = () => this.map((item) => item);

    toIds = () => this.map((item) => item.id);
}
