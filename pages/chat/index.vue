<template>
  <v-row class="section-chat" no-gutters>
    <v-col cols="3" class="chat-list pt-12">
      <div class="chat-list-select">
        <v-select 
          v-model="defaultSelected" 
          :items="company" 
          chips 
          item-text="name" 
          :menu-props="{ closeOnClick: true, botttom: true, offsetY: true }" 
          return-object 
          class="dropdown"
          flat 
          solo
        >
          <template #item="data">
            <div class="d-flex align-center pl-3">
              <component :is="data.item.icon" />
              <span class="pl-3">{{ data.item.name }}</span>
            </div>
          </template>
          <template #selection="{item}">
            <v-chip class="chip" color="white" disabled large>
              <component :is="item.icon" class="icon" />{{item.name}}
            </v-chip>
          </template>
        </v-select>
      </div>
      <v-list class="chat-list-content">
        <v-list-item-group v-model="selectedChat" color="secondary" mandatory>
          <template v-for="(item, index) in items">
            <v-list-item
              :key="index"
              class="list-item px-0"
              link
              :value="item"
            >
              <v-badge
                avatar
                overlap
                bottom
                color="transparent"
                offset-x="32"
                offset-y="25"
              >
                <template #badge>
                  <v-avatar size="14">
                    <icon-others-social-whatsapp />
                  </v-avatar>
                </template>

                <v-list-item-avatar size="40">
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
              </v-badge>

              <v-list-item-content class="pr-6">
                <v-list-item-title class="title d-flex justify-space-between align-center mb-1nn">
                  <span class="name">{{ item.username }}</span>
                  <span class="time">
                    {{ new Date(item.messages[item.messages.length - 1].posted_at).toLocaleTimeString('en-gb', { hour: '2-digit', minute: '2-digit' } ) }}
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle class="message">{{ item.messages[item.messages.length - 1].message }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider
              v-if="index < (items.length - 1)"
              :key="index"
              :inset="item.inset"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-col cols="6" class="chat px-6 pt-12">
      <div class="chat-top d-flex justify-space-between pb-4">
        <div class="user">
          <v-avatar>
            <img
              :src="selectedChat.avatar"
              :alt="selectedChat.username"
            >
          </v-avatar>
          <span class="name pl-2">{{ selectedChat.username }}</span>
        </div>
        <v-icon>
          mdi-dots-horizontal
        </v-icon>
      </div>
      <v-divider></v-divider>
      <div class="chat-content">
        <div v-for="(message, index) in selectedChat.messages" :key="index">
          <p 
            v-if="index === 0 || !checkIfSameDate(selectedChat.messages[index - 1].posted_at, message.posted_at)" 
            class="d-flex justify-center py-6"
          >
            Conversation started on: {{ convertToSimpleDate(message.posted_at) }}
          </p>
          <div v-if="selectedChat.userNs === message.posted_by">
            <div class="sender">{{ message.posted_by }}</div>
            <v-card 
              class="message" 
              color="secondary"
              max-width="50%" 
              width="fit-content"
              elevation=0
            >
              {{ message.message }}
            </v-card>
            <div class="time">
              {{ new Date(message.posted_at).toLocaleTimeString('en-gb', { hour: '2-digit', minute: '2-digit' } ) }}
            </div>
          </div>
          <div v-else class="message d-flex flex-column align-end">
            <div class="sender">TeamHaloBuilder</div>
            <v-card 
              class="own-message" 
              color="#F0F4FE"
              max-width="50%" 
              width="fit-content"
              elevation=0
            >
              {{ message.message }}
            </v-card>
            <div class="time">
              {{ new Date(message.posted_at).toLocaleTimeString('en-gb', { hour: '2-digit', minute: '2-digit' } ) }}
            </div>
          </div>
        </div>
      </div>
      <div class="chat-box" flat>
        <v-divider class="pb-3"></v-divider>
        <v-textarea rows="3" append-icon="mdi-send-circle" placeholder="Add your message here"></v-textarea>
        <div class="icon-group">
          <v-icon>mdi-emoticon-happy-outline</v-icon>
          <v-icon>mdi-image-outline</v-icon>
          <v-icon>mdi-file-tree-outline</v-icon>
        </div>
      </div>
    </v-col>
    <v-col class="user-profile pt-12" cols="3">
      <div class="user-profile-content">
        <div class="icon-based">
          <v-icon>mdi-phone-outline</v-icon>
          <span class="value pl-2">{{ selectedChat.phoneNumber }}</span>
        </div>
        <div class="icon-based">
          <v-icon>mdi-email-outline</v-icon>
          <span class="value pl-2">{{ selectedChat.email }}</span>
        </div>
        <div class="icon-based">
          <v-icon>mdi-whatsapp</v-icon>
          <span class="value pl-2">{{ selectedChat.whatsapp }}</span>
        </div>
        <div class="text-based">
          <span class="label">User NS</span>
          <span class="value">{{ selectedChat.userNs }}</span>
        </div>
        <div class="text-based">
          <span class="label">User Name</span>
          <span class="value">{{ selectedChat.username }}</span>
        </div>
        <div class="text-based">
          <span class="label">First Name</span>
          <span class="value">{{ selectedChat.firstname }}</span>
        </div>
        <div class="text-based">
          <span class="label">Last Name</span>
          <span class="value">{{ selectedChat.lastname }}</span>
        </div>
        <div class="text-based">
          <span class="label">Created</span>
          <span class="value">{{ selectedChat.created }}</span>
        </div>
        <div class="text-based">
          <span class="label">Subscribed</span>
          <span class="value">{{ selectedChat.subscribed }}</span>
        </div>
        <div class="text-based">
          <span class="label">Last action</span>
          <span class="value">{{ selectedChat.lastAction }}</span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'LiveChatPage',
    data: () => ({
      defaultSelected: {
        icon: "icon-others-social-whatsapp",
        name: "Flow Faedah Foundation",
      },
      company: [
        {
          icon: "icon-others-social-whatsapp",
          name: "Flow Faedah Foundation",
        },
        {
          icon: "icon-others-social-instagram",
          name: "Flow Faedah",
        }
      ],
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          userNs: 'f11698u2279656',
          username: 'Henrika Kristi',
          firstname: 'Henrika',
          lastname: 'Kristi',
          phoneNumber: '+6281239132921',
          whatsapp: '+6281239132921',
          email: 'not set',
          created: '3 weeks ago',
          subscribed: '3 weeks ago',
          lastAction: '3 weeks ago',
          messages: [
            { posted_by: 'f11698u2279656', message: "Hello", posted_at: "15 March, 2022 1:58 PM" },
            { posted_by: '12345', message: "Selamat datang di Official Whatsapp Badan Pengelola Transportasi Jabodetabek. Klik menu dibawah ini untuk melihat pelayanan kami", posted_at: "16 March, 2022 1:58 PM" },
          ],
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          userNs: 'f11698u2279656',
          username: 'Cendani Arum',
          firstname: 'Cendani',
          lastname: 'Arum',
          phoneNumber: '+6281239132921',
          whatsapp: '+6281239132921',
          email: 'not set',
          created: '3 weeks ago',
          subscribed: '3 weeks ago',
          lastAction: '3 weeks ago',
          messages: [
            { posted_by: 'f11698u2279656', message: "Hello, I have an issue", posted_at: "15 March, 2022 1:58 PM" },
            { posted_by: '12345', message: "Selamat datang di Official Whatsapp Badan Pengelola Transportasi Jabodetabek. Klik menu dibawah ini untuk melihat pelayanan kami", posted_at: "16 March, 2022 6:58 PM" },
          ],
        },
      ],
      selectedChat: {
        userNs: 'f11698u2279656',
        username: 'Henrika Kristi',
        firstname: 'Henrika',
        lastname: 'Kristi',
        phoneNumber: '+6281239132921',
        whatsapp: '+6281239132921',
        email: 'not set',
        created: '3 weeks ago',
        subscribed: '3 weeks ago',
        lastAction: '3 weeks ago',
        messages: [
          { posted_by: 'f11698u2279656', message: "Hello", posted_at: "15 March, 2022 1:58 PM" },
          { posted_by: '12345', message: "Selamat datang di Official Whatsapp Badan Pengelola Transportasi Jabodetabek. Klik menu dibawah ini untuk melihat pelayanan kami", posted_at: "16 March, 2022 4:58 PM" },
        ],
      },
    }),
    methods: {
      checkIfSameDate(prev, current) {
        const prevDate = new Date(prev);
        const currentDate = new Date(current);

        if (prevDate.getDate() === currentDate.getDate()
        && prevDate.getMonth() === currentDate.getMonth()
        && prevDate.getFullYear() === currentDate.getFullYear()) {
          return true;
        } else {
          return false;
        }
      },
      convertToSimpleDate(date) {
        return new Date(date).toLocaleDateString('en-gb', { year:"numeric", month:"short", day:"numeric"})
      },
      handleChatListItemClick(index) {
        this.selectedChat = this.items[index];
      }
    },
  }
</script>


<style lang="scss" scoped>
  // scrollbar design
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  .section-chat {
    margin: -68px -56px -56px -56px;
    height: 100vh;
  }

  .chat-list {
    border-right: 1px solid #eaeaea;

    .icon {
      width: 50px;
    }

    .chat-list-select {
      position: relative;

      .chip {
        padding: 0;
        opacity: 1;
      }
    }

    .chat-list-content {
      overflow-y: auto;
      height: calc(100vh - 140px);

      .list-item {
        .title {
          width: 100%;

          .name {
            font-size: 16px;
            font-weight: 700;
            color: #120309;
          }

          .time {
            font-size: 12px;
            font-weight: 400;
          }
        }

        .message {
          font-size: 12px;
          font-weight: 400;
          color: #120309;
        }
      } 
    }
  }

  .chat {
    border-right: 1px solid #eaeaea;

    .chat-top {
      .user {
        .name {
          font-weight: 700;
          font-size: 20px;
        }
      }
    }

    .chat-content {
      height: 70vh;
      overflow-y: auto;

      .sender {
        color: #AAAAAA;
      }

      .message {
        color: white;
        padding: 8px;
        margin-block: 4px;
        flex-grow: 1;
        border-radius: 0px 12px 12px 12px;
      }

      .own-message {
        padding-block: 8px;
        padding-inline: 16px;
        margin-block: 4px;
        flex-grow: 1;
        border-radius: 12px 0px 12px 12px;
      }

      .time {
        color: black;
      }
    } 
  }

  .chat-box {
    .icon-group {
      column-gap: 20px;
    }
  }

  .user-profile {
    background-color: #FAFAFA;
    height: 100vh;

    .user-profile-content {
      .icon-based {
        display: flex;
        margin-inline: 16px;
        padding-bottom: 16px;

        .value {
          color: #120309;
        }
      }

      .text-based {
        display: flex;
        justify-content: space-between;
        margin-inline: 16px;
        padding-bottom: 16px;

        .label {
          color: #787878;
        }

        .value {
          color: #120309;
        }
      }
    }
  }
</style>