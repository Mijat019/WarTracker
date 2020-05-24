<template>
  <v-dialog v-model="showDialog" fullscreen class="pt-0">
    <v-card>
      <v-container class="pt-0">
        <v-btn class="ma-2" @click="setShowDialog(false)" tile icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-text>
          <hr />
          <v-row>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn text>Edit</v-btn>
              <v-btn text>Remove</v-btn>
            </v-card-actions>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-img
                v-if="militaryLeader.imageUrl"
                aspect-ratio="1.7"
                contain
                min-height="100%"
                :src="militaryLeader.imageUrl"
              ></v-img>
              <v-container v-else class="height avatar">
                <v-row class="height">
                  <v-col class="height">
                    <v-row class="height" align="center" justify="center">
                      <h1 class="initials">{{ initials }}</h1>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="4" v-for="(list, index) in lists" :key="index">
              <v-list>
                <v-list-item v-for="(item, index) in list" :key="index">
                  <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "MilitaryLeaderDialog",

  data: () => ({}),

  computed: {
    ...mapGetters("militaryLeadersDialog", ["militaryLeader", "showDialog"]),

    initials() {
      return `${this.militaryLeader.firstName.toUpperCase()[0]}${
        this.militaryLeader.lastName.toUpperCase()[0]
      }`;
    },

    lists() {
      const { militaryLeader } = this;
      return [
        [
          {
            title: "Name",
            subtitle: `${militaryLeader.firstName} ${militaryLeader.lastName}`,
            icon: "mdi-account"
          },

          {
            title: "Dynasty",
            subtitle: militaryLeader.dynastyName || "Not provided",
            icon: "mdi-account-group"
          },
          {
            title: "Birthday",
            subtitle: militaryLeader.dateOfBirth || "Not provided",
            icon: "mdi-party-popper"
          },
          {
            title: "Date of death",
            subtitle: militaryLeader.dateOfDeath || "Not provided",
            icon: "mdi-account-off"
          }
        ],

        [
          {
            title: "Title",
            subtitle: militaryLeader.title || "Not provided",
            icon: "mdi-account"
          },
          {
            title: "Rank",
            subtitle: militaryLeader.militaryRank || "Not provided",
            icon: "mdi-knife-military"
          },
          {
            title: "School",
            subtitle: militaryLeader.school || "Not provided",
            icon: "mdi-school"
          }
        ]
      ];
    }
  },

  methods: {
    ...mapMutations("militaryLeadersDialog", ["setShowDialog"])
  }
};
</script>

<style>
.height {
  height: 100%;
}

.initials {
  font-weight: 200;
  font-size: 4em;
  color: white;
}

.avatar {
  background-color: lightgray;
}
</style>