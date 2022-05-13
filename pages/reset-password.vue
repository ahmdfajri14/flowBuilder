<template>
    <v-container fluid class="content-wrapper" fill-height>
        <v-row justify="center" align="center" class="">
            <v-col cols="6" align-self="center">
                <v-card class="card-content" elevation="3" outlined>
                    <v-row justify="center">
                        <v-col cols="10">
                            <v-card-text class="content mt-7">
                                <img
                                    :src="require(`~/assets/logo-dkm.svg`)"
                                    width="100"
                                    alt="logo-dkm"
                                />
                                <div class="content-reset-password mt-4">
                                    <h5 class="text-header h5-bold">Reset your password</h5>
                                    <p class="text-sub-header mt-4 mb-7 xl-regular">
                                        Enter the email address associated with your account and we will <br>
                                        send you a link reset to reset your password
                                    </p>
                                    <v-form ref="entryForm" @submit.prevent="submitForm">
                                        <label for="" class="s-bold">Email</label>
                                        <v-text-field
                                            class="mt-2"
                                            v-model="email"
                                            :rules="emailValidation"
                                            solo
                                        ></v-text-field>
                                        <div class="mt-1">
                                            <!-- <nuxt-link to="/reset-password-form"> -->
                                                <v-btn
                                                    type="submit"
                                                    class="btn-continue l-semibold text-white"
                                                    block
                                                    large
                                                    outlined
                                                >
                                                    Continue
                                                </v-btn>
                                            <!-- </nuxt-link> -->
                                            <nuxt-link to="/login">
                                                <v-btn
                                                    type="button"
                                                    class="btn-back-login mt-2 mb-5 l-semibold"
                                                    block
                                                    large
                                                    outlined
                                                >
                                                    Back to log in
                                                </v-btn>
                                            </nuxt-link>
                                        </div>
                                    </v-form>
                                </div>
                            </v-card-text>                    
                        </v-col>
                    </v-row>
                </v-card>

            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import AuthService from '../services/auth.service'
import { AlertUtils } from '../mixins/alert-utils'

export default {
    name: 'resetPassword',
    layout: 'LayoutReset',
    mixins: [
        AlertUtils
    ],
    data() {
        return {
            email: '',
            emailValidation: [
                v => !!v || 'Email is required',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'input harus bertipe email'            
            ]
        }
    },
    methods: {
        submitForm() {
            this.emailValidation = [
                v => !!v || 'Email is required',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'input harus bertipe email'
            ]
            const self = this
            setTimeout(function () {
                if(self.$refs.entryForm.validate()) {
                    AuthService.emailVerification(self.email)
                    .then((response) => {
                        // self.$router.push({ path: `/verify_code/${self.email}`})
                        self.$router.push('/reset-password-form');
                        self.alertSuccess(response.data.message.id)
                    }).catch(error => {
                        self.alertFailed(error.response.data.message.id)
                    })
                }
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-wrapper {
        .card-content {
            border-radius: 10px;
            .content-reset-password {
                .text-sub-header {
                    font-size: 17px;
                }

                .btn-continue {
                    background-color: #1799ac;
                    color: #ffffff;
                }
                a {
                    text-decoration: none;
                    .btn-back-login {
                        background-color: #fff;
                        border: 0 solid #fff;
                        color: #1799ac;
                        text-decoration: none;
                    }
    
                    .btn-back-login:hover {
                        background-color: #1799ac;
                        color: #ffffff;
                        transition: all .4s ease;
                        text-decoration: none;
                    }
                }
            }
        }
    }
        
</style>
