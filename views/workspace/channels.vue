<template>
  <div>
    <p class="xl-bold">Channel Settings</p>
    <p class="m-regular mb-12">
      Hide the channel or set the maximum bots limit for each channel
    </p>

    <v-row no-gutters class="mb-6">
      <v-col
        v-for="bot in botChannel"
        :key="bot.name"
        cols="3"
        class="px-2 column-spacing"
      >
        <v-row no-gutters align="center" class="mb-4">
          <component :is="bot.icon" class="mr-2" />
          <p class="s-semibold">{{ bot.name }}</p>
        </v-row>
        <form-select-field
          v-model="input.bot[bot.name.toLowerCase()]"
          label="Pick a bot qty"
          :items="listQuantityBot"
          hide-details
        />
      </v-col>
    </v-row>

    <button-default label="Send Invitation" />
  </div>
</template>
<script>
export default {
  name: 'BotChannel',
  data: () => ({
    bot: {
      facebook: '',
      instagram: '',
      telegram: '',
      whatsapp: '',
    },
  }),
}
</script>
