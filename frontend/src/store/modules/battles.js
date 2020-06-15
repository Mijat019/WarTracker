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
                commit('snackbar/openSnackbar',
                    {text: `The battle was successfully removed.`, color: 'green'},
                    {root: true})
            } catch (err) {
                if(err.response.status === 400) {
                    commit('snackbar/openSnackbar',
                        {text: `The battle cannot be deleted.`, color: 'error'},
                        {root: true})
                } else console.log(err);
            }
        },

        async updateBattle({ commit }, battle) {
            try {
                let { data: modified } = await Vue.$axios.patch(
                    `/battles/${battle.id}`,
                    battle
                );
                commit('snackbar/openSnackbar',
                    {text: `The battle was successfully updated.`, color: 'green'},
                    {root: true})
                commit("updateBattle", modified);
                commit("positions/updateBattle", modified, { root: true });
            } catch (err) {
                console.log(err);
            }
        },

        async addBattle({ commit }, battle) {
            try {
                let { data: added } = await Vue.$axios.post("/battles", battle);
                commit("addBattle", added);
            } catch (err) {
                console.log(err);
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
