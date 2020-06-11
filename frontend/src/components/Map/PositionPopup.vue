<template>
    <v-menu
            absolute
            :position-x="positionX"
            :position-y="positionY"
            z-index="500"
            :close-on-click="false"
            :value="value"
    >

        <v-card>
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
                        <v-list-item-subtitle> {{ subtitle }} </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <div class="flex flex-column">
                            <v-btn icon>
                                <v-icon color="primary">mdi-account</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

<!--            <v-divider></v-divider>-->

<!--            <v-list>-->
<!--                <v-list-item>-->
<!--                    <v-list-item-action>-->
<!--                        <v-switch v-model="message" color="purple"></v-switch>-->
<!--                    </v-list-item-action>-->
<!--                    <v-list-item-title>Enable messages</v-list-item-title>-->
<!--                </v-list-item>-->

<!--                <v-list-item>-->
<!--                    <v-list-item-action>-->
<!--                        <v-switch v-model="hints" color="purple"></v-switch>-->
<!--                    </v-list-item-action>-->
<!--                    <v-list-item-title>Enable hints</v-list-item-title>-->
<!--                </v-list-item>-->
<!--            </v-list>-->

<!--            <v-card-actions>-->
<!--                <v-spacer></v-spacer>-->

<!--                <v-btn text @click="menu = false">Cancel</v-btn>-->
<!--                <v-btn color="primary" text @click="menu = false">Save</v-btn>-->
<!--            </v-card-actions>-->
        </v-card>
    </v-menu>
</template>

<script>
    export default {
        name: "PositionPopup",
        props: {
            position: null,
            type: null,
            value: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            positionX: {
                type: Number,
                default() {
                    return 0;
                }
            },
            positionY: {
                type: Number,
                default() {
                    return 0;
                }
            }
        },
        computed: {
            name() {
                if (!this.type) return '';
                if (!this.position) return '';
                return this.type.holderName(this.position);
            },
            imageUrl() {
                if (!this.type) return '';
                if (!this.position) return '';
                return this.type.imageUrl(this.position);
            },
            initials() {
                if (!this.type) return '';
                if (!this.position) return '';
                return this.type.symbol(this.position);
            },
            subtitle() {
                if (!this.type) return '';
                if (!this.position) return '';
                return this.type.info(this.position);
            }
        }
    }
</script>

<style scoped>

</style>
