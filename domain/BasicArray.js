import BasicDomain from './BasicDomain';

export default class BasicArray {
    getMyClass() { return BasicArray; }
    getMyItemClass() { return BasicDomain; }

    constructor(items = []) {
        items.forEach(item => (this.add(item)));
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
    };

    update = (item) => {
        this.remove(item);
        this.add(item);
    };

    get = id => this.find(e => e.id === id);

    remove = (target) => {
        const newList = this.filter(item => !item.equals(target));
        this.splice(0);
        newList.forEach(item => this.push(item));
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

    toJSON = () => this.map(item => item);
}

BasicArray.prototype = Object.create(Array.prototype);
