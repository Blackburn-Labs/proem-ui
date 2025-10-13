export default class BasicArray extends Array {
    get myItemClass() {
        throw new Error('No Item Type Set.');
    }

    constructor(items = []) {
        super();
        for (let i = 0; i < items.length; i += 1) {
            if (items[i]) {
                this.add(items[i]);
            }
        }
    }

    clone = () => {
        const C = this.myItemClass;
        return this.map((item) => (item.clone ? item.clone() : new C(item)));
    };

    add = (item) => {
        const C = this.myItemClass;
        this.push(new C(item));
        return this;
    };

    update = (item) => {
        const C = this.myItemClass;
        for (let i = 0, len = this.length; i < len; i += 1) {
            if (this[i].equals(item)) {
                this[i] = new C(item);
            }
        }
        return this;
    };

    updateAt = (item, ix) => {
        const C = this.myItemClass;
        this[ix] = new C(item);
        return this;
    };

    addUpdate = (item) => {
        const C = this.myItemClass;
        let isChangeMade = false;
        for (let i = 0, len = this.length; i < len; i += 1) {
            if (this[i].equals(item)) {
                this[i] = new C(item);
                isChangeMade = true;
            }
        }
        return isChangeMade ? this : this.add(item);
    };

    get = (id) => this.find((e) => e.id === id);

    getAt = (ix) => this[ix];

    contains = (item) => this.get(item.id) != null;

    remove = (target) => {
        const newList = this.filter((item) => item.id !== target.id);
        this.splice(0);
        newList.forEach((item) => this.push(item));
        return this;
    };

    removeAt = (ix) => {
        if (ix >= 0 && ix < this.length) {
            this.splice(ix, 1);
        }
        return this;
    };

    move = (ix1, ix2) => {
        const element = this[ix1];
        this.splice(ix1, 1);
        this.splice(ix2, 0, element);
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

    sort = (comp) => {
        super.sort(comp || this.comparator);
        return this;
    };

    toJSON = () => this.map((item) => typeof item.toJSON === 'function' ? item.toJSON() : JSON.parse(JSON.stringify(item)));

    toIds = () => this.map((item) => item.id);
}
