<template>
    <div>
        <v-dialog :value="value" @input="$emit('input', false)" fullscreen persistent>
            <v-card>
                <v-toolbar flat class="pa-0" dense>
                    <v-btn
                            icon
                            class="right-arrow-button mr-3"
                            @click="closeAddDialog"
                            color="blue darken-1"

                    >
                        <v-icon color="red lighten-2">mdi-close</v-icon>
                    </v-btn>
                    <v-card-title>
                        <span class="headline">Help</span>
                    </v-card-title>

                </v-toolbar>
                <v-divider></v-divider>
                <div class="d-flex flex-row text-center align-center my-2">
                    <v-text-field
                            class="ml-4 search-field"
                            dense
                            outlined
                            placeholder="Search"
                            hide-details
                            autocomplete="off"
                    >
                    </v-text-field>
                    <v-divider vertical class="my-n2"></v-divider>
                    <v-btn
                            dark
                            color="amber darken-3"
                            class="mx-5"
                            @click="startTutorial"
                    >
                        Start tutorial
                    </v-btn>

                </div>
                <v-divider ></v-divider>
                <div>
                    <v-list color="transparent">
                        <v-list-group>
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-map</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Adding a military leader/battle to a map</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Adding a military leader to a map <v-icon>mdi-account</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <v-icon>mdi-account</v-icon> <b>Military Leaders</b><br>
                                    3. Find the military leader you want to add (manually or using search)<br>
                                    4. Drag that <b>military leader</b> and drop on <b>map</b>
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Adding a battle to a map <v-icon>mdi-account</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <v-icon>mdi-sword-cross</v-icon> <b>Battles</b><br>
                                    3. Find the battle you want to add (manually or using search)<br>
                                    4. Drag that <b>battle</b> and drop on <b>map</b>
                                </v-card-text>
                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-account-plus</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Create a military leader</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Create from Menu <v-icon>mdi-menu</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Plus</b> <v-icon>mdi-plus</v-icon> (in front of <v-icon>mdi-account</v-icon> <b>Military Leaders</b>)<br>
                                    3. Fill up the fields and click <b>ADD</b> button
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Create from Table <v-icon>mdi-table</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Table</b> <v-icon>mdi-table</v-icon> (in front of <v-icon>mdi-account</v-icon> <b>Military Leaders</b>)<br>
                                    3. Click the button <b>NEW MILITARY LEADER</b><br>
                                    4. Fill up the fields and click <b>ADD</b> button
                                </v-card-text>
                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-account-edit</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Modify a military leader</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Modify from Menu <v-icon>mdi-menu</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <v-icon>mdi-account</v-icon> <b>Military Leaders</b><br>
                                    3. Find the military leader you want to change (manually or using search) and click on that military leader <br>
                                    4. Click the button <b>EDIT</b><br>
                                    5. Change the fields you want and click <b>UPDATE</b> button
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title>Modify from Table <v-icon>mdi-table</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Table</b> <v-icon>mdi-table</v-icon> (in front of <v-icon>mdi-account</v-icon> <b>Military Leaders</b>)<br>
                                    3. Click the <v-icon color="amber darken-2">mdi-pencil</v-icon> (in front of the military leader you want to change) <br>
                                    4. Change the fields you want and click <b>UPDATE</b> button
                                </v-card-text>

                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-account-remove</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Remove a military leader</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Remove from Menu <v-icon>mdi-menu</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <v-icon>mdi-account</v-icon> <b>Military Leaders</b><br>
                                    3. Find the military leader you want to change (manually or using search) and click on that military leader <br>
                                    4. Click the button <b>REMOVE</b> and then click <b>OK</b> button<br>
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title>Remove from Table <v-icon>mdi-table</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Table</b> <v-icon>mdi-table</v-icon> (in front of <v-icon>mdi-account</v-icon> <b>Military Leaders</b>)<br>
                                    4. Click the <v-icon color="red">mdi-delete</v-icon> (in front of the military leader you want to change) and then click <b>OK</b> button<br>
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
                                    <v-card-title  class="font-weight-medium">Create from Menu <v-icon>mdi-menu</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Plus</b> <v-icon>mdi-plus</v-icon> (in front of <v-icon>mdi-sword-cross</v-icon> <b>Battles</b>)<br>
                                    3. Fill up the fields and click <b>ADD</b> button
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Create from Table <v-icon>mdi-table-cross</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Table</b> <v-icon>mdi-table</v-icon> (in front of <v-icon>mdi-sword</v-icon> <b>Battles</b>)<br>
                                    3. Click the button <b>NEW BATTLE</b><br>
                                    4. Fill up the fields and click <b>ADD</b> button
                                </v-card-text>
                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-sword-cross</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Modify a battle</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Modify from Menu <v-icon>mdi-menu</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <v-icon>mdi-sword-cross</v-icon> <b>Battles</b><br>
                                    3. Find the battle you want to change (manually or using search) and click on that battle <br>
                                    4. Click the button <b>EDIT</b><br>
                                    5. Change the fields you want and click <b>UPDATE</b> button
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title>Modify from Table <v-icon>mdi-table</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Table</b> <v-icon>mdi-table</v-icon> (in front of <v-icon>mdi-sword-cross</v-icon> <b>Battles</b>)<br>
                                    3. Click the <v-icon color="amber darken-2">mdi-pencil</v-icon> (in front of the battle you want to change) <br>
                                    4. Change the fields you want and click <b>UPDATE</b> button
                                </v-card-text>

                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-sword-cross</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Remove a battle</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title  class="font-weight-medium">Remove from Menu <v-icon>mdi-menu</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <v-icon>mdi-sword-cross</v-icon> <b>Battles</b><br>
                                    3. Find the battle you want to change (manually or using search) and click on that battle <br>
                                    4. Click the button <b>REMOVE</b> and then click <b>OK</b> button<br>
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title>Remove from Table <v-icon>mdi-table</v-icon></v-card-title>
                                    1. Click <b>Menu</b> <v-icon>mdi-menu</v-icon><br>
                                    2. Click on <b>Table</b> <v-icon>mdi-table</v-icon> (in front of <v-icon>mdi-sword-cross</v-icon> <b>Battles</b>)<br>
                                    4. Click the <v-icon color="red">mdi-delete</v-icon> (in front of the battle you want to change) and then click <b>OK</b> button<br>
                                </v-card-text>

                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-sync</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Connect the military leader and the battle</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title>Connect - Primary mode</v-card-title>
                                    1. Click on <v-icon>mdi-vector-polyline-plus</v-icon> button<br>
                                    2. Then on the map click on the <b>military leader</b> and the <b>battle</b> you want to connect
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title>Connect - Shortcut </v-card-title>
                                    1. Press and hold <b>ctrl + nesto</b><br>
                                    2. Then on the map click on the <b>military leader</b> and the <b>battle</b> you want to connect
                                </v-card-text>
                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-sync-off</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Disconnect the military leader and the battle</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    <v-card-title>Disconnect - Primary mode</v-card-title>
                                    1. Click on <v-icon>mdi-vector-polyline-minus</v-icon> button<br>
                                    2. Then on the map click on the <b>military leader</b> and the <b>battle</b> you want to disconnect
                                </v-card-text>
                                <v-card-text class="black--text">
                                    <v-card-title>Disconnect - Shortcut </v-card-title>
                                    1. Press and hold <b>ctrl + nesto</b><br>
                                    2. Then on the map click on the <b>military leader</b> and the <b>battle</b> you want to disconnect
                                </v-card-text>
                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-map</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Change map</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-card-text class="black--text">
                                    1. Click on <b>Map</b> <v-icon>mdi-map</v-icon> button (lower right corner) <br>
                                    2. Then choose <b>the number of map</b> you want
                                </v-card-text>
                            </div>
                            <v-divider />
                        </v-list-group>
                        <v-list-group v-show="true">
                            <template v-slot:activator>
                                <v-list-item-avatar>
                                    <v-icon>mdi-run-fast</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>List of shortcuts</v-list-item-title>
                            </template>
                            <v-divider />
                            <div class="height overflow-y-auto">
                                <v-data-table
                                    :headers="headers"
                                    :items="shortcuts"
                                    class="elevation-1"
                                ></v-data-table>
                            </div>
                            <v-divider />
                        </v-list-group>

                    </v-list>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </v-dialog>
        <tutorial-home></tutorial-home>
    </div>
</template>

<script>

    import TutorialHome from "../../Tutorial/TutorialHome";
    export default {
        components: {TutorialHome},
        name: "HelpBar",
        drawer: true,
        data: () => ({
            showMilitaryLeadersList: false,
            showBattlesList: false,
            headers: [
                { text: 'Meaning', value: 'meaning' },
                { text: 'Keys', value: 'keys' }
            ],
            shortcuts: [
                {meaning: "Go to the battle addition dialog", keys: "CTRL + B"},
                {meaning: "Go to the military leader dialog", keys: "CTRL + M"},
                {meaning: "Go to the battle table", keys: "ALT + B"},
                {meaning: "Go to the military leader table", keys: "ALT + M"},
                {meaning: "Connect the military leader and the battle", keys: "CTRL (holding)"},
                {meaning: "Disconnect the military leader and the battle", keys: "CTRL + ALT (holding)"},
            ],
        }),
        props: {
            value: null,
        },
        methods: {
            closeAddDialog() {
                this.$emit("input", false);
            },
            startTutorial() {
                this.$store.commit('tutorial/setOngoingTutorial', true);
            }
        }
    };
</script>

<style scoped></style>
