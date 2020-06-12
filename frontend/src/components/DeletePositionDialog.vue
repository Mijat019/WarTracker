<template>
    <v-dialog
            v-model="showDialog"
            max-width="290"
    >
        <v-card>
            <v-card-title class="headline">
                <v-skeleton-loader
                        :loading="!position"
                        type="text"
                        class="mx-auto"
                >
                    Remove {{positionName}}?
                </v-skeleton-loader>
            </v-card-title>

            <v-card-text>
                <v-skeleton-loader
                        :loading="!position"
                        type="sentences"
                        class="mx-auto"
                >
                    Are you sure that you want to remove {{positionName}} from this map?
                </v-skeleton-loader>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        text
                        @click="setShowDialog(false)"
                >
                    No
                </v-btn>

                <v-btn
                        color="green darken-1"
                        text
                        @click="deletePosition"
                >
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import {militaryLeaderType} from "../utils/types";

    export default {
        name: "DeletePositionDialog",
        computed: {
            ...mapState('deletePositionDialog',
                [
                    'position',
                    'type',
                    'showDialog'
                ]),
            positionName() {
                if(!this.type) return '';
                if(!this.position) return '';
                if(this.type.label === militaryLeaderType.label) {
                    return `${this.position.militaryLeader.firstName} ${this.position.militaryLeader.lastName}`;
                } else {
                    return `${this.position.battle.name}`;
                }
            }
        },
        methods: {
            ...mapMutations('deletePositionDialog', ['setShowDialog']),
            ...mapActions('positions', ['deleteMilitaryLeaderPosition', 'deleteBattlePosition']),
            deletePosition() {
                if(this.type.label === militaryLeaderType.label) {
                    this.deleteMilitaryLeaderPosition(this.position);
                } else {
                    this.deleteBattlePosition(this.position);
                }
                this.setShowDialog(false);
            }
        }
    }
</script>

<style scoped>

</style>
