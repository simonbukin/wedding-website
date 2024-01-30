import { randomUUID } from "crypto";
interface User {
  username: string;
  uuid: string;
  password: string;
}

const generateUsers = async () => {
  const users: User[] = [];

  for (let i = 0; i < 5; i++) {
    const username = `user${i + 1}`;
    const password = "password123";
    const uuid = randomUUID();

    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 4,
      timeCost: 4,
    });

    users.push({
      username,
      uuid,
      password: hashedPassword,
    });
  }

  await Bun.write("users.json", JSON.stringify(users));
};

generateUsers();
