/* eslint no-bitwise: ["error", { "allow": ["<<"] }] */
import moment from 'moment';

const DATE_FORMAT_SHORT = 'MMM Do';
const DATE_FORMAT_LONG = 'MMM Do, YYYY';
const PWD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const EMAIL_REGEX = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\\b');

export default class CommonUtils {
    static EMPTY_FUNCTION = () => {};

    static generateKey = () => (Math.random() * 0xFFFFFF << 0).toString(16)

    static isEmailValid = (e) => EMAIL_REGEX.test(e);

    static isPasswordValid = (p) => PWD_REGEX.test(p);

    static now() {
        return moment();
    }

    static formatDate(date, short = false) {
        return moment(date).format(short ? DATE_FORMAT_SHORT : DATE_FORMAT_LONG);
    }

    static dateDiff(start, end, unitOfTime = 'day') {
        return moment(end).startOf('day').diff(moment(start).startOf('day'), unitOfTime, true);
    }

    static dateAdd(date, amount, unit = 'day') {
        return moment(date).add(amount, unit);
    }
}
