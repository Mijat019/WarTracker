import Vue from "vue";

const MilitaryLeaderModule = {
    namespaced: true,
    state: {
        militaryLeaders: []
    },
    mutations: {
        setMilitaryLeaders(state, militaryLeaders) {
            Vue.set(state, 'militaryLeaders', militaryLeaders);
        },
        deleteMilitaryLeader(state, militaryLeader) {
            let index = state.militaryLeaders.findIndex(c => c.id === militaryLeader.id);
            state.militaryLeaders.splice(index, 1);
        },
        updateMilitaryLeader(state, militaryLeader) {
            state.militaryLeaders = [
                ...state.militaryLeaders.filter(c => c.id !== militaryLeader.id),
                militaryLeader
            ]
        },
        addMilitaryLeader(state, militaryLeader) {
            state.militaryLeaders.push(militaryLeader);
        },
    },
    actions: {
        async getMilitaryLeaders({commit}) {
            try {
                let res = await Vue.prototype.$axios.get('http://localhost:4200/militaryLeader');
                commit('setMilitaryLeaders', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        async deleteMilitaryLeader({commit}, militaryLeader) {
            try {
                await Vue.prototype.$axios.delete(`http://localhost:4200/militaryLeader/${militaryLeader.id}`);
                commit('deleteMilitaryLeader', militaryLeader);
            } catch (err) {
                console.log(err);
            }
        },
        async updateMilitaryLeader({commit}, militaryLeader) {
            console.log(militaryLeader);
            try {
                let {data: modified} = await Vue.prototype.$axios.patch(`http://localhost:4200/militaryLeader/${militaryLeader.id}`, militaryLeader);
                commit('updateMilitaryLeader', modified);
            } catch (err) {
                console.log(err);
            }
        },
        async addMilitaryLeader({commit}, militaryLeader) {
            try {
                let {data: added} = await Vue.prototype.$axios.post('http://localhost:4200/militaryLeader', militaryLeader);
                commit('addMilitaryLeader', added);
            } catch (err) {
                console.log(err);
            }
        },

    },
    modules: {}
};

export default MilitaryLeaderModule;