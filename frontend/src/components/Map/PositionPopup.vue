<template>
    <v-menu
            absolute
            :position-x="popup.x"
            :position-y="popup.y"
            z-index="100"
            :close-on-click="false"
            :close-on-content-click="false"
            :value="popup.open"
    >

        <v-card>
            <div id="position-popup">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar color="primary">
                            <v-img
                                    v-if="imageUrl"
                                    :src="imageUrl"
                            ></v-img>
                            <span v-else class="white--text title">
                                {{initials}}
                            </span>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ name }}</v-list-item-title>
                            <v-list-item-subtitle> {{ subtitle }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <div class="flex flex-column">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-on="on" v-bind="attrs">
                                            <v-icon color="primary">mdi-account</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Details</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn @click="deletePosition" icon v-on="on" v-bind="attrs">
                                            <v-icon color="red">mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Delete position</span>
                                </v-tooltip>
                            </div>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </div>
        </v-card>
    </v-menu>
</template>

<script>
    import {militaryLeaderType} from "../../utils/types";
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "PositionPopup",
        computed: {
            ...mapState('positionPopup', ['popup']),
            name() {
                if (!this.popup.type) return '';
                if (!this.popup.position) return '';
                return this.popup.type.holderName(this.popup.position);
            },
            imageUrl() {
                if (!this.popup.type) return '';
                if (!this.popup.position) return '';
                return this.popup.type.imageUrl(this.popup.position);
            },
            initials() {
                if (!this.popup.type) return '';
                if (!this.popup.position) return '';
                return this.popup.type.symbol(this.popup.position);
            },
            subtitle() {
                if (!this.popup.type) return '';
                if (!this.popup.position) return '';
                return this.popup.type.info(this.popup.position);
            }
        },
        methods: {
            ...mapMutations('positionPopup', ['setPopup', 'setOpenPopup']),
            showDetails() {
                if (this.popup.type.label === militaryLeaderType.label) {
                    this.$store.commit('militaryLeadersDialog/setMilitaryLeader', this.popup.position.militaryLeader);
                    this.$store.commit('militaryLeadersDialog/setShowDialog', true);
                } else {
                    this.$store.commit('battlesDialog/setBattle', this.popup.position.battle);
                    this.$store.commit('battlesDialog/setShowDialog', true);
                }
            },

            deletePosition() {
                this.$store.commit('deletePositionDialog/setPosition',
                    {
                        position: this.popup.position,
                        type: this.popup.type
                    }
                );
                this.$store.commit('deletePositionDialog/setShowDialog', true);
            }
        }
    }
</script>

<style scoped>

</style>
