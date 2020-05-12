import MilitaryLeader from "./MilitaryLeader";
import War from "./War";

export default async () => {
  await War.create({ name: "Krstaški ratovi" });
  await War.create({ name: "Stogodišnji rat" });
  await War.create({ name: "Husitski ratovi" });
  await War.create({ name: "Trinaestogodišnji rat" });
  await War.create({ name: "Ratovi ruža" });
  await War.create({ name: "Napoleonovi ratovi" });
  await War.create({ name: "Srpsko-turski ratovi" });
  await War.create({ name: "Prvi srpski ustanak" });
  await War.create({ name: "Drugi srpski ustanak" });
  await War.create({ name: "Rusko-turski rat" });
  await War.create({ name: "Prvi balkanski rat" });
  await War.create({ name: "Drugi balkanski rat" });
  await War.create({ name: "Prvi svetski rat" });
  await War.create({ name: "Ruski građanski rat" });
  await War.create({ name: "Grčko-turski rat" });
  await War.create({ name: "Drugi svetski rat" });

  await MilitaryLeader.create({
    firstName: "tupan",
    lastName: "glupan",
    dateOfBirth: Date.now(),
    birthPlace: "TUtin",
    militaryRank: "debilcina",
    school: "gimnazija",
  });
};
