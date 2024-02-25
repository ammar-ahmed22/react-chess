import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import image from "@rollup/plugin-image";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        sourcemap: true,
        format: "cjs"
      },
      {
        file: pkg.module,
        sourcemap: true,
        format: "esm"
      }
    ],
    external: ["react", "react-dom"],
    plugins: [
      external(),
      resolve(),
      image(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json"
      })
    ]
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()]
  }
]

