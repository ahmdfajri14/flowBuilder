import Cookies from 'js-cookie';

export default function(context) {
    // refresh still unstable
    /* if (Cookies.get('r')) {
        // console.log('context.store', context.store.dispatch('auth/authRefresh', {
        //     data: {
        //         refresh: Cookies.get('r')
        //     }
        // }));
        await context.store.dispatch('auth/authRefresh', {
            data: {
                refresh: Cookies.get('r'),
            },
        });
    } */

    context.$axios.onRequest(config => {
        if (Cookies.get('t')) {
            config.headers.common.Authorization = `Bearer ${Cookies.get('t')}`;
        }
    });

    if (Cookies.get('t')) {
        context.$axios.setToken(Cookies.get('t'), 'Token');
    }

    context.$axios.onResponseError(res => {
        throw res.response === undefined ? { message: res.message } : res.response.data;
    });
}
