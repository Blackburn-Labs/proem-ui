import { User } from '../domain';

const OBJECT_KEY = 'cf634ddc43f63e1c';
const TOKEN_KEY = 'd0fcd7db81234ec5';

/**
 * Utility used to store User object & token in session storage so we can recover the session between browser refreshes.
 * The token is in the user object. However, we store it separately in the session storage too, for quick access. This
 * is because the token is requested often for the HTTP header, so we don't want to have to convert the user object into
 * a User object every time just to get the token.
 */
export default class SessionUtils {
    static token = () => sessionStorage.getItem(TOKEN_KEY);

    static get = () => {
        const u = sessionStorage.getItem(OBJECT_KEY);
        if (u != null) {
            return new User(JSON.parse(u));
        }

        return undefined;
    };

    static set = (user) => {
        sessionStorage.setItem(TOKEN_KEY, user.sessionToken);
        sessionStorage.setItem(OBJECT_KEY, JSON.stringify(user));
    };

    static clear = () => {
        sessionStorage.clear();
    };
}
