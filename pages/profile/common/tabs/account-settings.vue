<template>
  <div>
    <v-row v-if="loading" justify="center">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
    <div v-else>
      <!-- Photo Section -->
      <v-row no-gutters align="start" class="mb-12">
        <v-col cols="12" md="6" class="pr-5">
          <v-row no-gutters align="start" justify="space-between">
            <div>
              <p class="l-bold">Your photo</p>
              <p class="m-regular">This will be displayed on your profile</p>
            </div>
            <v-avatar color="primary" size="120">
              <img
                :src="dataUser.profile.avatar.url"
                alt="picture-profile"
                class="image-preview"
              />
            </v-avatar>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="pl-5">
          <div v-if="!filePath" class="upload-wrapper" @click="handleUpload">
            <input
              id=""
              ref="fileUpload"
              type="file"
              accept="image/x-png,image/jpeg,image/jpg"
              name=""
              hidden
              @change="eventHandleFile"
            />
            <v-btn icon :ripple="false" class="mb-4">
              <div class="icon-wrapper rounded-circle">
                <icon-outline-upload-simple />
              </div>
            </v-btn>

            <p class="s-regular text-center">
              <a>Click to upload</a> or drag and drop PNG <br />
              or JPG (max. file size 1mb)
            </p>
          </div>
          <div v-if="filePath" class="upload-wrapper">
            <v-avatar color="primary" size="120" class="mb-4">
              <img
                id="imagePreview"
                :src="filePath"
                alt="image-preview"
                class="image-preview"
              />
            </v-avatar>
            <p class="s-regular text-center">
              This is your image preview <br />
              <a @click="removeFilePath">Click here to remove</a>
            </p>
          </div>
        </v-col>
      </v-row>
      <!-- Form Section -->
      <v-form ref="setting">
        <v-row no-gutters align="center" class="mb-8">
          <v-col cols="4">
            <p class="l-bold">Name</p>
          </v-col>
          <v-col cols="8">
            <form-text-field
              v-model="input.name"
              label="Input Name"
              :rules="rules.name"
            />
          </v-col>
        </v-row>
        <v-row no-gutters align="center" class="mb-8">
          <v-col cols="4">
            <p class="l-bold">Email Address</p>
          </v-col>
          <v-col cols="8">
            <form-text-field
              v-model="input.email"
              type="email"
              label="Input Email"
              disabled
            />
          </v-col>
        </v-row>
        <v-row no-gutters align="center" class="mb-8">
          <v-col cols="4">
            <p class="l-bold">Timezone</p>
          </v-col>
          <v-col cols="8">
            <form-select-field
              v-model="input.timezone"
              label="Pick a timezone"
              :rules="rules.timezone"
            />
          </v-col>
        </v-row>
        <v-row no-gutters align="center" class="mb-8">
          <v-col cols="4">
            <p class="l-bold">Time Format</p>
          </v-col>
          <v-col cols="8">
            <form-select-field
              v-model="input.timeformat"
              label="Pick a timeformat"
              :rules="rules.timeformat"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row no-gutters justify="end">
        <button-default label="Update" @click="updateProfile" />
      </v-row>
    </div>
  </div>
</template>
<script>
/* eslint-disable camelcase */

export default {
  data: () => ({
    loading: false,
    loadingButton: false,
    imgURL: '',
    namaFile: '',
    filePath: '',
    input: {
      name: '',
      timeformat: '',
      timezone: '',
      email: '',
    },
    rules: {
      name: [(value) => !!value || 'Please enter your name'],
      timeformat: [(value) => !!value || 'Please enter choose timeformat'],
      timezone: [(value) => !!value || 'Please enter choose timezone'],
    },
  }),
  computed: {
    dataUser() {
      return this.$store.state.profile.userProfile
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const headers = {
        headers: `Token ${this.$store.state.auth.userToken}`,
      }
      try {
        this.loading = true
        const response = await this.$api.call('profile.show', headers)
        const { data, status_code } = response
        const { name, email } = data

        if (status_code === 200) {
          this.input.name = name
          this.input.email = email
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleUpload() {
      this.$refs.fileUpload.click()
    },

    eventHandleFile(event) {
      const [files] = event.target.files
      if (event.target.files.length) {
        if (files.size <= 1048000) {
          const namaFile = files.name
          this.createBase64Image(files, namaFile)
        } else {
          this.alertFailed('File lebih dari 1 mb')
        }
      }
    },
    createBase64Image(file, namaFile) {
      const reader = new FileReader()
      this.filePath = URL.createObjectURL(file)
      this.namaFile = namaFile
      reader.onload = (e) => {
        this.imgURL = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeFilePath() {
      this.filePath = ''
    },
    async uploadFile() {
      const payload = {
        data: {
          file_name: this.namaFile,
          file_base64: this.imgURL,
        },
      }

      const res = await this.$api.call('media.upload', payload)
      const id = res.data.file_id62
      return id
    },
    async updateProfile() {
      if (!this.validate()) {
        this.loading = false
        return
      }
      const isAvatarChanged = async () => {
        let tempId = ''
        if (this.filePath) {
          tempId = await this.uploadFile()
        } else {
          tempId = this.dataUser.profile.avatar.avatar
        }
        return tempId
      }

      const id = await isAvatarChanged()
      const payload = {
        headers: `Token ${this.$store.state.auth.userToken}`,
        data: {
          avatar: id,
          timezone: '',
          timeformat: '',
          name: this.input.name,
        },
      }
      const res = await this.$api.call('profile.post', payload)
      console.log(res)
    },
    validate() {
      const res = this.$refs.setting.validate()
      return res
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 48px 24px;

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    background: #f2fcfd;
  }
}

.image-preview {
  object-fit: cover;
}
</style>
