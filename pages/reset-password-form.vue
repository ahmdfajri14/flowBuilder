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
                                <v-form ref="createForm" @submit.prevent="handleSubmitForm">
                                    <div class="content-reset-password mt-4">
                                        <h5 class="text-header h5-bold">Create new password</h5>
                                        <p class="text-sub-header mt-4 mb-7 xl-regular">
                                            Your new password must be different from previous used <br>
                                            password
                                        </p>
                                        <label for="" class="s-bold">Code Verification</label>
                                        <v-text-field
                                            class="mt-2"
                                            v-model="formData.code"
                                            :rules="codeValidation"
                                            type="text"
                                            solo
                                        ></v-text-field>
                                        <label for="" class="s-bold">New password</label>
                                        <v-text-field
                                            class="mt-2"
                                            v-model="formData.password"
                                            :rules="passwordValidation"
                                            :type="show_new_password ? 'text' : 'password'"
                                            :append-icon="show_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="handleShowNewPassword"
                                            solo
                                        ></v-text-field>
                                        <label for="" class="s-bold">Confirm new password</label>
                                        <v-text-field
                                            class="mt-2"
                                            v-model="formData.confirmPass"
                                            :rules="confirmPassValidation.concat(passwordValidationRules)"
                                            :type="show_confirm_password ? 'text' : 'password'"
                                            :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="handleShowConfirmPassword"
                                            solo
                                        ></v-text-field>
                                        <div class="mt-1 mb-5">
                                            <v-btn
                                                type="submit"
                                                class="btn-reset l-semibold text-white"
                                                block
                                                large
                                                outlined
                                            >
                                                Reset password
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-form>
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
    name: 'resetFormPassword',
    layout: 'LayoutReset',
    mixins: [
        AlertUtils
    ],
    data() {
        return {
            formData: {
                password: '',
                type: 'forgot_password',
                confirmPass: '',
                code: ''
            },
            codeValidation: [
                v => !!v || 'Code is required'
            ],
            passwordValidation: [
                v => !!v || 'Password is required',
                (v) => v.length <= 150 || 'Password cannot be more than 150 characters',
            ],
            confirmPassValidation: [
                v => !!v || 'Confrim Password is required',
                (v) => v.length <= 150 || 'Confrim Password cannot be more than 150 characters',
            ],
            show_new_password: false,
            show_confirm_password: false
        }
    },
    computed: {
        code_verif() {
            return this.$store.state.auth.code_otp;
        },
        passwordValidationRules() {
            return () => 
            this.formData.password === this.formData.confirmPass ||
            'Confirm Password harus sama dengan password'
        },
        
    },
    methods: {
        
        handleShowNewPassword() {
            this.show_new_password = !this.show_new_password;
        },
        handleShowConfirmPassword() {
            this.show_confirm_password = !this.show_confirm_password;
        },
        handleSubmitForm() {
            const self = this;
            self.codeValidation = [
                v => !!v || 'Code is required'
            ]
            self.passwordValidation = [
                v => !!v || 'Password tidak boleh kosong',
                (v) => v.length <= 150 || 'Password cannot be more than 150 characters',
            ];
            self.confirmPassValidation = [
                v => !!v || 'Confrim Password tidak boleh kosong',
                (v) => v.length <= 150 || 'Confirm Password cannot be more than 150 characters',
            ]
            setTimeout(() => {
                if (self.$refs.createForm.validate()) {
                    // isi action 
                    AuthService.formResetPassword(self.formData.password, self.formData.type, self.formData.code)
                    .then((response) => {
                        self.alertSuccess(response.data.message.id)
                        self.$router.push('/login');
                    }).catch((error) => {
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

                .btn-reset {
                    background-color: #1799ac;
                    color: #ffffff;
                }
            }
        }
    }
        
</style>
