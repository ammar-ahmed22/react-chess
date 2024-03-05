const TypeDoc = require("typedoc");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const readJSON = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const readFile = (path) => {
  return fs.readFileSync(path, "utf-8");
};

const writeFile = (path, content) => {
  return fs.writeFileSync(path, content, "utf-8");
};

const replaceBetween = (str, start, end, replace) => {
  const startIdx = str.indexOf(start);
  const endIdx = str.indexOf(end, startIdx);
  let result = str;
  if (startIdx !== -1 && endIdx !== -1) {
    const between = str.substring(
      startIdx + start.length + 1,
      endIdx - 1,
    );
    result = str.replace(between, replace);
  }
  return result;
};

const extractFunctionSignature = (signature) => {
  const returnType = extractTypesInfo(signature.type);
  const parameters = signature.parameters.map((p) => {
    return {
      name: p.name,
      type: extractTypesInfo(p.type),
    };
  });

  return `(${parameters.map((p) => `${p.name}: ${p.type}`).join(", ")}) => ${returnType}`;
};

const extractTypesInfo = (typeObject, name) => {
  switch (typeObject.type) {
    case "intrinsic":
      return typeObject.name;
    case "reference":
      const allowedPackages = [
        "@types/react",
        "@types/react-dom",
        "@ammar-ahmed22/react-chess",
        "typescript",
      ];
      const typeParams =
        typeObject.typeArguments &&
        typeObject.typeArguments.map((t) => extractTypesInfo(t));
      if (allowedPackages.includes(typeObject.package)) {
        if (typeParams)
          return `${typeObject.name}&lt;${typeParams.join(",")}&gt;`;
        return typeObject.name;
      }
      if (typeObject.package === "@ammar-ahmed22/chess-engine") {
        return `[${typeObject.name}](https://github.com/ammar-ahmed22/chess-engine)`;
      }
      return "reference";
    case "union":
      if (Array.isArray(typeObject.types)) {
        return typeObject.types
          .map((t) => extractTypesInfo(t))
          .join(" &#124; ");
      }
      return "union";
    case "reflection":
      const sig = typeObject.declaration.signatures[0];
      return extractFunctionSignature(sig);
    case "array":
      return extractTypesInfo(typeObject.elementType) + "[]";
    default:
      console.log("unhandled type:", typeObject.type);
      return "unhandled";
  }
};

const extractDocsInfo = (props) => {
  const result = [];
  for (let prop of props) {
    const info = {};
    info.name = prop.name;
    info.description = prop.comment.summary
      .map((o) => o.text.replace("\n", "<br />"))
      .join("");
    info.default = "N/A";
    info.params = "";
    if (prop.comment.blockTags) {
      for (let tag of prop.comment.blockTags) {
        if (tag.tag === "@default") {
          info.default = `\`${
            tag.content
              .map((o) => o.text)
              .join("")
              .split("\n")[1]
          }\``;
        }
        if (tag.tag === "@param") {
          if (info.params === "") {
            info.params += `\`@param ${tag.name}\` - ${tag.content.map((o) => o.text).join("")}`;
          } else {
            info.params += `<br />\`@param ${tag.name}\` - ${tag.content.map((o) => o.text).join("")}`;
          }
        }
      }
    }
    if (info.params === "") {
      info.params = "N/A";
    }
    info.type = `<code>${extractTypesInfo(prop.type, prop.name)}</code>`;

    result.push(info);
  }
  return result;
};

const createReadmeTable = (docsInfo) => {
  const headers = ["Prop", "Type", "Default", "Description"];
  let str = "| ";
  for (let header of headers) {
    str += header + " | ";
  }
  str += "\n|";
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    str += ` :${"-".repeat(header.length - 1)} |`;
  }

  for (let info of docsInfo) {
    str += "\n";
    str += `| ${info.name} | ${info.type} | ${info.default} | ${info.description}${info.params === "N/A" ? "" : ` <br/><br />${info.params}`} |`;
  }

  return str;
};

async function main() {
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: [path.join(ROOT, "./src/index.ts")],
  });

  const project = await app.convert();
  if (project) {
    const outputDir = path.join(ROOT, "./tsdocs");
    const jsonPath = path.resolve(outputDir, "docs.json");
    await app.generateJson(project, jsonPath);
    const docs = readJSON(jsonPath);
    const chessboardProps = docs.children.find(
      (obj) => obj.name === "ChessBoardProps",
    ).type.types[1].declaration.children;
    const docsInfo = extractDocsInfo(chessboardProps);
    docsInfo.sort((a, b) => {
      if (a.default === "N/A" && b.default === "N/A") {
        return 0;
      } else if (a.default !== "N/A" && b.default === "N/A") {
        return -1;
      } else {
        return 1;
      }
    });
    const genTable = createReadmeTable(docsInfo);
    const readmePath = path.join(ROOT, "./README.md");
    const readme = readFile(readmePath);
    const updated = replaceBetween(
      readme,
      "<!-- CHESSBOARD PROPS TABLE START -->",
      "<!-- CHESSBOARD PROPS TABLE END -->",
      genTable,
    );
    writeFile(readmePath, updated);
  }
}

main().catch(console.log);
