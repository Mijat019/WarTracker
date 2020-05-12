import MilitaryLeader from "./MilitaryLeader";

export default async () => {
  await MilitaryLeader.create({
    firstName: "tupan",
    lastName: "glupan",
    dateOfBirth: Date.now(),
    birthPlace: "TUtin",
    militaryRank: "debilcina",
    school: "gimnazija",
  });
};
