
export default class BasicDomain {
    getMyClass() { return BasicDomain; }

    clone = () => {
        const C = this.getMyClass();
        return new C(this);
    };

    value = (k, v) => { if (v == null) { return this[k]; } this[k] = v; return this; };

    isSavable = () => false;

    equals = (obj) => this === obj;
}
