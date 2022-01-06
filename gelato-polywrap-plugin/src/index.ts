import { query } from "./resolvers";
import { manifest } from "./w3";

import {
  Plugin,
  PluginFactory,
  PluginPackageManifest,
  PluginModules,
} from "@web3api/core-js";
import { cipher, decryptWithPrivateKey } from "eth-crypto";

export class GelatoPlugin extends Plugin {
  constructor() {
    super();
  }

  public static manifest(): PluginPackageManifest {
    return manifest;
  }

  public getModules(): PluginModules {
    return {
      query: query(this),
    };
  }

  public timeNowInSeconds(): string {
    return Math.floor(Date.now() / 1000).toString();
  }

  public async decrypt(
    decryptKey: string,
    encryptedString: string
  ): Promise<string> {
    const parsedData = cipher.parse(encryptedString.replace("0x", ""));
    const decrypted = await decryptWithPrivateKey(decryptKey, parsedData);

    return decrypted;
  }
}

export const gelatoPlugin: PluginFactory<{}> = () => {
  return {
    factory: () => new GelatoPlugin(),
    manifest: GelatoPlugin.manifest(),
  };
};

export const plugin = gelatoPlugin;
