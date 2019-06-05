
export default class BasicDomain {
    getMyClass() { return BasicDomain; }

    constructor(props) {
        this.source = props;
    }

    clone = () => {
        const C = this.getMyClass();
        return new C(this);
    };

    isSavable = () => false;

    equals = obj => this === obj;
}

