<template>
  <v-list-group :value="value" @input="$emit('input', $event)">
    <template v-slot:activator>
      <v-list-item-avatar>
        <v-icon>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        <div class="d-flex flex-column">
          <div>Military leaders</div>
          <div class="grey--text subtitle-2">{{militaryLeadersLength}} results</div>
        </div>
      </v-list-item-title>
      <v-list-item-action >
        <div class="d-flex flex-row">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="addDialog = true" class="my-auto" icon v-on="on" v-bind="attrs">
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <span>New military leader</span>
          </v-tooltip>
          <military-leaders-table-dialog/>
        </div>
      </v-list-item-action>
    </template>
    <v-divider />

    <div class="height overflow-y-auto">
      <drag v-for="militaryLeader in militaryLeaders" :data="militaryLeader" :key="militaryLeader.id">
        <v-list-item class="list-item">
          <v-list-item-avatar color="pink">
            <v-img v-if="militaryLeader && militaryLeader.imageUrl" :src="militaryLeader.imageUrl"></v-img>
            <span v-else class="white--text title">
            {{
            `${militaryLeader.firstName[0].toUpperCase()}${militaryLeader.lastName[0].toUpperCase()}`
            }}
          </span>
          </v-list-item-avatar>
          <v-list-item-content @click="showDetails(militaryLeader)">
            {{
            `${militaryLeader.firstName} ${militaryLeader.lastName}`
            }}
          </v-list-item-content>
        </v-list-item>
      </drag>
    </div>
    <v-divider />
    <military-leader-modify mode="add" v-model="addDialog" />
  </v-list-group>
</template>

<script>
import MilitaryLeadersTableDialog from "../Tables/MilitaryLeader/MilitaryLeadersTableDialog";
import MilitaryLeaderModify from "../Tables/MilitaryLeader/MilitaryLeaderModify";
import {mapMutations, mapState} from "vuex"
import {Drag} from 'vue-easy-dnd';

export default {
  components: { MilitaryLeaderModify, MilitaryLeadersTableDialog, Drag },

  name: "MilitaryLeadersList",

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
    ...mapMutations("militaryLeadersDialog", [
      "setShowDialog",
      "setMilitaryLeader"
    ]),

    showDetails(militaryLeader) {
      this.setMilitaryLeader(militaryLeader);
      this.setShowDialog(true);
    }
  },

  computed: {
    ...mapState('tutorial', ['ongoingTutorial']),
    militaryLeaders() {
      if(this.ongoingTutorial) {
        return this.$store.state.tutorial.militaryLeaders;
      } else {
        return this.$store.state.militaryLeaders.militaryLeaders;
      }
    },
    militaryLeadersLength() {
      return this.militaryLeaders.length;
    }
  }
};
</script>

<style scoped>
  .height {
    max-height: 70vh;
  }
  .list-item {
    background-color: white;
  }
</style>
