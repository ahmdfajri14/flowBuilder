import * as types from '@/store/constants';

export default {
    [types.PROFILE_SHOW](state, payload) {
        state.userProfile = payload
    },

    [types.PROFILE_CREATE](state, payload) {
        state.userProfile = payload.user
    },

};
