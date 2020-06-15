import Vue from "vue";
import { militaryLeaderType } from "../../utils/types";

const militaryLeaders = {
    namespaced: true,

    state: {
        militaryLeaders: [],
    },

    mutations: {
        setMilitaryLeaders(state, militaryLeaders) {
            state.militaryLeaders = militaryLeaders.map((ml) => {
                ml.type = militaryLeaderType;
                return ml;
            });
        },

        deleteMilitaryLeader(state, militaryLeader) {
            let index = state.militaryLeaders.findIndex(
                (c) => c.id === militaryLeader.id
            );
            state.militaryLeaders.splice(index, 1);
        },

        updateMilitaryLeader(state, updatedMilitaryLeader) {
            updatedMilitaryLeader.type = militaryLeaderType;
            const index = state.militaryLeaders.findIndex(
                (c) => c.id === updatedMilitaryLeader.id
            );
            Object.assign(state.militaryLeaders[index], updatedMilitaryLeader);
        },

        addMilitaryLeader(state, militaryLeader) {
            militaryLeader.type = militaryLeaderType;
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

        async searchMilitaryLeaders({ commit }, { searchQuery }) {
            try {
                let { data } = await Vue.$axios.get("/militaryLeader");
                if (searchQuery) {
                    data = data.filter(
                        (ml) =>
                            ml.firstName
                                .toLocaleLowerCase()
                                .includes(searchQuery.toLocaleLowerCase()) ||
                            ml.lastName
                                .toLocaleLowerCase()
                                .includes(searchQuery.toLocaleLowerCase())
                    );
                }
                commit("setMilitaryLeaders", data);
            } catch (err) {
                console.log(err);
            }
        },

        async filterMilitaryLeaders({ commit }, { search, filter }) {
            try {
                const {
                    data: militaryLeaders,
                } = await Vue.$axios.post("/militaryLeader/filter", {
                    search,
                    filter,
                });
                commit("setMilitaryLeaders", militaryLeaders);
            } catch (error) {
                console.log(error);
            }
        },

        async deleteMilitaryLeader({ commit }, militaryLeader) {
            try {
                await Vue.$axios.delete(`/militaryLeader/${militaryLeader.id}`);
                commit("deleteMilitaryLeader", militaryLeader);
                commit('snackbar/openSnackbar',
                    {text: `The military leader was successfully removed.`, color: 'green'},
                    {root: true})
            } catch (error) {
                if(error.response.status === 400) {
                    commit('snackbar/openSnackbar',
                        {text: `The military leader cannot be deleted. The military leader is a participant in some battle. `, color: 'error'},
                        {root: true})
                } else console.log(error);
            }
        },

        async updateMilitaryLeader(
            { commit, dispatch },
            { militaryLeader, image }
        ) {
            image;
            try {
                const { data: modified } = await Vue.$axios.patch(
                    `/militaryLeader/${militaryLeader.id}`,
                    militaryLeader
                );
                commit('snackbar/openSnackbar',
                    {text: `The military leader was successfully updated.`, color: 'green'},
                    {root: true})
                // upload the image if its provided
                if (image) {
                    dispatch("uploadImage", {
                        militaryLeaderId: modified.id,
                        image,
                    });
                    return;
                }

                commit("updateMilitaryLeader", modified);
                commit("positions/updateMilitaryLeader", modified, {
                    root: true,
                });
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Adds a military leader. If @param image is provided,
         * @func uploadImage is dispatched to upload the provided image.
         */
        async addMilitaryLeader(
            { commit, dispatch },
            { militaryLeader, image }
        ) {
            try {
                const { data: added } = await Vue.$axios.post(
                    "/militaryLeader",
                    militaryLeader
                );

                commit("addMilitaryLeader", added);
                if (image) {
                    dispatch("uploadImage", {
                        militaryLeaderId: added.id,
                        image,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Uploads the provided image. Then it gets the militaryLeader
         * with a imageUrl set. Then it updates the state.
         */
        async uploadImage({ commit }, { image, militaryLeaderId }) {
            try {
                let formData = new FormData();
                formData.append("image", image);
                const { data: newMilitaryLeader } = await Vue.$axios.post(
                    `/militaryLeader/${militaryLeaderId}`,
                    formData
                );
                commit("updateMilitaryLeader", newMilitaryLeader);
                commit("positions/updateMilitaryLeader", newMilitaryLeader, {
                    root: true,
                });
            } catch (error) {
                console.log(error);
            }
        },
    },

    getters: {
        militaryLeaders: (state) => state.militaryLeaders,
        militaryLeadersLength: (state) => state.militaryLeaders.length,
    },
};

export default militaryLeaders;
