<template>
  <v-list-group :value="value" @input="$emit('input', $event)">
    <template v-slot:activator>
      <v-list-item-avatar>
        <v-icon>mdi-sword-cross</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>Battles</v-list-item-title>
      <v-list-item-action>
        <div class="d-flex flex-row">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="addDialog = true" class="my-auto" icon v-on="on" v-bind="attrs">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>New battle</span>
          </v-tooltip>
          <battles-table-dialog/>
        </div>
      </v-list-item-action>
    </template>
    <v-divider />

    <div class="height overflow-y-auto">
      <drag v-for="battle in battles" :data="battle" :key="battle.id">
        <v-list-item @click="showDetails(battle)">
          <v-list-item-avatar color="grey">
            <v-img v-if="battle && battle.iconUrl" :src="battle.iconUrl"></v-img>
            <span v-else class="white--text title">{{battle.name[0].toUpperCase()}}</span>
          </v-list-item-avatar>
          <v-list-item-content>{{ battle.name }}</v-list-item-content>
        </v-list-item>
      </drag>
    </div>
    <v-divider />
    <battle-modify mode="add" v-model="addDialog" />
  </v-list-group>
</template>

<script>
import BattlesTableDialog from "../Tables/Battles/BattleTableDialog";
import BattleModify from "../Tables/Battles/BattleModify";
import { mapGetters, mapMutations } from "vuex";
import {Drag} from 'vue-easy-dnd';

export default {
  components: { BattleModify, BattlesTableDialog, Drag },

  name: "BattlesList",

  data: () => ({
    addDialog: false,
  }),

  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    ...mapMutations("battlesDialog", ["setShowDialog", "setBattle"]),

    showDetails(battle) {
      this.setBattle(battle);
      this.setShowDialog(true);
    }
  },

  computed: {
    ...mapGetters("battles", ["battles"])
  }
};
</script>

<style scoped>
.height {
  max-height: 70vh;
}
</style>
