<template>
    <v-container fluid class="px-7 py-0">
        <v-row align="center" justify="space-between">
            <v-col cols="1" class="pa-0">
                <v-btn icon @click="$emit(`closeDrawer`)">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="9" class="pa-0">
                <v-text-field
                        dense
                        placeholder="Search sta ti dusa iste"
                        hide-details
                        append-outer-icon="mdi-magnify"
                >
                </v-text-field>
            </v-col>
            <v-col cols="1">
                <v-btn icon small>
                    <v-icon>mdi-filter</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
<!--    <v-avatar>-->
<!--        <v-btn icon @click="$emit(`closeDrawer`)">-->
<!--            <v-icon>mdi-menu</v-icon>-->
<!--        </v-btn>-->
<!--    </v-avatar>-->
<!--    <v-text-field-->
<!--            dense-->
<!--            clearable-->
<!--            full-width-->
<!--            placeholder="Search for whatever you want here..."-->
<!--    ></v-text-field>-->
<!--    <v-btn icon small>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--    </v-btn>-->
<!--    <v-btn icon small>-->
<!--        <v-icon>mdi-filter</v-icon>-->
<!--    </v-btn>-->
</template>

<script>
export default {
    name: "SearchAndFilter",
};
</script>

<style></style>
