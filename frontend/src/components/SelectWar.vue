<template>
  <v-autocomplete
    :items="wars"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
    hint="Choose a war"
    item-text="name"
    item-value="name"
    label="War"
    persistent-hint
    return-object
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>There are no existing wars</v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SelectWar",

  data: () => ({
    rules: [v => !!v || "War is required"]
  }),

  props: {
    value: null,
    disabled: {
      type: Boolean,
      value: false
    }
  },

  computed: {
    ...mapState("battles", ["wars"])
  },

  methods: {
    ...mapActions("battles", ["getWars"])
  },

  created() {
    this.getWars();
  }
};
</script>

<style scoped>
</style>