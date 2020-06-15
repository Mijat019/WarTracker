<template>
    <v-dialog
            v-model="showDialog"
            max-width="290"
    >
        <v-card>
            <v-card-title class="headline">
                <v-skeleton-loader
                        type="text"
                        class="mx-auto"
                >
                    Remove {{militaryLeader.firstName}}?
                </v-skeleton-loader>
            </v-card-title>

            <v-card-text>
                <v-skeleton-loader
                        type="sentences"
                        class="mx-auto"
                >
                    Are you sure that you want to remove {{militaryLeader.firstName}}?
                </v-skeleton-loader>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        text
                        @click="close()"
                >
                    No
                </v-btn>

                <v-btn
                        color="green darken-1"
                        text
                        @click="deleteLeader()"
                >
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        name: "MilitaryLeaderDeleteDialog",
        computed: {
            ...mapState('militaryLeaderDeleteDialog', ['showDialog', 'militaryLeader']),
        },
        methods:{
            ...mapMutations('militaryLeaderDeleteDialog', ['setShowDeleteDialog']),
            ...mapMutations("militaryLeadersDialog", ["setShowDialog"]),
            ...mapActions("militaryLeaders", ["deleteMilitaryLeader"]),
            close(){
                this.setShowDeleteDialog(false);
            },
            deleteLeader(){
                this.deleteMilitaryLeader(this.militaryLeader)
                this.setShowDialog(false);
                this.setShowDeleteDialog(false);
            }
        }
    }
</script>

<style scoped>

</style>