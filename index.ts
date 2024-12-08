import {Connection, Keypair, LAMPORTS_PER_SOL,SystemProgram, Transaction } from "@solana/web3.js";

//using generate function to create a new keypair
// async function main(){
//     const keypair = Keypair.generate();
//     console.log(keypair.publicKey.toBase58());
//     console.log(keypair.secretKey);
// }

async function main(){
    const connection = new Connection("https://api.devnet.solana.com");
    const payer = Keypair.fromSecretKey(
        new Uint8Array([222, 101, 1..]);
    );
    console.log("Payer:" , payer.publicKey.toBase58());

    const transferTo = Keypair.generate();
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: transferTo.publicKey,
            lamports: LAMPORTS_PER_SOL *0.1,
        })
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = payer.publicKey;
    transaction.partialSign(payer);

    const serializedTransaction = transaction.serialize();
    const signature = await connection.sendRawTransaction(serializedTransaction);
    console.log("SIGNATURE", signature);
}


main();
