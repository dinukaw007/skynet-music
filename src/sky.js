import { SkynetClient, keyPairFromSeed } from "skynet-js";

//const client = new SkynetClient();
/*run the code locally */
const client = new SkynetClient("https://siasky.net");
const { publicKey, privateKey } = keyPairFromSeed("SY@m78HT9+ZFAfTbQY/Z}}2FNa;v&b]J");
const dataKey = "skymusic.json";
export async function uploadExample(file) {
	try {
	  return  client.uploadFile(file)
	} catch (error) {
	  console.log(error)
	}
  }

  export async function updateSkyMusicDb(json) {
  try {
    await client.db.setJSON(privateKey, dataKey, json);
  } catch (error) {
    console.log(error);
  }
}

export async function getSkyMusicDb() {
	try {
		return  client.db.getJSON(publicKey, dataKey);
	} catch (error) {
	  console.log(error);
	}
  }