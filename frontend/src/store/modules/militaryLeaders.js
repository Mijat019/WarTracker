import Vue from "vue";

const militaryLeaders = {
  namespaced: true,

  state: {
    militaryLeaders: [],
  },

  mutations: {
    setMilitaryLeaders(state, militaryLeaders) {
      state.militaryLeaders = militaryLeaders;
    },

    deleteMilitaryLeader(state, militaryLeader) {
      let index = state.militaryLeaders.findIndex(
        (c) => c.id === militaryLeader.id
      );
      state.militaryLeaders.splice(index, 1);
    },

    updateMilitaryLeader(state, updatedMilitaryLeader) {
      const index = state.militaryLeaders.findIndex(
        (c) => c.id === updatedMilitaryLeader.id
      );
      state.militaryLeaders[index] = updatedMilitaryLeader;
    },

    addMilitaryLeader(state, militaryLeader) {
      state.militaryLeaders.push(militaryLeader);
    },
  },
  actions: {
    async getMilitaryLeaders({ commit }) {
      try {
        const { data } = await Vue.$axios.get("/militaryLeader");
        commit("setMilitaryLeaders", data);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteMilitaryLeader({ commit }, militaryLeader) {
      try {
        await Vue.$axios.delete(`/militaryLeader/${militaryLeader.id}`);
        commit("deleteMilitaryLeader", militaryLeader);
      } catch (error) {
        console.log(error);
      }
    },

    async updateMilitaryLeader({ commit }, militaryLeader) {
      console.log(militaryLeader);
      try {
        const { data: modified } = await Vue.$axios.patch(
          `/militaryLeader/${militaryLeader.id}`,
          militaryLeader
        );
        commit("updateMilitaryLeader", modified);
      } catch (error) {
        console.log(error);
      }
    },

    async addMilitaryLeader({ commit }, militaryLeader) {
      try {
        const { data: added } = await Vue.$axios.post(
          "/militaryLeader",
          militaryLeader
        );
        commit("addMilitaryLeader", added);
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    militaryLeaders: (state) => state.militaryLeaders,
  },
};

export default militaryLeaders;
