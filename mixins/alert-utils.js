import Vue from "vue"
import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)

export const AlertUtils = {
    data() {

    },
    methods: {
        alertSuccess(message) {
            const vm = this;
            vm.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: toast => {
                    toast.addEventListener("mouseenter", vm.$swal.stopTimer);
                    toast.addEventListener("mouseleave", vm.$swal.resumeTimer);
                }
            });
        },

        alertFailed(message) {
            const vm = this; 
            vm.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title: message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: toast => {
                    toast.addEventListener("mouseenter", vm.$swal.stopTimer);
                    toast.addEventListener("mouseleave", vm.$swal.resumeTimer);
                }
            })
        }
    }
}