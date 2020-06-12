import {battleIconOptions, customIconOptions, militaryLeaderIconOptions} from "./icons";

const militaryLeaderType = {
    label: 'militaryLeader',
    determineIcon: function(position) {
        return this.determineMilitaryLeaderIcon(position.militaryLeader);
    },
    determineMilitaryLeaderIcon: function(militaryLeader) {
        let iconOptions;
        if (militaryLeader.imageUrl)
            iconOptions = customIconOptions(militaryLeader.imageUrl);
        else {
            let initials = `${militaryLeader.firstName[0].toUpperCase()}${militaryLeader.lastName[0].toUpperCase()}`;
            iconOptions = militaryLeaderIconOptions(initials)
        }
        return iconOptions;
    },
    holderName: function(position) {
        return `${position.militaryLeader.firstName} ${position.militaryLeader.lastName}`;
    },
    imageUrl: function(position) {
        return position.militaryLeader.imageUrl;
    },
    symbol: function (position) {
        return `${position.militaryLeader.firstName[0].toUpperCase()}${position.militaryLeader.lastName[0].toUpperCase()}`
    },
    info: function (position) {
        return position.militaryLeader.militaryRank;
    },
    empty: {
        firstName: '',
        lastName: '',
        birthPlace: '',
        dateOfBirth: new Date(),
        militaryRank: '',
        school: ''
    }
};

const battleType = {
    label: 'battle',
    determineIcon(position) {
        return this.determineBattleIcon(position.battle);
    },
    determineBattleIcon: function(battle) {
        let iconOptions;
        if (battle.iconUrl)
            iconOptions = customIconOptions(battle.iconUrl);
        else iconOptions = battleIconOptions;
        return iconOptions;
    },
    holderName: function(position) {
        return `${position.battle.name}`;
    },
    imageUrl: function(position) {
        return position.battle.iconUrl;
    },
    symbol: function (position) {
        return `${position.battle.name[0].toUpperCase()}`
    },
    info: function (position) {
        return position.battle.description;

    },
    empty: {
        name: '',
        date: new Date(),
        war: {
            name: '',
        }
    }
};

export {militaryLeaderType, battleType};
