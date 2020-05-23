import {battleIconOptions, customIconOptions, militaryLeaderIconOptions} from "./icons";

const militaryLeaderType = {
    label: 'militaryLeader',
    determineIcon: function(position) {
        let iconOptions;
        if (position.militaryLeader.imageUrl)
            iconOptions = customIconOptions(position.militaryLeader.imageUrl);
        else iconOptions = militaryLeaderIconOptions;
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
    }
};

const battleType = {
    label: 'battle',
    determineIcon: function(position) {
        let iconOptions;
        if (position.battle.iconUrl)
            iconOptions = customIconOptions(position.battle.iconUrl);
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

    }
};

export {militaryLeaderType, battleType};
