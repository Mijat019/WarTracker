<template>
    <div>
        <v-dialog
            :value="value"
            @input="$emit('input', false)"
            fullscreen
            persistent
        >
            <v-card min-height="100%">
                <v-card-title>
                    <span class="headline" v-if="mode === 'add'"
                        >Add a military leader</span
                    >
                    <span class="headline" v-else>Update military leader</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form" id="form">
                            <template>
                                <v-row>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="First Name"
                                            required
                                            v-model="firstName"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Last Name"
                                            required
                                            v-model="lastName"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Title"
                                            required
                                            v-model="title"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Dynasty Name"
                                            required
                                            v-model="dynastyName"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Military Rank"
                                            required
                                            v-model="militaryRank"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="School"
                                            required
                                            v-model="school"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu
                                                ref="dataPicker1"
                                                v-model="dataPicker1"
                                                :close-on-content-click="false"
                                                :return-value.sync="dateOfBirth"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                        v-model="dateOfBirth"
                                                        label="Date Of Birth"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="dateOfBirth" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="dataPicker1 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.dataPicker1.save(dateOfBirth)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu
                                                ref="dataPicker2"
                                                v-model="dataPicker2"
                                                :close-on-content-click="false"
                                                :return-value.sync="dateOfDeath"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                        v-model="dateOfDeath"
                                                        label="Date Of Death"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="dateOfDeath" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="dataPicker2 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.dataPicker2.save(dateOfDeath)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-file-input
                                            @change="imageSelected"
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
                    <v-btn @click="closeAddDialog" color="blue darken-1" text
                        >Close</v-btn
                    >
                    <v-btn
                        @click="submit(addMilitaryLeader)"
                        color="blue darken-1"
                        text
                        v-if="mode === `add`"
                        >Add</v-btn
                    >
                    <v-btn
                        @click="submit(updateMilitaryLeader)"
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
import { mapActions } from "vuex";

export default {
    name: "MilitaryLeaderModify",
    components: {},
    data: () => ({
        dataPicker1: false,
        dataPicker2: false,
        dateOfBirth: "",
        dateOfDeath: "",
        dynastyName: "",
        firstName: "",
        image: null,
        id: "",
        lastName: "",
        militaryRank: "",
        school: "",
        title: "",
        militaryLeader: {
            dateOfBirth: "",
            dateOfDeath: "",
            dynastyName: "",
            firstName: "",
            id: "",
            image: null,
            lastName: "",
            militaryRank: "",
            school: "",
            title: "",
        },
        rulesImg: [
            (value) =>
                !value ||
                value.size < 2000000 ||
                "Avatar size should be less than 2 MB!",
        ],
        rules: {
            required: (value) => !!value || "Required.",
        },
    }),
    props: {
        editMilitaryLeader: null,
        value: null,
        mode: {
            type: String,
            default: "add",
        },
    },
    watch: {
        value() {
            if (this.editMilitaryLeader) {
                this.militaryLeader.id = this.editMilitaryLeader.id;
                this.dateOfBirth = this.editMilitaryLeader.dateOfBirth.split("T")[0];
                this.dateOfDeath = this.editMilitaryLeader.dateOfDeath.split("T")[0];
                this.dynastyName = this.editMilitaryLeader.dynastyName;
                this.firstName = this.editMilitaryLeader.firstName;
                this.id = this.editMilitaryLeader.id;
                this.lastName = this.editMilitaryLeader.lastName;
                this.militaryRank = this.editMilitaryLeader.militaryRank;
                this.school = this.editMilitaryLeader.school;
                this.title = this.editMilitaryLeader.title;
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
        ...mapActions("militaryLeaders", [
            "updateMilitaryLeader",
            "addMilitaryLeader",
        ]),

        closeAddDialog() {
            this.$emit("input", false);
            if (this.mode === "add") this.$refs.form.reset();
        },

        async submit(fun) {
            if (!this.$refs.form.validate()) {
                return;
            }

            this.militaryLeader.id = this.id;
            this.militaryLeader.dateOfBirth = this.dateOfBirth;
            this.militaryLeader.dateOfDeath = this.dateOfDeath;
            this.militaryLeader.dynastyName = this.dynastyName;
            this.militaryLeader.firstName = this.firstName;
            this.militaryLeader.id = this.id;
            this.militaryLeader.lastName = this.lastName;
            this.militaryLeader.militaryRank = this.militaryRank;
            this.militaryLeader.school = this.school;
            this.militaryLeader.title = this.title;

            const { militaryLeader, image } = this;
            await fun({ militaryLeader, image });
            this.closeAddDialog();
        },

        imageSelected(event) {
            this.image = event;
        },
    },
};
</script>

<style scoped></style>
