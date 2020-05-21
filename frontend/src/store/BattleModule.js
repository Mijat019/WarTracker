import Vue from "vue";

const BattleModule = {
    namespaced: true,
    state: {
        wars: [],
        battles: []
    },
    mutations: {
        setWars(state, war) {
            Vue.set(state, 'wars', war);
        },
        setBattles(state, battles) {
            Vue.set(state, 'battles', battles);
        },
        deleteBattle(state, battle) {
            let index = state.battles.findIndex(c => c.id === battle.id);
            state.battles.splice(index, 1);
        },
        updateBattle(state, battle) {
            state.battles = [
                ...state.battles.filter(c => c.id !== battle.id),
                battle
            ]
        },
        addBattle(state, battle) {
            state.battles.push(battle);
        },
    },
    actions: {
        async getWars({commit}) {
            try {
                let res = await Vue.prototype.$axios.get('http://localhost:4200/war');
                commit('setWars', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        async getBattles({commit}) {
            try {
                let res = await Vue.prototype.$axios.get('http://localhost:4200/battles');
                commit('setBattles', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        async deleteBattle({commit}, battle) {
            try {
                await Vue.prototype.$axios.delete(`http://localhost:4200/battles/${battle.id}`);
                commit('deleteBattle', battle);
            } catch (err) {
                console.log(err);
            }
        },
        async updateBattle({commit}, battle) {
            console.log(battle);
            try {
                let {data: modified} = await Vue.prototype.$axios.patch(`http://localhost:4200/battles/${battle.id}`, battle);
                commit('updateBattle', modified);
            } catch (err) {
                console.log(err);
            }
        },
        async addBattle({commit}, battle) {
            try {
                let {data: added} = await Vue.prototype.$axios.post('http://localhost:4200/battles', battle);
                commit('addBattle', added);
            } catch (err) {
                console.log(err);
            }
        },

    },
    modules: {}
};

export default BattleModule;