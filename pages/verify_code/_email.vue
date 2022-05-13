<template>
    <v-row class="section-login" justify="end">
        <v-col cols="7">
        <v-card class="card-register">
            <v-row justify="center" no-gutters>
            <v-col cols="8" md="8" lg="10" class="px-16 mt-16">
                <v-card-text class="card-content-register pa-15">
                <img
                    :src="require(`~/assets/logo-dkm.svg`)"
                    width="100"
                    alt="logo-dkm"
                />
                <h5 class="h5-bold">Verify your email address</h5>
                <p class="mt-4">
                    An email with verification code was just sent to your email <br> ju•••@••••.com
                </p>
                <v-form ref="formRegister">
                    <div class="mt-8">
                    <label for="" class="s-bold">Verification code</label>
                    <v-text-field
                        class="mt-2"
                        solo
                        v-model="formData.code"
                        :rules="verificationValid"
                    ></v-text-field>
                        <v-btn
                        type="button"
                        class="mt-4 btn-login l-semibold text-white"
                        block
                        large
                        @click="handleSubmit"
                        outlined
                        >
                        Verify email
                        </v-btn>
                    
                    </div>
                </v-form>
                <div>
                    <p class="text-center s-bold mt-3">Don’t receive the code ? 
                        <button class="resend-email" disabled @click="resendEmail">Resend</button>
                        <!-- <nuxt-link id="linkResend" style="pointer-events:none; color:#787878 !important"><span>Resend</span> 
                        </nuxt-link>  -->
                        <span id="count">({{ countDown }}s)</span>
                        
                    </p>
                </div>
                </v-card-text>
            </v-col>
            </v-row>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import AuthService from '../../services/auth.service'
import { AlertUtils } from '../../mixins/alert-utils'
export default {
    name: 'RegisterPages',
    layout: 'MainLayout',
    mixins: [
        AlertUtils
    ],
    mounted() {
        console.log(this.$route.params.email)
    },
    
    data() {
        return {
            countDown: 30,
            formData: {
                method: 'email',
                code: '',
            },
            verificationValid: [
                v   => v !== '' || 'Code is required'
            ],
            prevRoute: 'prev'
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    },
    watch: {
        countDown: {
            handler(value) {

                if (value > 0) {
                    setTimeout(() => {
                        this.countDown--;
                    }, 1000);
                }else {
                    const resend = document.querySelector('.resend-email')
                    const count = document.querySelector('#count')
                    count.style.display = 'none'
                    const codeColor = '#1799AC'
                    resend.style.color = codeColor
                    resend.removeAttribute('disabled')
                }

            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
        },

    methods: {
        ...mapActions({
            getVerificationCode: 'auth/getVerificationCode'
        }),

        handleSubmit() {
            console.log('ini route prev' + this.prevRoute.path);
            AuthService.verifyUser(this.formData.method, this.formData.code)
            .then((response) => {
                this.getVerificationCode(this.formData.code)
                this.alertSuccess(response.data.message.id)
                if (this.prevRoute.path === '/register') {
                    this.$router.push('/login')
                }else {
                    this.$router.push('/login')
            }
            }).catch((error) => {
                this.alertFailed(error.response.data.message.id)
            })
        },

        resendEmail() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start();
                setTimeout(() => {
                    AuthService.emailVerification(this.$route.params.email)
                    .then(res => {
                        this.$nuxt.$loading.finish()
                        this.alertSuccess(res.data.message.en)
                        this.countDown = 30
                        const count = document.querySelector('#count');
                        count.style.display = null
                        const resend = document.querySelector('.resend-email')
                        resend.style.color = null
                        resend.setAttribute('disabled', 'disabled')
                    }).catch(err => {
                        console.log(err);
                    })
                }, 3000)
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

    .resend-email {
        border: none;
        background: #fff;
    }
}
</style>
