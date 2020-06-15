import {battleType} from "../../utils/types";

const TutorialModule = {
    namespaced: true,
    state: {
        ongoingTutorial: false,
        tutorialStep: 0,
        militaryLeaders: [],
        battles: [],
        militaryLeaderPositions: [],
        battlePositions: [],
        militaryLeaderBattles: [],
    },

    mutations: {
        setStep(state, step) {
            state.tutorialStep = step;
        },
        setOngoingTutorial(state, ongoing) {
            state.ongoingTutorial = ongoing;
            if(ongoing) {
                state.tutorialStep = 1;
            }
        },
        increaseStep(state) {
            state.tutorialStep++;
            console.log(state.tutorialStep);
        },
        addBattle(state, battle) {
            battle.type = battleType;
            state.battles.push(battle);
        },
        addBattlePosition(state, battlePosition) {
            state.battlePositions.push(battlePosition);
        },
    },
    actions: {
        addBattlePosition({commit}, battlePosition) {
            commit('addBattlePosition', battlePosition);
            commit('snackbar/openSnackbar',
                {text: 'This battle was successfully added to the map', color: 'primary'},
                {root: true})
        }
    }
};

export default TutorialModule;
