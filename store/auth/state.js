import Cookies from 'js-cookie';

function parseCookie(cookie) {
    try {
        return JSON.parse(cookie);
    } catch (error) {
        return null;
    }
}

export default () => ({
    callRefreshToken: '',
    userData: parseCookie(Cookies.get('u')),
    userToken: Cookies.get('t') || null,
    userTokenRefresh: Cookies.get('r') || null,
});
