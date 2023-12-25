import { FoodPreference, PrismaClient } from "@prisma/client";
import {
  createGroup,
  createPlusOne,
  createUser,
  deleteAll,
  getAllGroups,
  getAllPlusOnes,
  getAllUsers,
  updateUser,
} from "./database.ts";

let prisma = new PrismaClient();

async function main() {
  await deleteAll();

  const { id: faddahGroup } = await createGroup("uncleFaddahGroup", false);
  const { id: hazelGroup } = await createGroup("hazelGroup", true);
  const { id: schimkes } = await createGroup("schimkes", true);
  const { id: faddahId } = await createUser(
    "Faddah Steve",
    "Yuetsu",
    faddahGroup
  );
  await updateUser(faddahId, {
    foodPreference: FoodPreference.SHORTRIB,
    going: true,
  });
  const { id: hazelId } = await createUser("Hazel", "Monahan", hazelGroup);
  await updateUser(hazelId, {
    foodPreference: FoodPreference.VEGETARIAN,
    dietaryRestrictions: "I can only eat chocolate :(",
    going: true,
  });
  const { id: hazelGroupPlusOneId } = await createPlusOne(
    "Hazel's",
    "Plus One",
    hazelGroup
  );
  const { id: barbaraSchimke } = await createUser(
    "Barbara",
    "Schimke",
    schimkes
  );
  await updateUser(barbaraSchimke, {
    foodPreference: FoodPreference.VEGETARIAN,
    going: false,
  });
  const { id: kentSchimke } = await createUser("Kent", "Schimke", schimkes);
  await updateUser(kentSchimke, {
    foodPreference: FoodPreference.SHORTRIB,
    going: false,
  });
  const { id: lydiaSchimke } = await createUser("Lydia", "Schimke", schimkes);
  await updateUser(lydiaSchimke, {
    foodPreference: FoodPreference.SHORTRIB,
  });
  console.log("GROUPS");
  console.log(await getAllGroups());
  console.log("USERS");
  console.log(await getAllUsers());
  console.log("PLUS ONES");
  console.log(await getAllPlusOnes());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
