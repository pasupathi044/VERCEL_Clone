import { createClient, commandOptions } from "redis";
import { downloadS3Folder, copyBuildOutput} from "./aws";
import {buildProject} from "./util";
const subscriber = createClient();
subscriber.connect();
const publisher = createClient();
publisher.connect();
async function main() {
    
    while(1) {
        const responce = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
          );
          if (responce && responce.element) {
              await downloadS3Folder(`output/${responce.element}`);
          }
          if (responce && responce.element) {
          await buildProject(responce.element);
          }
          if (responce && responce.element) {
            await copyBuildOutput(responce.element);
            }
            const id = responce ? responce.element : null;
            if (id) {
                publisher.hSet("status", id, "deployed");
            }
    }
}
main();