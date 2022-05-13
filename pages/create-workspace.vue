<template>
    <v-row class="section-workspace" justify="end">
        <v-col cols="7" class="col">
            <v-card class="card-workspace">
                <v-row justify="center" no-gutters>
                <v-col cols="8" md="10" lg="10" class="px-5 py-16">
                    <v-card-text class="card-content-workspace pa-15">
                    <img
                        :src="require(`~/assets/logo-dkm.svg`)"
                        width="100"
                        alt="logo-dkm"
                    />
                    <h5 class="h5-bold">Your workspace</h5>
                    <p class="mt-4">
                        Enter your workspace name
                    </p>
                    <v-form ref="formWorkspace" @submit.prevent="handleSubmit">
                        <div class="mt-8">
                            <label for="" class="s-bold">Workspace name</label>
                            <v-text-field
                                class="mt-2"
                                v-model="workspace"
                                :rules="workspaceValidation"
                                solo
                                label="e.g Acme workspace"
                            ></v-text-field>
                            <div class="mt-n3">
                                <v-btn
                                type="submit"
                                class="mt-1 btn-workspace l-semibold text-white"
                                block
                                large
                                outlined
                                >
                                Save
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
</template>

<script>
export default {
    name: 'CreateWorkspace',
    layout: 'MainLayout',
    data() {
        return {
            workspace: '',
            workspaceValidation: [
                v => !!v || 'Workspace tidak boleh kosong'
            ]
        }
    },
    methods: {
        handleSubmit() {
            const self = this
            self.workspaceValidation = [
                v => !!v || 'Workspace tidak boleh kosong'
            ]

            setTimeout(() => {
                if (self.$refs.formWorkspace.validate()) {
                    console.log('success created');
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.card-workspace {
    min-height: 100vh;
    .card-content-workspace {
        margin: 80px 10px;
        box-sizing: border-box;
    }
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

    .btn-workspace {
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
}
</style>
