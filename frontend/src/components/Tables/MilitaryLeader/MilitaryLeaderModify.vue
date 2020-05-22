<template>
    <div>
        <v-dialog
            :value="value"
            @input="$emit('input', false)"
            fullscreen
            persistent
        >
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="mode === 'add'"
                        >Add a military leade</span
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
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            :rules="[rules.required]"
                                            label="Date Of Birth"
                                            required
                                            v-model="dateOfBirth"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6">
                                        <v-text-field
                                            label="Date Of Death"
                                            v-model="dateOfDeath"
                                        ></v-text-field>
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
                                    <v-img
                                        aspect-ratio="1.7"
                                        contain
                                        v-bind:src="image"
                                    ></v-img>
                                </v-row>
                            </template>
                        </v-form>
                        <small>*indicates required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="uploadImage">test</v-btn>

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
        dateOfBirth: "",
        dateOfDeath: "",
        dynastyName: "",
        firstName: "",
        image: "",
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
            image: "",
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
                this.dateOfBirth = this.editMilitaryLeader.dateOfBirth;
                this.dateOfDeath = this.editMilitaryLeader.dateOfDeath;
                this.dynastyName = this.editMilitaryLeader.dynastyName;
                this.firstName = this.editMilitaryLeader.firstName;
                this.id = this.editMilitaryLeader.id;
                // this.image = this.editMilitaryLeader.image;
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
            // this.militaryLeader.image = this.image;
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
