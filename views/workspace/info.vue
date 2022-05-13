<template>
  <div>
    <!-- Photo Section -->
    <v-row no-gutters align="start" class="mb-12">
      <v-col cols="12" md="6" class="pr-5">
        <v-row no-gutters align="start" justify="space-between">
          <div>
            <p class="l-bold">Your workspace photo</p>
            <p class="m-regular">This will be displayed on your workspace</p>
          </div>
          <v-avatar color="primary" size="120">
            <span v-if="!currentWorkspace.logo" class="white--text xl-bold">{{
              currentWorkspace.display_name | getInitial
            }}</span>
            <div v-else style="height: 100%; height: 100%">
              <img :src="currentWorkspace.logo.url" alt="John" />
            </div>
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
    <v-form ref="form" lazy-validation>
      <v-row no-gutters align="center" class="mb-6">
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
      <v-row no-gutters align="center" class="mb-6">
        <v-col cols="4">
          <p class="l-bold">Timezone</p>
        </v-col>
        <v-col cols="8">
          <form-select-field
            v-model="input.timezone"
            label="Pick a timezone"
            :rules="rules.timezone"
            :items="list.tz"
          />
        </v-col>
      </v-row>
      <v-row no-gutters align="center" class="mb-6">
        <v-col cols="4">
          <p class="l-bold">Time Format</p>
        </v-col>
        <v-col cols="8">
          <form-select-field
            v-model="input.timeformat"
            label="Pick a timeformat"
          />
        </v-col>
      </v-row>
      <v-row no-gutters justify="end">
        <button-default label="Update" @click="update" />
      </v-row>
    </v-form>
  </div>
</template>
<script>
import momentTZ from 'moment-timezone'

export default {
  name: 'WorkspaceInfo',
  data: () => ({
    imgURL: '',
    namaFile: '',
    filePath: '',
    list: {
      tz: '',
    },
    input: {
      name: '',
      timeformat: '',
      timezone: '',
    },
    rules: {
      name: [(v) => !!v || 'Name is required'],
      timezone: [(v) => !!v || 'Timezone is required'],
      timeformat: [(v) => !!v || 'Timeformat is required'],
    },
  }),
  computed: {
    currentWorkspace() {
      return this.$store.state.workspace.currentWorkspace
    },
  },
  mounted() {
    this.fetchData()
    this.getTz()
  },
  methods: {
    async fetchData() {
      const res = await this.$store.state.workspace.currentWorkspace
      this.input.name = res.display_name
    },
    getTz() {
      const tempArray = momentTZ.tz.names().map((item) => {
        return `(UTC${momentTZ.tz(item).format('Z')}) ${item}`
      })
      this.list.tz = tempArray
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
    async update() {
      if (!this.validate()) {
        this.loading = false
        return
      }
      const isAvatarChanged = async () => {
        let tempId = ''
        if (this.filePath) {
          tempId = await this.uploadFile()
        } else {
          tempId = this.$store.state.workspace.currentWorkspace.logo.id62
        }
        return tempId
      }

      const id = await isAvatarChanged()
      const payload = {
        headers: `Token ${this.$store.state.auth.userToken}`,
        data: {
          avatar: id,
          timezone: this.input.timezone,
          timeformat: 'DD MMMM YYYY',
          display_name: this.input.name,
        },
        params: {
          id: this.$store.state.workspace.currentWorkspace.id62,
        },
      }
      const res = await this.$api.call('workspace.update', payload)
      console.log(res)
    },
    validate() {
      const res = this.$refs.form.validate()
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
</style>
