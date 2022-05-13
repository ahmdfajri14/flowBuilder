/* eslint-disable */

import ep from './endpoints';

function urlBuilder() {
    if (this.params) {
        return Object.keys(this.params)
            .reduce((url, key) =>
                url.replace(`:${key}`, this.params[key]),
                    this.url
        );
    }
    return this.url;
}

function caller(app) {
    return async function api(...args) {
        const [name, method] = this.split('.');
        const context = Object.assign({}, ep[name][method]);
        ['data', 'params', 'opt', 'query'].forEach(v => {
            context[v] = args[0][v] || null;
        });
        context.url = urlBuilder.call(context);
        context.params = context.query;

        return ajax.apply(app, [context, ep]);
        // return require(`./${name}`).default[method]
        //     .apply(app, [context, ep]);
    };
}

async function ajax(context) {
    try {
        const response = await this.$axios(context);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default ({ app }, inject) => {
    inject('api', caller(app));
};