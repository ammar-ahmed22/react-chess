const fs = require("fs");
const path = require("path");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readJSON = (path) => {
  const file = fs.readFileSync(path, "utf-8");
  return JSON.parse(file);
};

const writeJSON = (target, obj) => {
  fs.writeFileSync(target, JSON.stringify(obj, null, 2), "utf-8");
};

const pkg = readJSON("./package.json");
const version = pkg.version;
let [major_v, minor_v, patch_v] = version
  .split(".")
  .map((n) => parseInt(n));

console.log(`Current version: ${pkg.version}`);

const validatedQuestion = (question, validator, onValid) => {
  readline.question(question, (ans) => {
    if (validator(ans)) {
      onValid(ans);
      readline.close();
    } else {
      console.log("Invalid answer!");
      validatedQuestion(question, validator);
    }
  });
};

validatedQuestion(
  "Is this a major, minor, or patch change?: ",
  (ans) => {
    return ["major", "minor", "patch"].includes(ans);
  },
  (ans) => {
    if (ans === "major") {
      major_v++;
      minor_v = 0;
      patch_v = 0;
    } else if (ans === "minor") {
      minor_v++;
      patch_v = 0;
    } else {
      patch_v++;
    }
    const new_v = `${major_v}.${minor_v}.${patch_v}`;
    pkg.version = new_v;
    writeJSON("./package.json", pkg);
    console.log(`New version: ${major_v}.${minor_v}.${patch_v}`);
  },
);
