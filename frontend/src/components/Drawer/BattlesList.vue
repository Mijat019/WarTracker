<template>
    <v-list-group :value="value" @input="$emit('input', $event)">
        <template v-slot:activator>
            <v-list-item-avatar>
                <v-icon>mdi-sword-cross</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Battles</v-list-item-title>
            <v-list-item-action>
                <BattlesTableDialog/>
            </v-list-item-action>
        </template>
        <v-divider/>

        <div class="height overflow-y-auto">

            <v-list-item v-for="(battle, index) in battles" :key="index">
                <v-list-item-avatar color="grey">
                    <v-img
                            v-if="battle.iconUrl"
                            :src="battle.iconUrl"
                    ></v-img>
                    <span v-else class="white--text title">
                        {{battle.name[0].toUpperCase()}}
                    </span>
                </v-list-item-avatar>
                <v-list-item-content>{{ battle.name }}</v-list-item-content>
            </v-list-item>
        </div>
        <v-divider/>

    </v-list-group>
</template>

<script>
import BattlesTableDialog from "../Tables/Battles/BattlesTableDialog.vue";
import { mapGetters } from "vuex";
export default {
    components: { BattlesTableDialog },

    name: "BattlesList",

    props: {
        value: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    methods: {
        openBattlesTable() {},
    },

    computed: {
        ...mapGetters("battles", ["battles"]),
    },
};
</script>

<style scoped>
    .height {
        max-height: 70vh;
    }
</style>
