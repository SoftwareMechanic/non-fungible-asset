

import { Connection, Keypair, PublicKey, clusterApiUrl } from"@solana/web3.js";
import { Metaplex, walletAdapterIdentity} from "@metaplex-foundation/js"



export async function POST(request) {
    try{
        const metaplex = Metaplex.make(connection)
            .use(walletAdapterIdentity(provider));

      return new Response(blob,{ status: 200, statusText: "SuperSmashingGreat!" });
    }
    catch(err){   
      console.log("Error: " + err)
      return NextResponse.json({ message: "Error" });
    }
  
}