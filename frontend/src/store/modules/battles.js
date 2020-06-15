import Vue from "vue";
import { battleType } from "../../utils/types";

const BattleModule = {
    namespaced: true,
    state: {
        wars: [],
        battles: [],
    },

    mutations: {
        setWars(state, wars) {
            state.wars = wars;
        },

        setBattles(state, battles) {
            state.battles = battles.map((b) => {
                b.type = battleType;
                return b;
            });
        },

        deleteBattle(state, battle) {
            let index = state.battles.findIndex((c) => c.id === battle.id);
            state.battles.splice(index, 1);
        },

        updateBattle(state, battle) {
            battle.type = battleType;
            const index = state.battles.findIndex((c) => c.id === battle.id);
            Object.assign(state.battles[index], battle);
        },

        addBattle(state, battle) {
            battle.type = battleType;
            state.battles.push(battle);
        },
    },

    actions: {
        async getWars({ commit }) {
            try {
                let res = await Vue.$axios.get("/war");
                commit("setWars", res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        },

        async getBattles({ commit }) {
            try {
                let res = await Vue.$axios.get("/battles");
                commit("setBattles", res.data);
            } catch (err) {
                console.log(err);
            }
        },

        async searchBattles({ commit }, { searchQuery }) {
            try {
                let { data } = await Vue.$axios.get("/battles");
                if (searchQuery)
                    data = data.filter((b) =>
                        b.name
                            .toLocaleLowerCase()
                            .includes(searchQuery.toLocaleLowerCase())
                    );
                commit("setBattles", data);
            } catch (err) {
                console.log(err);
            }
        },

        async filterBattles({ commit }, { filter, search }) {
            try {
                const { data: battles } = await Vue.$axios.post(
                    "/battles/filter",
                    {
                        filter,
                        search,
                    }
                );
                commit("setBattles", battles);
            } catch (error) {
                console.log(error);
            }
        },

        async deleteBattle({ commit }, battle) {
            try {
                await Vue.$axios.delete(`/battles/${battle.id}`);
                commit("deleteBattle", battle);
            } catch (err) {
                console.log(err);
            }
        },

        async updateBattle({ commit, dispatch }, { battle, icon }) {
            try {
                let { data: modified } = await Vue.$axios.patch(
                    `/battles/${battle.id}`,
                    battle
                );

                if (icon) {
                    dispatch("uploadIcon", {
                        battleId: modified.id,
                        icon,
                    });
                    return;
                }

                commit("updateBattle", modified);
                commit("positions/updateBattle", modified, { root: true });
            } catch (err) {
                console.log(err);
            }
        },

        async addBattle({ commit, dispatch }, { battle, icon }) {
            try {
                let { data: added } = await Vue.$axios.post("/battles", battle);
                commit("addBattle", added);

                if (icon) {
                    dispatch("uploadIcon", {
                        battleId: added.id,
                        icon,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },

        async uploadIcon({ commit }, { icon, battleId }) {
            try {
                console.log(icon);
                let formData = new FormData();
                formData.append("icon", icon);
                const { data } = await Vue.$axios.post(
                    `/battles/${battleId}`,
                    formData
                );
                commit("updateBattle", data);
                commit("positions/updateBattle", data, {
                    root: true,
                });
            } catch (error) {
                console.log(error);
            }
        },
    },

    getters: {
        wars: (state) => state.wars,
        battles: (state) => state.battles,
        battlesLength: (state) => state.battles.length,
    },
};

export default BattleModule;
