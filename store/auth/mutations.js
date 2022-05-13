import Cookies from 'js-cookie';
import * as types from '@/store/constants';

export default {
    [types.AUTH_CREATE](state, payload) {
        state.userData = payload.email;
        state.userToken = payload.token;
        state.userTokenRefresh = payload.refresh;
        Cookies.set('u', state.userData);
        Cookies.set('t', state.userToken);
        Cookies.set('r', state.userTokenRefresh);
    },

    [types.AUTH_DATA_UPDATE](state, payload) {
        state.userData = payload;
        Cookies.set('u', state.userData);
    },

    [types.AUTH_DESTROY](state) {
        state.userData = null;
        state.userToken = null;
        state.userTokenRefresh = null;

        Cookies.remove('u');
        Cookies.remove('t');
        Cookies.remove('r');
        Cookies.remove('p');
    },
    [types.AUTH_REFRESHTOKEN](state, temp) {
        state.callRefreshToken = temp;
    },
};
