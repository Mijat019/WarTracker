<template>
  <v-list-group :value="value" @input="$emit('input', $event)">
    <template v-slot:activator>
      <v-list-item-avatar>
        <v-icon>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>Military leaders</v-list-item-title>
      <v-list-item-action>
        <MilitaryLeadersTableDialog />
      </v-list-item-action>
    </template>
    <v-divider />

    <div class="height overflow-y-auto">
      <v-list-item v-for="(militaryLeader, index) in militaryLeaders" :key="index">
        <v-list-item-avatar color="pink">
          <v-img v-if="militaryLeader.imageUrl" :src="militaryLeader.imageUrl"></v-img>
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
    </div>
    <v-divider />
  </v-list-group>
</template>

<script>
import MilitaryLeadersTableDialog from "../Tables/MilitaryLeader/MilitaryLeadersTableDialog";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { MilitaryLeadersTableDialog },

  name: "MilitaryLeadersList",

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
    ...mapGetters("militaryLeaders", ["militaryLeaders"])
  }
};
</script>

<style scoped>
.height {
  max-height: 70vh;
}
</style>
