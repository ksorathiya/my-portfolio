const Instagram = require("instagram-web-api");
const { username, password } = process.env;

const client = new Instagram({
  username: "k_sorathiya",
  password: "Jonathan112#",
});

(async () => {
  try {
    await client.login();
    const profile = await client.getProfile();

    console.log(profile);
  } catch (err) {
    console.log(err);
  }
})();
