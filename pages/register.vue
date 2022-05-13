<template>
    <v-row class="section-login" justify="end">
        <v-col cols="7">
        <v-card class="card-register">
            <v-row justify="center" no-gutters>
            <v-col cols="8" md="8" lg="10" class="px-16">
                <v-card-text class="card-content-register pa-15">
                <img
                    :src="require(`~/assets/logo-dkm.svg`)"
                    width="100"
                    alt="logo-dkm"
                />
                <h5 class="h5-bold">Hi, let`s get started!</h5>
                <p class="mt-4">
                    increase your revenue by leveraging the power of our chat bots
                </p>
                    <v-btn
                    class="mt-4 btn-google l-semibold text-white"
                    block
                    large
                    outlined
                    >
                    <v-icon left dark> mdi-google </v-icon>
                    Sign up with Google
                    </v-btn>
                <v-row no-gutters>
                    <v-col cols="5" class="divider">
                    <v-divider class="mt-5"></v-divider>
                    </v-col>
                    <v-col cols="2" class="divider-text">
                    <span>Or</span>
                    </v-col>
                    <v-col cols="5" class="divider">
                    <v-divider class="mt-5"></v-divider>
                    </v-col>
                </v-row>
                <v-form ref="formRegister" @submit.prevent="submitRegister">
                    <div class="mt-8">
                    <label for="" class="s-bold">Name</label>
                    <v-text-field
                        class="mt-2"
                        solo
                        v-model="data_register.username"
                        :rules="nameValidation"
                        label="Enter your name"
                    ></v-text-field>
                    <label for="" class="s-bold">Workspace name</label>
                    <v-text-field
                        class="mt-2"
                        solo
                        label="Enter your workspace name"
                        v-model="data_register.workspace"
                        :rules="workspaceValidation"
                    ></v-text-field>
                    <label for="" class="s-bold">Email</label>
                    <v-text-field
                        v-model="data_register.email"
                        :rules="emailValidation.concat(emailWithGmail)"
                        class="mt-2"
                        solo
                        label="Enter your email address..."
                    ></v-text-field>
                    <label for="" class="s-bold">No. Telp</label>
                    <v-text-field
                        v-model="data_register.phone_number"
                        :rules="phoneValidation"
                        class="mt-2"
                        solo
                        label="example: 62887678947xxx"
                    ></v-text-field>
                    <label for="" class="s-bold">Password</label>
                    <v-text-field
                        class="mt-2"
                        solo
                        v-model="data_register.password"
                        :rules="passwordValidation"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="handleShowPassword"
                    ></v-text-field>
                    <label for="" class="s-bold">Confirm password</label>
                    <v-text-field
                        class="mt-2"
                        solo
                        v-model="data_register.confirmPass"
                        :rules="confirmPassValidation.concat(passwordConfirmationRule)"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        :append-icon="
                        showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append="handleShowConfirmPassword"
                    ></v-text-field>
                    <nuxt-link to="/reset-password">
                        <p class="text-right xs-bold mt-n4 forgot-password">
                            Forgot Password?
                        </p>
                    </nuxt-link>

                    <v-checkbox v-model="data_register.aggree_term"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        color="info">
                        <template v-slot:label>
                        <div class="xs-bold">
                            By creating an account you aggree to the
                            <span class="text-checkbox">terms of use</span>
                            and our <span class="text-checkbox">privacy policy</span>
                        </div>
                        </template>
                    </v-checkbox>
                        <v-btn
                        type="submit"
                        class="mt-4 btn-login l-semibold text-white"
                        block
                        large
                        outlined
                        >
                        Create Account
                        </v-btn>
                    <div>
                        <p class="s-bold mt-3">Already hava an account ? <nuxt-link to="/login"><span style="color:#1799AC">Log in</span>   </nuxt-link> </p>
                    </div>
                    </div>
                </v-form>
                </v-card-text>
            </v-col>
            </v-row>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>
import AuthService from '../services/auth.service'
import { AlertUtils } from '../mixins/alert-utils'
export default {
    name: 'RegisterPages',
    layout: 'MainLayout',
    mixins: [
        AlertUtils
    ],
    data() {
        return {
        emailAvailable: false,
        showPassword: false,
        showConfirmPassword: false,
        nameValidation: [
            v   => v !== '' || 'Name is required'
        ],
        workspaceValidation: [
            v   => v !== '' || 'Workspace is required',

        ],
        emailValidation: [
            (v) => v !== '' || 'Email is required',
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'invalid email'
        ],
        phoneValidation: [
            v   => !!v || 'Phone number is required'
        ],
        // validation email 
        // /.+@.+/.test(v)
        passwordValidation: [
            (v) => v !== '' || 'Password is required',
            (v) => v.length <= 150 || 'Password cannot be more than 150 characters',
        ],
        confirmPassValidation: [
            v   => !!v || 'Confirm password is required'
        ],
        data_register: {
            email: '',
            username: '',
            workspace: '',
            password: '',
            phone_number: '',
            confirmPass: '',
            aggree_term: false,
        },
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () => 
                this.data_register.password === this.data_register.confirmPass
                || 'Confirm password harus sama dengan password'
            
        },
        emailWithGmail() {
            const emailwithGmail = this.data_register.email.split('@');
            const gmail = emailwithGmail[1]
            return gmail === 'gmail.com' || 'email must be provider with gmail'
        },
    },
    mounted() {
    },
    methods: {
        handleShowPassword() {
        this.showPassword = !this.showPassword
        },
        handleShowConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword
        },
        submitRegister() {
            const self = this
            self.nameValidation = [
                v   => v !== '' || 'Name is required',
                (v) => v.length <= 150 || 'Name cannot be more than 150 characters',

            ]
            self.workspaceValidation = [
                v   => v !== '' || 'Workspace is required',
                (v) => v.length <= 150 || 'Workspace cannot be more than 150 characters',
            ]
            const splitFindEmail = self.data_register.email.split('@');
            console.log('ini split fin email ' + splitFindEmail[1]);
            self.emailValidation = [
                (v) => v !== '' || 'Email is required',
                (v) => v.length <= 150 || 'Email cannot be more than 150 characters',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'invalid email',
                v => this.emailWithGmail || 'email must be provider with gmail'
            ]
            self.phoneValidation = [
                v => !!v || 'Phone number is required'
            ]
            self.passwordValidation = [
                (v) => v !== '' || 'Password is required',
                (v) => v.length <= 150 || 'Password cannot be more than 150 characters',
            ]
            self.confirmPassValidation = [
                v   => !!v || 'Confirm password is required'
            ]

            if (self.$refs.formRegister.validate()) {
                    AuthService.checkEmail(self.data_register.email)
                    .then((res) => {
                        console.log(res);
                        self.alertFailed('Email sudah tersedia')
                    }).catch((err) => {
                        console.log(err.response.data.message.en)
                        AuthService.register(self.data_register.email, self.data_register.username, 
                        self.data_register.workspace, self.data_register.password, self.data_register.phone_number)
                        .then((response) => {
                            console.log(response.data.message.id);
                            self.postEmailVerif(self.data_register.email)
                        }).catch(error => {
                            console.log(`ini error ${JSON.stringify(error.response)}`);
                            if (error.response.data) {
                                if (error.response.data.message) {
                                    self.alertFailed(error.response.data.message.id)
                                }else{
                                    self.alertFailed('Invalid number phone')
                                }
                            }else {
                                self.alertFailed('Invalid number phone')
                            }
                        })
                    }) 
                }

        },

        postEmailVerif(email) {
            this.$nextTick(() => {
            this.$nuxt.$loading.start()
                setTimeout(() => {
                    // hit api email verification
                    AuthService.emailVerification(email)
                    .then(response => {
                        this.$nuxt.$loading.finish()
                        this.$router.push({ path: `/verify_code/${email}`})
                        this.alertSuccess(response.data.message.id)
                        console.log('ini berhasil ' + response.data);
                    }).catch(error => {
                        self.alertFailed(error.response.data.message.id)
                    })
                }, 3000);
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.section-login {
    min-height: 100vh;
}
.card-register {
    min-height: 100vh;
    .btn-google {
        border: 1px solid #d8d8d8;
        background-color: #fff;
    }
    .h5-bold {
        color: #120309;
    }

    .divider {
        color: #c4c4c4;
    }

    .divider-text {
        position: relative;
        top: 10px;
        text-align: center;
        font-weight: 500px !important;
    }
    .forgot-password {
        color: #1799ac;
    }

    .text-checkbox {
        color: #1799AC;
    }

    .btn-login {
        background-color: #1799ac;
        color: #ffffff;

        .text-log {
        text-transform: capitalize;
        }

        .text-in {
        text-transform: lowercase;
        margin-left: 3px;
        }
    }

    a {
        text-decoration: none;
    }
}
</style>
