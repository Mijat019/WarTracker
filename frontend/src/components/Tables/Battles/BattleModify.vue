<template>
    <div>
        <v-dialog
            :value="value"
            @input="$emit('input', false)"
            max-width="600px"
            persistent
        >
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="mode === 'add'"
                        >Add a battle</span
                    >
                    <span class="headline" v-else>Update battle</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <template>
                                <v-row>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Name"
                                            required
                                            v-model="name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Place"
                                            required
                                            v-model="place"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Date"
                                            required
                                            v-model="date"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <SelectWar
                                            :rules="[rules.required]"
                                            required
                                            v-model="selectedWar"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-textarea
                                            :rules="[rules.required]"
                                            auto-grow
                                            filled
                                            label="Description"
                                            required
                                            row-height="30"
                                            rows="4"
                                            shaped
                                            v-model="description"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-form>
                        <small>*indicates required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeDialog" color="blue darken-1" text
                        >Close</v-btn
                    >
                    <v-btn
                        @click="submit(addBattle)"
                        color="blue darken-1"
                        text
                        v-if="mode === `add`"
                        >Add</v-btn
                    >
                    <v-btn
                        @click="submit(updateBattle)"
                        color="blue darken-1"
                        text
                        v-else
                        >Update</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import SelectWar from "./SelectWar";
import { mapActions } from "vuex";

export default {
    name: "BattleModify",
    components: { SelectWar },
    data: () => ({
        selectedWar: null,
        name: "",
        place: "",
        date: "",
        description: "",
        battle: {
            name: "",
            place: "",
            date: "",
            description: "",
            warId: "",
        },
        rules: {
            required: (value) => !!value || "Required.",
        },
    }),
    props: {
        editBattle: null,
        value: null,
        mode: {
            type: String,
            default: "add",
        },
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
            }
        },
    },
    filters: {
        formatCoords(value) {
            if (!value) return "";
            return `(${value.lat.toFixed(6)}, ${value.lng.toFixed(6)})`;
        },
    },
    methods: {
        ...mapActions("battle", ["deleteBattle"]),
        ...mapActions("battle", ["updateBattle"]),
        ...mapActions("battle", ["addBattle"]),
        closeDialog() {
            this.$emit("input", false);
            if (this.mode === "add") this.$refs.form.reset();
        },
        submit(fun) {
            let valid = this.$refs.form.validate();
            if (valid) {
                this.battle.name = this.name;
                this.battle.place = this.place;
                this.battle.date = this.date;
                this.battle.description = this.description;
                this.battle.warId = this.selectedWar.id;

                fun(this.battle);
                this.closeDialog();
            }
        },
    },
};
</script>

<style scoped></style>
