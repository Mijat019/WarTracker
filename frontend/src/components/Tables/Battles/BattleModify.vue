<template>
  <div>
    <v-dialog :value="value" @input="$emit('input', false)" max-width="600px" fullscreen persistent>
      <v-card min-height="100%">
        <v-card-title>
          <span class="headline" v-if="mode === 'add'">Add a battle</span>
          <span class="headline" v-else>Update battle</span>
        </v-card-title>
        <v-card-subtitle
          v-if="ongoingTutorial"
        >Click on the add button to finish this part of the tutorial</v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <template>
                <v-row>
                  <v-col cols="6" md="6" sm="6">
                    <v-text-field :rules="[rules.required]" label="*Name" required v-model="name"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <v-text-field :rules="[rules.required]" label="*Place" required v-model="place"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="dataPicker"
                      v-model="dataPicker"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          :rules="[rules.required]"
                          label="*Date (YYYY-MM-DD)"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dataPicker = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dataPicker.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <SelectWar :rules="[rules.required]" required v-model="selectedWar" />
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-textarea
                      auto-grow
                      outlined
                      label="Description"
                      required
                      row-height="30"
                      rows="4"
                      v-model="description"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-file-input
                      @change="iconSelected"
                      :rules="rulesImg"
                      accept="image/png, image/jpeg, image/bmp"
                      label="Image"
                      placeholder="Pick an image"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </template>
            </v-form>
            <small>*indicates required field</small>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" color="blue darken-1" text>Close</v-btn>
          <v-btn @click="submit(addBattle)" color="blue darken-1" text v-if="mode === `add`">Add</v-btn>
          <v-btn @click="submit(updateBattle)" color="blue darken-1" text v-else>Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SelectWar from "./SelectWar";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "BattleModify",
  components: { SelectWar },
  data: () => ({
    dataPicker: false,
    selectedWar: null,
    name: "",
    icon: null,
    place: "",
    date: "",
    description: "",
    battle: {
      name: "",
      place: "",
      date: "",
      description: "",
      warId: "",
      icon: null
    },
    rules: {
      required: value => !!value || "Required."
    }
  }),
  props: {
    editBattle: null,
    value: null,
    mode: {
      type: String,
      default: "add"
    }
  },
  computed: {
    ...mapState("tutorial", ["ongoingTutorial"])
  },
  watch: {
    value() {
      if (this.editBattle) {
        this.battle.id = this.editBattle.id;
        this.name = this.editBattle.name;
        this.place = this.editBattle.place;
        this.date = this.editBattle.date;
        this.description = this.editBattle.description;
        this.selectedWar = this.editBattle.war;
        if (this.editBattle.date)
          this.date = this.editBattle.date.split("T")[0];
      }
    }
  },
  filters: {
    formatCoords(value) {
      if (!value) return "";
      return `(${value.lat.toFixed(6)}, ${value.lng.toFixed(6)})`;
    }
  },
  methods: {
    ...mapMutations("battleModifyDialog", ["setShowBattleModifyDialog"]),
    ...mapActions("battles", ["deleteBattle"]),
    ...mapActions("battles", ["updateBattle"]),
    ...mapActions("battles", ["addBattle"]),
    closeDialog() {
      this.$emit("input", false);
      this.setShowBattleModifyDialog(false);
      if (this.mode === "add") this.$refs.form.reset();
    },
    filters: {
      formatCoords(value) {
        if (!value) return "";
        return `(${value.lat.toFixed(6)}, ${value.lng.toFixed(6)})`;
      }
    },
    methods: {
      ...mapMutations("battleModifyDialog", ["setShowBattleModifyDialog"]),
      ...mapActions("battles", ["deleteBattle"]),
      ...mapActions("battles", ["updateBattle"]),
      ...mapActions("battles", ["addBattle"]),
      closeDialog() {
        this.$emit("input", false);
        this.setShowBattleModifyDialog(false);
        if (this.mode === "add") this.$refs.form.reset();
      },
      async submit(fun) {
        let valid = this.$refs.form.validate();
        if (valid) {
          this.battle.name = this.name;
          this.battle.place = this.place;
          this.battle.date = this.date;
          this.battle.description = this.description;
          this.battle.warId = this.selectedWar.id;
          if (this.ongoingTutorial) {
            this.battle.war = this.selectedWar;
            this.$store.commit("tutorial/addBattle", this.battle);
            this.$store.commit("tutorial/increaseStep");
          } else {
            await fun(this.battle);
          }
          this.closeDialog();
        }
      }
    },

    iconSelected(event) {
      this.icon = event;
    }
  }
};
</script>

<style scoped></style>
