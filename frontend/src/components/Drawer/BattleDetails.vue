<template>
  <v-dialog v-model="showDialog" fullscreen>
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
              <v-btn @click="editDialog=true" text>Edit</v-btn>
              <v-btn text>Remove</v-btn>
            </v-card-actions>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-img
                v-if="battle && battle.iconUrl"
                aspect-ratio="1.7"
                contain
                min-height="100%"
                :src="battles.iconUrl"
              ></v-img>
              <v-container v-else class="height avatar">
                <v-row class="height">
                  <v-col class="height">
                    <v-row class="height" align="center" justify="center">
                      <h1 class="initials" v-if="battle.name.length > 0">{{ battle.name[0].toUpperCase() }}</h1>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="4">
              <v-list>
                <v-list-item
                  @click="openMiniDialog(item)"
                  v-for="(item, index) in battleInformation"
                  :key="index"
                >
                  <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="4">
              <v-list>
                <v-list-item
                  @click="openMiniDialog({title: `Description`, subtitle: battle.description })"
                >
                  <v-list-item-avatar>
                    <v-icon>mdi-information-variant</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Description</v-list-item-title>
                    <v-list-item-subtitle>{{ battle.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
    <battle-modify :edit-battle="battle" mode="update" v-model="editDialog" />
    <v-dialog v-model="miniDialog">
      <v-card>
        <v-card-title>{{ miniDialogData.title }}</v-card-title>
        <v-card-text>{{ miniDialogData.text }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>

</template>

<script>
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";
import BattleModify from "../Tables/Battles/BattleModify";
export default {
  name: "BattleDetails",
  components: { BattleModify },
  data: () => ({
    editDialog: false,
    miniDialog: false,
    miniDialogData: {
      title: "",
      text: ""
    }
  }),

  methods: {
    ...mapMutations("battlesDialog", ["setShowDialog"]),

    openMiniDialog(item) {
      this.miniDialog = true;
      this.miniDialogData.title = item.title;
      this.miniDialogData.text = item.subtitle;
    }
  },

  computed: {
    ...mapGetters("battlesDialog", ["battle", "showDialog"]),

    battleInformation() {
      const { battle } = this;
      return [
        { title: "Name", subtitle: battle.name, icon: "mdi-knife-military" },
        {
          title: "Date",
          subtitle: moment(battle.date).format("MMM DD YYYY"),
          icon: "mdi-calendar"
        },
        { title: "Place", subtitle: battle.place, icon: "mdi-map-marker" },
        { title: "War", subtitle: battle.war.name, icon: "mdi-knife-military" }
      ];
    }
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
