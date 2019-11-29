import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {

    getToken() {
        return localStorage.getItem('auth_token');
    }

    decode(token) {
        return jwt.decode(token)
    }

    invalidateUser() {
        localStorage.removeItem('auth_token');
    }

    getUsername() {
        return this.decode(this.getToken()).username;
    }

    getExpiration(token) {
        const exp = this.decode(token).exp;
        return moment.unix(exp);
    }

    isValid(token) {
        return moment().isBefore(this.getExpiration(token));
    }

    isAuthenticated() {
        const token = this.getToken();

        if (token && this.isValid(token)) {
            return true;
        } else {
            return false;
        }
    }
}

export default new AuthService();
