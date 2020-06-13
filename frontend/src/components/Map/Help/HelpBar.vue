<template>
    <div>
        <v-dialog :value="value" @input="$emit('input', false)" fullscreen persistent>
            <v-card>
                <v-card-title>
                    <span class="headline" >Help</span>
                    <v-btn @click="closeAddDialog" color="blue darken-1" text>Close</v-btn>
                </v-card-title>
                <v-card>
                    <search-and-filter></search-and-filter>
                    <v-fade-transition>
                    <v-divider v-show="true"></v-divider>
                </v-fade-transition>
                    <v-expand-transition>
                        <div v-show="true">
                            <v-list color="transparent">
                                <v-list-group v-show="true">
                                    <template v-slot:activator>
                                        <v-list-item-avatar>
                                            <v-icon>mdi-account</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title>Create a military leader</v-list-item-title>
                                    </template>
                                    <v-divider />
                                    <div class="height overflow-y-auto">
                                    <v-card-text>
                                        1. Click Menu <v-icon>mdi-menu</v-icon>
                                    </v-card-text>
                                    </div>
                                    <v-divider />
                                </v-list-group>

                                <v-list-group v-show="true">
                                    <template v-slot:activator>
                                        <v-list-item-avatar>
                                            <v-icon>mdi-sword-cross</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title>Create a battle</v-list-item-title>
                                    </template>
                                    <v-divider />
                                    <div class="height overflow-y-auto">
                                        <v-card-text class="black--text">
                                            1. Click Menu <v-icon>mdi-menu</v-icon>
                                        </v-card-text>
                                    </div>
                                    <v-divider />
                                </v-list-group>

                                <v-list-group v-show="true">
                                    <template v-slot:activator>
                                        <v-list-item-avatar>
                                            <v-icon>mdi-sync</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title>Join the battle and military leader</v-list-item-title>
                                    </template>
                                    <v-divider />
                                    <div class="height overflow-y-auto">
                                        <v-card-text class="black--text"  >
                                            Morbi mattis ullamcorper velit.  <v-icon>mdi-sync</v-icon> <br> Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.

                                            Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.
                                        </v-card-text>
                                    </div>
                                    <v-divider />
                                </v-list-group>
                            </v-list>
                        </div>
                    </v-expand-transition>
                </v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import SearchAndFilter from "../../Drawer/SearchAndFilter";

    export default {
        components: {SearchAndFilter },
        name: "HelpBar",
        drawer: true,
        data: () => ({
            showMilitaryLeadersList: false,
            showBattlesList: false
        }),
        props: {
            value: null,
        },
        methods: {
            closeAddDialog() {
                this.$emit("input", false);
            },

        }
    };
</script>

<style scoped></style>
