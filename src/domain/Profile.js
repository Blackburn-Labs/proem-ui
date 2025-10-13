import Parse from 'parse';
import BasicDomain from './BasicDomain';

export default class Profile extends BasicDomain {

    static STATUS_ACTIVE = 'ACTIVE';

    static STATUS_INACTIVE = 'INACTIVE';

    static STATUSES = [
        Profile.STATUS_ACTIVE,
        Profile.STATUS_INACTIVE,
    ];

    static STATUS_LABELS = {
        [Profile.STATUS_ACTIVE]: 'Active',
        [Profile.STATUS_INACTIVE]: 'Inactive',
    };

    static DEFAULTS = {
        name: '',
        status: Profile.STATUS_ACTIVE,
        pic: null,
        email: '',
        phone: '',
        user: null,
    };

    static FIELDS = Object.keys(Profile.DEFAULTS);

    constructor(props) {
        super('Profile', props, Profile.DEFAULTS);
    }

    get picUrl() {
        if (!this.pic) {
            return null;
        }

        if (typeof this.pic.url === 'function') {
            return this.pic.url();
        }

        return this.pic.url ?? null;
    }

    get initials() {
        if (!this.name || typeof this.name !== 'string') {
            return '';
        }

        const nameParts = this.name.split(' ').filter(part => part.length > 0);

        if (nameParts.length === 0) {
            return '';
        }

        return nameParts.map(part => part.charAt(0).toUpperCase()).slice(0, 3).join('');
    }

    isSavable = () => (
        this.name != null
        && this.name.trim() !== ''
        && this.email != null
        && this.email.trim() !== ''
        && Profile.STATUSES.includes(this.status)
    );

    toString = () => `${this.name} <${this.email}>`;
}

Parse.Object.registerSubclass('Profile', Profile);
