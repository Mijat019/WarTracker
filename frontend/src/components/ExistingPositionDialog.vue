<template>
    <v-dialog
            v-model="showDialog"
            max-width="350"
    >
        <v-card>
            <v-card-title class="headline">
                <v-skeleton-loader
                        :loading="!entity"
                        type="text"
                        class="mx-auto"
                >
                    Existing {{entityName}}
                </v-skeleton-loader>
            </v-card-title>

            <v-card-text>
                <v-skeleton-loader
                        :loading="!entity"
                        type="sentences"
                        class="mx-auto"
                >
                    {{entityName}} has already been placed on another map.
                    Due to consistency you have to choose if it's going to be placed on the previous or the new location.
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{oldAddress}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    Old address
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{newAddress}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    New address
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-skeleton-loader>
            </v-card-text>

            <v-card-actions>

                <v-btn
                        color="green darken-1"
                        text
                        @click="setShowDialog(false)"
                >
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        text
                        @click="addPosition(oldPosition)"
                >
                    Previous
                </v-btn>
                <v-btn
                        :disabled="!newPosition || newAddress === 'Impossible placement'"
                        color="green darken-1"
                        text
                        @click="addPosition(newPosition)"
                >
                    New
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import {battleType, militaryLeaderType} from "../utils/types";

    export default {
        name: "ExistingPositionDialog",
        computed: {
            ...mapState('existingPositionDialog',
                [
                    'entity',
                    'type',
                    'oldPosition',
                    'newPosition',
                    'showDialog'
                ]),
            entityName() {
                if(!this.type) return '';
                if(!this.entity) return '';
                if(this.type.label === militaryLeaderType.label) {
                    return `${this.entity.firstName} ${this.entity.lastName}`;
                } else {
                    return `${this.entity.name}`;
                }
            },
            newAddress() {
                if(!this.newPosition) return '';
                if(this.newPosition.address) return this.newPosition.address;
                else if (this.type.label === battleType.label)
                    return 'Ocean';
                else
                    return 'Impossible placement';
            },
            oldAddress() {
                if(!this.oldPosition) return '';
                return this.oldPosition.address;
            }
        },
        methods: {
            ...mapMutations('existingPositionDialog', ['setShowDialog']),
            ...mapActions('positions', ['addMilitaryLeaderPosition', 'addBattlePosition']),
            addPosition(position) {
                if(this.type.label === militaryLeaderType.label) {
                    position.militaryLeader.birthPlace = position.address;
                    delete position.address;
                    this.addMilitaryLeaderPosition(position);
                } else {
                    position.battle.place = position.address;
                    delete position.address;
                    this.addBattlePosition(position);
                }
                this.setShowDialog(false);
            }
        }
    }
</script>

<style scoped>

</style>
