import {battleType, militaryLeaderType} from "../../utils/types";

const TutorialModule = {
    namespaced: true,
    state: {
        ongoingTutorial: false,
        tutorialStep: 1,
        militaryLeaders: [],
        battles: [],
        militaryLeaderPositions: [],
        battlePositions: [],
        militaryLeaderBattles: [],
        recentlyDeleted: null,
        newlyAdded: null
    },

    mutations: {
        setStep(state, step) {
            state.tutorialStep = step;
        },
        setOngoingTutorial(state, ongoing) {
            state.ongoingTutorial = ongoing;
        },
        increaseStep(state) {
            state.tutorialStep++;
            if(state.tutorialStep === 6) {
                let militaryLeader = {
                    id: 1,
                    firstName: 'Mijat',
                    lastName: 'Miletic',
                    dateOfBirth: new Date("2020-06-10T17:35:50.566Z"),
                    militaryRank: 'Neki',
                    school: 'ftn',
                    type: militaryLeaderType
                };
                state.militaryLeaders.push(militaryLeader);
            } else if (state.tutorialStep === 12) {
                location.reload();
            }
        },
        addBattle(state, battle) {
            battle.id = 1;
            battle.type = battleType;
            state.battles.push(battle);
        },
        addBattlePosition(state, battlePosition) {
            battlePosition.battle = state.battles[0];
            state.battlePositions.push(battlePosition);
            state.newlyAdded = battlePosition;
        },
        addMilitaryLeaderPosition(state, militaryLeaderPosition) {
            militaryLeaderPosition.militaryLeader = state.militaryLeaders[0];
            state.militaryLeaderPositions.push(militaryLeaderPosition);
            state.newlyAdded = militaryLeaderPosition;
        },
        addMilitaryLeaderBattle(state, militaryLeaderBattle) {
            state.militaryLeaderBattles.push(militaryLeaderBattle);
        },
        removeMilitaryLeaderBattle(state) {
            state.recentlyDeleted = state.militaryLeaderBattles[0];
            state.militaryLeaderBattles.splice(0, 1);
        },

    },
    actions: {
        addBattlePosition({commit}, battlePosition) {
            battlePosition.id = 1;
            commit('addBattlePosition', battlePosition);
        },
        addMilitaryLeaderPosition({commit}, militaryLeaderPosition) {
            militaryLeaderPosition.id = 1;
            commit('addMilitaryLeaderPosition', militaryLeaderPosition);

        },
        addMilitaryLeaderBattle({commit}, militaryLeaderBattle) {
            militaryLeaderBattle.id = 1;
            commit('addMilitaryLeaderBattle', militaryLeaderBattle);
        },
        removeMilitaryLeaderBattle({commit}) {
            commit('removeMilitaryLeaderBattle');
        }
    }
};

export default TutorialModule;
