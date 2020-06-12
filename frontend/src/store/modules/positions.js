import Vue from "vue";
import {battleType, militaryLeaderType} from "../../utils/types";

const PositionsModule = {
    namespaced: true,
    state: {
        militaryLeaderPositions: [],
        battlePositions: [],
        map: null,
        newlyAdded: null,
        recentlyDeleted: null
    },

    mutations: {
        setMap(state, map) {
            state.map = map;
        },
        setBattlePositions(state, battlePositions) {
            state.battlePositions = battlePositions;
        },
        deleteBattlePosition(state, battlePosition) {
            let index = state.battlePositions.findIndex(bp => bp.id === battlePosition.id);
            state.recentlyDeleted = state.battlePositions[index];
            state.battlePositions.splice(index, 1);
        },
        updateBattlePosition(state, battlePosition) {
            const index = state.battlePositions.findIndex(bp => bp.id === battlePosition.id);
            state.battlePositions[index] = battlePosition;
        },
        addBattlePosition(state, battlePosition) {
            state.battlePositions.push(battlePosition);
            state.newlyAdded = battlePosition;
        },
        setMilitaryLeaderPositions(state, militaryLeaderPositions) {
            state.militaryLeaderPositions = militaryLeaderPositions;
        },
        deleteMilitaryLeaderPosition(state, militaryLeaderPosition) {
            let index = state.militaryLeaderPositions.findIndex(bp => bp.id === militaryLeaderPosition.id);
            state.recentlyDeleted = state.militaryLeaderPositions[index];
            state.militaryLeaderPositions.splice(index, 1);
        },
        updateMilitaryLeaderPosition(state, militaryLeaderPosition) {
            const index = state.militaryLeaderPositions.findIndex(bp => bp.id === militaryLeaderPosition.id);
            Object.assign(state.militaryLeaderPositions[index], militaryLeaderPosition);
        },
        addMilitaryLeaderPosition(state, militaryLeaderPosition) {
            state.militaryLeaderPositions.push(militaryLeaderPosition);
            state.newlyAdded = militaryLeaderPosition;
        },
        resetAdded(state) {
            state.newlyAdded = null;
        },
        resetDeleted(state) {
            state.recentlyDeleted = null;
        }
    },

    actions: {
        async getMapByName({ commit }, mapCode) {
            try {
                let {data: map} = await Vue.$axios.get(`/map/mapName=${mapCode}`);
                commit("setMap", map);
            } catch(err) {
                console.log(`An error occurred getting map by name: ${err}`);
            }
        },
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
        async addMilitaryLeaderPosition({ state, commit, dispatch }, position) {
            try {
                let {data: added} = await Vue.$axios.post('/militaryLeaderMapPosition', position);
                commit('addMilitaryLeaderPosition', added);
                dispatch('militaryLeaderBattles/additionalMilitaryLeaderBattles',
                    {
                        mapId: state.map.id,
                        position: added,
                        type: militaryLeaderType
                    },
                    { root: true });
                commit('snackbar/openSnackbar',
                    {text: 'This military leader was successfully added to the map', color: 'primary'},
                    {root: true})
            } catch (err) {
                if(err.response.status === 400) {
                    commit('snackbar/openSnackbar',
                        {text: 'This military leader is already placed on the map', color: 'error'},
                        {root: true})
                } else console.log(err);
            }
        },
        async addBattlePosition({ state, commit, dispatch }, position) {
            try {
                let {data: added} = await Vue.$axios.post('/battleMapPosition', position);
                commit('addBattlePosition', added);
                dispatch('militaryLeaderBattles/additionalMilitaryLeaderBattles',
                    {
                        mapId: state.map.id,
                        position: added,
                        type: battleType
                    },
                    { root: true });
                commit('snackbar/openSnackbar',
                    {text: 'This battle was successfully added to the map', color: 'primary'},
                    {root: true})
            } catch (err) {
                if(err.response.status === 400) {
                    commit('snackbar/openSnackbar',
                        {text: 'This battle is already placed on the map', color: 'error'},
                        {root: true})
                } else console.log(err);
            }
        },
        async deleteMilitaryLeaderPosition({ commit }, position) {
            try {
                await Vue.$axios.delete(`/militaryLeaderMapPosition/${position.id}`);
                commit('deleteMilitaryLeaderPosition', position);
                commit('snackbar/openSnackbar',
                    {text: 'The military leader was successfully deleted', color: 'primary'},
                    {root: true})
            } catch (err) {
                console.log(err);
            }
        },
        async deleteBattlePosition({ commit }, position) {
            try {
                await Vue.$axios.delete(`/battleMapPosition/${position.id}`);
                commit('deleteBattlePosition', position);
                commit('snackbar/openSnackbar',
                    {text: 'The battle was successfully deleted', color: 'primary'},
                    {root: true})
            } catch (err) {
                console.log(err);
            }
        }
    },
};

export default PositionsModule;