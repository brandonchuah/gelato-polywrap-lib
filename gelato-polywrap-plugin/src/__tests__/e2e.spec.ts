import { Web3ApiClient } from "@web3api/client-js";
import { gelatoPlugin } from "../";

describe("e2e", () => {
  let client: Web3ApiClient;
  const uri = "ens/datetime-plugin.eth";

  beforeAll(() => {
    // Add the gelatoPlugin to the Web3ApiClient
    client = new Web3ApiClient({
      plugins: [
        {
          uri: uri,
          plugin: gelatoPlugin({}),
        },
      ],
    });
  });

  it("timeNowInSeconds", async () => {
    const result = await client.query({
      uri,
      query: `query {
        timeNowInSeconds
      }`,
    });

    console.log("Result: ", result.data);

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.timeNowInSeconds).toBeTruthy();
    expect(typeof result.data?.timeNowInSeconds).toBe("string");
  });

  it("decrypt", async () => {
    const key =
      "0xd4c67361e6b50c35b4a24ef76abc1aad8167cd85248d458ce4f40d3ef7989532";
    const encrypted =
      "ed6c0d5a21b271d139c2a1322bea074003006884a8e2e47070619a9e363e703d46ed65f516fb82ed3994159bf07fcd47c73cc2daa1f1a0964b77b5d7273b7a44cf9fd01f0fe68c8b1d0fc16632602b826ed0a9abf4f9416db529e58feb83f1c5d06756c8b1b16ee3b044766d1d22e7d77b";
    const result = await client.query({
      uri,
      query: `query{
        decrypt(
          privateKey: $key,
          encryptedString: $encrypted
        )
      }`,
      variables: {
        key,
        encrypted,
      },
    });

    console.log("Result: ", result.data);
  });
});
