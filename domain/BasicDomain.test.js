import BasicDomain from './BasicDomain';

describe('BasicDomain', () => {
    describe('equals', () => {
        it('returns true for the same object', () => {
            const a = new BasicDomain();
            expect(a.equals(a)).toBeTruthy();
        });

        it('returns false for different objects', () => {
            const a = new BasicDomain();
            const b = new BasicDomain();
            expect(a.equals(b)).toBeFalsy();
        });
    });
});
