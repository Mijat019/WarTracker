import Vue from "vue";

const PositionsModule = {
    namespaced: true,
    state: {
        militaryLeaderPositions: [],
        battlePositions: [],
    },

    mutations: {

        setBattlePositions(state, battlePositions) {
            state.battlePositions = battlePositions;
        },

        deleteBattlePosition(state, battlePosition) {
            let index = state.battlePositions.findIndex(bp => bp.id === battlePosition.id);
            state.battlePositions.splice(index, 1);
        },

        updateBattlePosition(state, battlePosition) {
            const index = state.battlePositions.findIndex(bp => bp.id === battlePosition.id);
            state.battlePositions[index] = battlePosition;
        },

        addBattlePosition(state, battlePosition) {
            state.battlePositions.push(battlePosition);
        },
        setMilitaryLeaderPositions(state, militaryLeaderPositions) {
            state.militaryLeaderPositions = militaryLeaderPositions;
        },

        deleteMilitaryLeaderPosition(state, militaryLeaderPosition) {
            let index = state.militaryLeaderPositions.findIndex(bp => bp.id === militaryLeaderPosition.id);
            state.militaryLeaderPositions.splice(index, 1);
        },

        updateMilitaryLeaderPosition(state, militaryLeaderPosition) {
            const index = state.militaryLeaderPositions.findIndex(bp => bp.id === militaryLeaderPosition.id);
            state.militaryLeaderPositions[index] = militaryLeaderPosition;
        },

        addMilitaryLeaderPosition(state, militaryLeaderPosition) {
            state.militaryLeaderPositions.push(militaryLeaderPosition);
        },
    },

    actions: {
        async getMilitaryLeaderPositions({ commit }, mapCode) {
            try {
                let {data: militaryLeaderPositions} = await Vue.$axios.get(`/militaryLeaderMapPosition/mapName=${mapCode}`);
                commit("setMilitaryLeaderPositions", militaryLeaderPositions);
            } catch (err) {
                console.log(`An error occurred while acquiring leaders: ${err}`);
            }
        },
        async getBattlePositions({ commit }, mapCode) {
            try {
                let {data: battlePositions} = await Vue.$axios.get(`/battleMapPosition/mapName=${mapCode}`);
                commit("setBattlePositions", battlePositions);
            } catch (err) {
                console.log(`An error occurred while acquiring battles: ${err}`);

            }
        },
        async updateBattlePosition({ commit }, position) {
            try {
                let {data: updated} = await Vue.$axios.patch(`/battleMapPosition/${position.id}`, position);
                commit('updateBattlePosition', updated)
            } catch (err) {
                console.log(err);
            }
        },
        async updateMilitaryLeaderPosition({ commit }, position) {
            try {
                let {data: updated} = await Vue.$axios.patch(`/militaryLeaderMapPosition/${position.id}`, position);
                commit('updateMilitaryLeaderPosition', updated)
            } catch (err) {
                console.log(err);
            }
        },

    },
};

export default PositionsModule;
