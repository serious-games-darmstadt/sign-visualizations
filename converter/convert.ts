import { readdirSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import arg from "arg";

function runScripts(args: arg.Spec) {
  const _args = arg(args, { permissive: true });
  const type = _args["--type"] as unknown as string;

  let dir_cli: string = "";
  switch (type) {
    case "macos":
      dir_cli = join(__dirname, "macos-x86_64");
      break;

    case "linux":
      dir_cli = join(__dirname, "linux-x86_64");
      break;

    case "windows":
      dir_cli = join(__dirname, "windows-x86_64");
      break;
  }

  readdirSync(join(__dirname, "..", "handshapes", "fbx_models")).map((file) => {
    const filename = file.split(".")[0];
    const file_fbx = join(__dirname, "..", "handshapes", "fbx_models", file);
    const file_gtlf = join(
      __dirname,
      "..",
      "handshapes",
      "gltf_models",
      `${filename}.gltf`
    );
    const file_glb = join(
      __dirname,
      "..",
      "handshapes",
      "glb_models",
      `${filename}.glb`
    );

    exec(
      `${dir_cli} -i ${file_fbx} -o ${file_gtlf} -e`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    exec(
      `${dir_cli} -i ${file_fbx} -o ${file_glb} -b`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  });
}

runScripts({ "--type": String });
