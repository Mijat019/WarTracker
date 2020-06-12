<template>
  <v-dialog v-model="dialog" scrollable fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-table</v-icon>
      </v-btn>
    </template>
    <v-card min-height="100%">
      <div style="margin-bottom: 1px">
        <v-toolbar color="white" flat>
          <v-btn class="ma-2" @click="dialog=false" tile icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Military Leaders</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="addItem" outlined class="my-auto" color="primary" dark>New Military Leader</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </div>
      <v-card-text class="px-0">
        <v-data-table
          :items-per-page="5"
          :headers="headers"
          :items="militaryLeaders"
          class="elevation-0"
          sort-by="calories"
        >
          <template v-slot:top>

          </template>
          <template v-slot:item.avatar="{ item }">
            <v-list-item-avatar color="pink">
              <v-img v-if="item.imageUrl" :src="item.imageUrl"></v-img>
              <span v-else class="white--text title">
                {{
                `${item.firstName[0].toUpperCase()}${item.lastName[0].toUpperCase()}`
                }}
              </span>
            </v-list-item-avatar>
          </template>

          <template v-slot:item.update="{ item }">
            <v-icon @click="editItem(item)" color="amber darken-2">mdi-pencil</v-icon>
          </template>
          <template v-slot:item.remove="{ item }">
            <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <military-leader-modify mode="add" v-model="addDialog" />
        <military-leader-modify
          :edit-military-leader="editMilitaryLeader"
          mode="update"
          v-model="editDialog"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MilitaryLeaderModify from "./MilitaryLeaderModify";

export default {
  name: "MilitaryLeadersTableDialog",
  components: { MilitaryLeaderModify },
  data: () => ({
    editDialog: false,
    addDialog: false,
    editMilitaryLeader: null,
    dialog: false,
    headers: [
      { text: "", value: "avatar", sortable: false, align: "center" },
      { text: "Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Dynasty Name", value: "dynastyName" },
      { text: "Military Rank", value: "militaryRank" },
      { text: "Title", value: "title" },
      {
        text: "Update/Details",
        value: "update",
        sortable: false,
        align: "center"
      },
      {
        text: "Remove",
        value: "remove",
        sortable: false,
        align: "center"
      }
    ]
  }),
  computed: {
    ...mapGetters("militaryLeaders", ["militaryLeaders"])
  },

  created() {
    this.getMilitaryLeaders();
  },

  methods: {
    ...mapActions("militaryLeaders", [
      "getMilitaryLeaders",
      "deleteMilitaryLeader"
    ]),

    initialize() {},

    editItem(militaryLeader) {
      this.editMilitaryLeader = militaryLeader;
      this.editDialog = true;
    },

    addItem() {
      this.addDialog = true;
    },

    deleteItem(item) {
      let msg =
        "Are you sure you want to remove " +
        item.firstName +
        " " +
        item.lastName +
        "?";
      confirm(msg) && this.deleteMilitaryLeader(item);
    }
  }
};
</script>

<style scoped></style>
