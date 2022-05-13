export const state = () => ({
    token: null,
    code_otp: '3563',
});

export const mutations = {
    getToken(state, token) {
        state.token = token
    },

    getVerificationCode(state, code) {
        state.code_otp = code
    }
}

export const actions = {
    setTokenParams({ commit }, token) {
        commit('getToken', token);
    },

    getVerificationCode({ commit }, code) {
        commit('getVerificationCode', code)
    }
}
