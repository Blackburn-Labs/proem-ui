import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Parse module
const mockRegisterSubclass = vi.fn();

vi.mock('parse', () => ({
    default: {
        Object: class ParseObject {
            constructor(className) {
                this.className = className;
                this.attributes = {};
            }
            get(key) { return this.attributes[key]; }
            set(key, value) { 
                if (typeof key === 'object') {
                    Object.assign(this.attributes, key);
                } else {
                    this.attributes[key] = value;
                }
            }
            static registerSubclass = mockRegisterSubclass;
        },
    },
}));

describe('Profile Domain Model', () => {
    let Profile;

    beforeEach(async () => {
        // Clear module cache and re-import
        vi.resetModules();
        Profile = (await import('./Profile.js')).default;
    });

    describe('Basic Properties', () => {
        it('should have correct default values', () => {
            const profile = new Profile();
            
            expect(profile.name).toBe('');
            expect(profile.status).toBe(Profile.STATUS_ACTIVE);
            expect(profile.pic).toBeNull();
            expect(profile.phone).toBe('');
            expect(profile.email).toBe('');
            expect(profile.account).toBeUndefined();
        });

        it('should set and get properties correctly', () => {
            const profile = new Profile();
            
            profile.name = 'John Doe';
            profile.email = 'john@example.com';
            profile.phone = '123-456-7890';
            profile.status = Profile.STATUS_INACTIVE;
            
            expect(profile.name).toBe('John Doe');
            expect(profile.email).toBe('john@example.com');
            expect(profile.phone).toBe('123-456-7890');
            expect(profile.status).toBe(Profile.STATUS_INACTIVE);
        });

        it('should initialize with provided props', () => {
            const profile = new Profile({
                name: 'Jane Doe',
                email: 'jane@example.com',
                status: Profile.STATUS_ACTIVE,
            });
            
            expect(profile.name).toBe('Jane Doe');
            expect(profile.email).toBe('jane@example.com');
            expect(profile.status).toBe(Profile.STATUS_ACTIVE);
        });
    });

    describe('Status Constants', () => {
        it('should have correct status constants', () => {
            expect(Profile.STATUS_ACTIVE).toBe('ACTIVE');
            expect(Profile.STATUS_INACTIVE).toBe('INACTIVE');
            expect(Profile.STATUSES).toEqual(['ACTIVE', 'INACTIVE']);
            expect(Profile.STATUS_LABELS[Profile.STATUS_ACTIVE]).toBe('Active');
            expect(Profile.STATUS_LABELS[Profile.STATUS_INACTIVE]).toBe('Inactive');
        });
    });

    describe('Initials', () => {
        it('should generate correct initials from name', () => {
            const profile = new Profile();
            
            profile.name = 'John Doe';
            expect(profile.initials).toBe('JD');
            
            profile.name = 'Mary Jane Watson';
            expect(profile.initials).toBe('MJW');
            
            profile.name = 'Prince';
            expect(profile.initials).toBe('P');
            
            profile.name = '';
            expect(profile.initials).toBe('');
            
            profile.name = null;
            expect(profile.initials).toBe('');
        });

        it('should handle names with extra spaces', () => {
            const profile = new Profile();
            
            profile.name = '  John   Doe  ';
            expect(profile.initials).toBe('JD');
        });
    });

    describe('Profile Picture URL', () => {
        it('should return null when no picture is set', () => {
            const profile = new Profile();
            expect(profile.picUrl).toBeNull();
        });

        it('should return URL when picture has url function', () => {
            const profile = new Profile();
            profile.pic = {
                url: vi.fn(() => 'https://example.com/pic.jpg'),
            };
            
            expect(profile.picUrl).toBe('https://example.com/pic.jpg');
            expect(profile.pic.url).toHaveBeenCalled();
        });

        it('should return URL when picture has url property', () => {
            const profile = new Profile();
            profile.pic = {
                url: 'https://example.com/pic2.jpg',
            };
            
            expect(profile.picUrl).toBe('https://example.com/pic2.jpg');
        });
    });

    describe('Validation', () => {
        it('should be savable with valid data', () => {
            const profile = new Profile();
            profile.name = 'John Doe';
            profile.email = 'john@example.com';
            profile.status = Profile.STATUS_ACTIVE;
            
            expect(profile.isSavable()).toBe(true);
        });

        it('should not be savable without name', () => {
            const profile = new Profile();
            profile.email = 'john@example.com';
            
            expect(profile.isSavable()).toBe(false);
        });

        it('should not be savable with empty name', () => {
            const profile = new Profile();
            profile.name = '   ';
            profile.email = 'john@example.com';
            
            expect(profile.isSavable()).toBe(false);
        });

        it('should not be savable without email', () => {
            const profile = new Profile();
            profile.name = 'John Doe';
            
            expect(profile.isSavable()).toBe(false);
        });

        it('should not be savable with empty email', () => {
            const profile = new Profile();
            profile.name = 'John Doe';
            profile.email = '   ';
            
            expect(profile.isSavable()).toBe(false);
        });

        it('should not be savable with invalid status', () => {
            const profile = new Profile();
            profile.name = 'John Doe';
            profile.email = 'john@example.com';
            profile.status = 'INVALID_STATUS';
            
            expect(profile.isSavable()).toBe(false);
        });
    });

    describe('toString', () => {
        it('should return formatted string representation', () => {
            const profile = new Profile();
            profile.name = 'John Doe';
            profile.email = 'john@example.com';
            
            expect(profile.toString()).toBe('John Doe <john@example.com>');
        });
    });

    describe('Parse Registration', () => {
        it('should register with Parse as a subclass', () => {
            expect(mockRegisterSubclass).toHaveBeenCalledWith('Profile', Profile);
        });
    });
});