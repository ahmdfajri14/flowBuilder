<template>
  <div>
    <!-- Content Plan -->
    <v-row class="content-plan" align="start" justify="start">
      <v-col cols="11">
        <div class="header">
          <div class="text-header">
            <h5 class="h5-bold">Welcome to HaloBuilder!</h5>
            <p class="h6-regular">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
              aspernatur.
            </p>
            <p class="h6-regular">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est,
              nostrum.
            </p>
          </div>

          <div class="content mt-10">
            <p class="h6-bold">Our flexible plans for you</p>
            <VueSlickCarousel v-bind="settings" ref="carousel">
              <div class="d-inline-flex">
                <v-card class="mt-5 pa-4" min-width="350" outlined>
                  <v-list-item three-line>
                    <v-list-item-content class="mt-5">
                      <div class="l-bold mb-7">Free Plan</div>
                      <v-list-item-title class="h5-bold mb-1">
                        Rp0,-
                      </v-list-item-title>
                      <v-list-item-subtitle class="xl-bold"
                        >/month</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn class="btn-free-plan" outlined large block>
                      Current Plan
                    </v-btn>
                  </v-card-actions>
                  <div class="plan-includes pa-4">
                    <p class="m-semibold">This plan includes:</p>
                    <ul class="s-regular mt-2">
                      <li>1 bot</li>
                      <li>1000 bot users includes</li>
                      <li>5 members included</li>
                    </ul>
                  </div>
                </v-card>
                <v-card
                  class="card-starter-plan ml-5 mt-5 pa-4"
                  min-width="350"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content class="mt-5">
                      <div class="d-inline">
                        <p class="float-start l-bold mb-6">Starter Plan</p>
                        <v-chip
                          class="
                            float-end
                            s-bold
                            mt-n1
                            chip-text
                            justify-center
                          "
                          color="blue"
                          filter
                          label
                          >Recomended</v-chip
                        >
                      </div>
                      <v-list-item-title class="h5-bold mb-1">
                        Rp129.000,-
                      </v-list-item-title>
                      <v-list-item-subtitle class="xl-bold"
                        >/month</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      class="btn-starter-plan"
                      depressed
                      color="error"
                      large
                      block
                    >
                      Try for free
                    </v-btn>
                  </v-card-actions>

                  <div class="plan-includes pa-4">
                    <p class="m-semibold">This plan includes:</p>
                    <ul class="list-check-red s-regular mt-2">
                      <li>1 bot</li>
                      <li>1000 bot users includes</li>
                      <li>5 members included</li>
                    </ul>
                  </div>
                </v-card>
                <v-card
                  class="card-business-plan ml-5 mt-5 pa-4"
                  min-width="350"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content class="mt-5">
                      <div class="l-bold mb-4">Business Plan</div>
                      <v-list-item-title class="h5-bold mb-1">
                        Contact us
                      </v-list-item-title>
                      <v-list-item-subtitle class="xl-bold"
                        >/month</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      class="btn-business-plan"
                      depressed
                      color="error"
                      large
                      block
                    >
                      Try for free
                    </v-btn>
                  </v-card-actions>

                  <div class="plan-includes pa-4">
                    <p class="m-semibold">This plan includes:</p>
                    <ul class="s-regular mt-2">
                      <li>1 bot</li>
                      <li>1000 bot users includes</li>
                      <li>5 members included</li>
                    </ul>
                  </div>
                </v-card>
                <v-card
                  class="card-business-plan ml-5 mt-5 pa-4"
                  min-width="350"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content class="mt-5">
                      <div class="l-bold mb-4">Business Plan</div>
                      <v-list-item-title class="h5-bold mb-1">
                        Contact us
                      </v-list-item-title>
                      <v-list-item-subtitle class="xl-bold"
                        >/month</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      class="btn-business-plan"
                      depressed
                      color="error"
                      large
                      block
                    >
                      Try for free
                    </v-btn>
                  </v-card-actions>

                  <div class="plan-includes pa-4">
                    <p class="m-semibold">This plan includes:</p>
                    <ul class="s-regular mt-2">
                      <li>1 bot</li>
                      <li>1000 bot users includes</li>
                      <li>5 members included</li>
                    </ul>
                  </div>
                </v-card>
              </div>
            </VueSlickCarousel>
            <div class="d-none">
              <v-btn icon @click="showPrevious()">
                <!-- <icon-solid-chevron-left /> -->
                Previous
              </v-btn>
              <v-btn icon @click="showNext()">
                <!-- <icon-solid-chevron-right /> -->
                Next
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- End Content Plan -->

    <!-- Content Form Login  -->
    <v-row class="content-login" justify="end" no-gutters>
      <v-col cols="6" class="">
        <v-card class="card-login mx-auto" elevation="15">
          <v-row justify="center">
            <v-col class="pa-5">
              <v-card-text class="card-content-login pa-16 px-16">
                <img :src="require(`~/assets/logo-dkm.svg`)" alt="logo-dkm" />
                <h5 class="h5-bold">Hi, welcome back !</h5>
                <p class="mt-4">Please sign in to use our chat bot builder</p>
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
                <v-form ref="formLogin" @submit.prevent="submitLogin">
                  <div class="mt-8">
                    <label for="" class="s-bold">Email</label>
                    <v-text-field
                      v-model="data_login.email"
                      :rules="emailValidation"
                      class="mt-2"
                      type="email"
                      solo
                      label="Enter your email address"
                    ></v-text-field>
                    <label for="" class="s-bold">Password</label>
                    <v-text-field
                      v-model="data_login.password"
                      class="mt-2"
                      solo
                      :rules="passwordValidation"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="handleShowPassword"
                    ></v-text-field>
                    <nuxt-link to="/reset-password">
                      <p class="text-right xs-bold mt-n4 forgot-password">
                        Forgot Password?
                      </p>
                    </nuxt-link>
                    <v-btn
                      type="submit"
                      class="mt-4 btn-login l-semibold text-white"
                      block
                      large
                      outlined
                    >
                      Login
                    </v-btn>
                    <p class="s-bold">
                      Not registered yet ?
                      <nuxt-link to="/register"
                        ><span>Create an account</span></nuxt-link
                      >
                    </p>
                  </div>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- End Content Plan -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import { AlertUtils } from '../mixins/alert-utils'
// import AuthService from '../services/auth.service'
export default {
  name: 'LoginPages',
  components: {
    VueSlickCarousel,
  },
  mixins: [AlertUtils],
  layout: 'MainLayout',
  asyncData(context) {
    if (context.store.getters['auth/getUserToken']) {
      context.app.router.push('/dashboard')
    }
  },
  data() {
    return {
      settings: {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 5,
      },
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      showPassword: false,
      isvalid: false,
      emailValidation: [(v) => v !== '' || 'Email tidak boleh kosong'],
      passwordValidation: [
        (v) => v !== '' || 'Password tidak boleh kosong',
        (v) =>
          v.length <= 100 || 'Password tidak boleh lebih dari 100 karakter',
      ],
      data_login: {
        email: '',
        password: '',
        device_id: 'Device-2022',
      },
    }
  },
  methods: {
    handleShowPassword() {
      this.showPassword = !this.showPassword
    },
    ...mapActions({
      setToken: 'auth/setTokenParams',
    }),

    async submitLogin() {
      const self = this
      self.emailValidation = [
        (v) => v !== '' || 'Email is required',
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'input harus bertipe email',
      ]

      self.passwordValidation = [
        (v) => v !== '' || 'Password is required',
        (v) => v.length <= 100 || 'Password cannot be more than 150 characters',
      ]

      // setTimeout(() => {
      //   if (self.$refs.formLogin.validate()) {
      // execute API Login
      try {
        await this.$store.dispatch('auth/authCreate', {
          data: {
            username: this.data_login.email,
            password: this.data_login.password,
            device_id: 'Dekstop-2323',
          },
        })
        
        this.$router.push('/dashboard')
      } catch (error) {
        console.log(error)
        this.alertFailed(
          'Login gagal, Pastikan email dan password anda benar !'
        )
      }
      // AuthService.login(self.data_login.email, self.data_login.password)
      // .then(response => {
      //   self.$router.push('/');
      //   self.alertSuccess(response.data.message.id);

      //   // catch token
      //   self.setToken(response.data.data.token)
      // }).catch(error => {
      //     console.log(error);
      //     self.alertFailed('Login gagal, Pastikan email dan password anda benar !');
      // })
      //   }
      // })
    },
    showNext() {
      this.$refs.carousel.next()
    },
    showPrevious() {
      this.$refs.carousel.prev()
    },
  },
}
</script>

<style lang="scss" scoped>
.content-login {
  height: 100%;
  min-width: 1200px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}
.header {
  margin: 80px 30px 10px 30px;
  color: #fff;
  p {
    font-size: 18px !important;
  }

  .content {
    .h5-bold {
      font-size: 35px;
    }

    .xl-bold {
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;
    }
    .btn-free-plan {
      border: 1px solid #1799ac;
      color: #1799ac;
      border-radius: 10px;
      margin-top: 25px;
    }
    .btn-starter-plan {
      color: #fff;
      border-radius: 10px;
      margin-top: 25px;
    }
    .btn-business-plan {
      background: #1799ac !important;
      color: #fff;
      border-radius: 10px;
      margin-top: 25px;
    }
    .m-semibold {
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
    }

    .s-regular {
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 21px;
    }

    ul {
      list-style-image: url('~/assets/icon-check.png');
      li {
        padding-left: 10px;
      }
    }

    ul.list-check-red {
      list-style-image: url('~/assets/icon-check-red.png');
    }

    .card-starter-plan {
      background: #fff6cc;

      .chip-text {
        background: #0933a6 !important;
        color: #fff;
        min-width: 150px;
        border-radius: 10px !important;
      }
    }
  }
}
.card-login {
  height: 100%;
  // min-height: 100vh;
  .h5-bold {
    color: #120309;
  }

  .card-content-login {
    min-height: 100vh;
    .divider {
      color: #c4c4c4;
    }

    .divider-text {
      position: relative;
      top: 10px;
      text-align: center;
      font-weight: 500px !important;
    }

    a {
      text-decoration: none;
    }

    p.s-bold {
      margin-top: 15px;
      span {
        color: #1799ac;
      }
    }
  }
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
</style>
