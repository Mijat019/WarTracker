<template>
  <v-card>
    <v-navigation-drawer
      app
      v-model="mini"
      :mini-variant.sync="mini"
      permanent
      width="40%"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-menu</v-icon>
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

        <v-btn icon @click.stop="closeDrawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-group v-model="battlesList">
        <template v-slot:activator>
          <v-list-item-avatar
            ><v-icon>mdi-sword-cross</v-icon></v-list-item-avatar
          >
          <v-list-item-title>Battles</v-list-item-title>
          <v-list-item-action>
            <v-icon @click.stop="openBattlesTable">mdi-table</v-icon>
          </v-list-item-action>
        </template>
        <v-list-item>
          <v-list-item-content>bitka1</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>bitka3</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>bitka2</v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group v-model="militaryLeadersList">
        <template v-slot:activator>
          <v-list-item-avatar><v-icon>mdi-account</v-icon></v-list-item-avatar>
          <v-list-item-title>Military leaders</v-list-item-title>
          <v-list-item-action>
            <v-icon @click.stop="openMilitaryLeadersTable">mdi-table</v-icon>
          </v-list-item-action>
        </template>
        <v-list-item>
          <v-list-item-content>vojskovodja1</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>vojskovodja2</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>vojskovodja3</v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    mini: false,
    militaryLeadersList: false,
    battlesList: false,
  }),

  methods: {
    openMilitaryLeadersTable() {
      alert(
        "Damjane, ovde aktiviraj dijalog za tabelu. Nek ova metoda zove mutaciju u vuex-u gde menjas state za neki dijalog. Nmj u ovu komponentu da stavljas tabelu, nek bude u home ( ne emituj dogadjaj Home komponenti, koristi vuex!!!!!!!!!!!!!!!) "
      );
    },

    openBattlesTable() {
      alert(
        "Damjane, ovde aktiviraj dijalog za tabelu. Nek ova metoda zove mutaciju u vuex-u gde menjas state za neki dijalog. Nmj u ovu komponentu da stavljas tabelu, nek bude u home ( ne emituj dogadjaj Home komponenti, koristi vuex!!!!!!!!!!!!!!!) "
      );
    },

    closeDrawer() {
      this.mini = !this.mini;
      this.militaryLeadersList = false;
      this.battlesList = false;
    },
  },
};
</script>

<style>
.app-bar {
  border-radius: 1em;
  margin: 1em;
}
</style>
