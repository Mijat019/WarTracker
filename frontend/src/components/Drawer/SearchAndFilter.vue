<template>
    <v-list-item class="px-2">
        <v-list-item-avatar>
            <v-btn icon @click="$emit(`closeDrawer`)">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-list-item-avatar>
        <v-text-field
            dense
            clearable
            full-width
            placeholder="Search for whatever you want here..."
        ></v-text-field>
        <v-btn icon small>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon small>
            <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon @click.stop="$emit(`closeDrawer`)">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
    </v-list-item>
</template>

<script>
export default {
    name: "SearchAndFilter",
};
</script>

<style></style>
