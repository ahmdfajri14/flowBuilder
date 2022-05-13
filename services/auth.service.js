
import Vue from 'vue'
import axios from 'axios'
import baseUrl from './base-url';

Vue.use(axios)

const API_URL = baseUrl() + '/authentication/authenticate/'
class AuthService  {
    login(username, password, deviceId = 'Dekstop-2323') {
        const formData = {
            username,
            password,
            device_id: deviceId
        }
        return axios.post(API_URL + 'password/', formData);
    }

    register(email, fullName, workspace, password, phoneNumber) {
        const formData = {
            email,
            full_name: fullName,
            workspace,
            password,
            phone_number: phoneNumber,
        }
        return axios.post(API_URL + 'basic-register/', formData);
    }

    checkEmail(email) {
        return axios.post(API_URL + 'check-username/', {
            username: email
        });
    }

    emailVerification(email) {
        return axios.post(API_URL + 'send-email-verification/', {
            email
        });
    }

    verifyUser(method, code) {
        const formData = {
            method,
            code
        }

        return axios.post(API_URL + 'verify-user/', formData);
    }

    formResetPassword(password, type, forgotToken) {
        const formData = {
            password,
            type,
            forgot_token: forgotToken
        }
        return axios.post(API_URL + 'set-password/', formData);
    }


}


export default new AuthService();