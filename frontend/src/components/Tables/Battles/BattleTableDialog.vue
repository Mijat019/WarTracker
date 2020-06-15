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
          <v-btn class="ma-2" @click="dialog=close()" tile icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Battles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="addItem" class="my-auto" color="primary" outlined dark>New battle</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </div>
      <v-card-text class="px-0">
        <v-data-table
          :items-per-page="5"
          :headers="headers"
          :items="battles"
          class="elevation-0"
          sort-by="calories"
        >

          <template v-slot:item.update="{ item }">
            <v-icon @click="editItem(item)" color="amber darken-2">mdi-pencil</v-icon>
          </template>
          <template v-slot:item.remove="{ item }">
            <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <battle-modify mode="add" v-model="addDialog" />
        <battle-modify :edit-battle="editBattle" mode="update" v-model="editDialog" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from "vuex";
import BattleModify from "./BattleModify";

export default {
  name: "BattleTableDialog",
  components: { BattleModify },
  data: () => ({
    editDialog: false,
    addDialog: false,
    editBattle: null,
    dialog: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Place", value: "place" },
      { text: "Date", value: "date" },
      { text: "Details", value: "description" },
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
  props: {
    show: null,
  },
  computed: {
    ...mapGetters("battles", ["battles"])
  },

  created() {
    if(this.show)
      this.dialog = this.show;
  },

  methods: {
    ...mapMutations('battlesTableDialog', ['setShowBattlesTableDialog']),
    ...mapActions("battles", ["deleteBattle"]),
    editItem(battle) {
      this.editBattle = battle;
      this.editDialog = true;
    },
    addItem() {
      this.addDialog = true;
    },
    close(){
      this.setShowBattlesTableDialog(false);
      this.dialog= false;

    },
    deleteItem(item) {
      let msg = "Are you sure you want to remove " + item.name + "?";
      confirm(msg) && this.deleteBattle(item);
    }
  }
};
</script>

<style scoped>
</style>
