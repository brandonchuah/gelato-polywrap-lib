import { GelatoPlugin } from ".";
import { Query } from "./w3";

export const query = (plugin: GelatoPlugin): Query.Module => ({
  timeNowInSeconds: () => {
    return plugin.timeNowInSeconds();
  },
  decrypt: (input: Query.Input_decrypt) => {
    return plugin.decrypt(input.decryptKey, input.encryptedString);
  },
});
