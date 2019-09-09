Eos = require('eosjs')
fs = require('fs')

eos = Eos({
	keyProvider: "5JJ2MUkkQnfkyG2WyqNgSkP2mzb7c4CzU8erqXVHEaGQMhNGitv",// private 
	httpEndpoint: 'http://jungle2.cryptolions.io:80',//'http://dev.cryptolions.io:38888',
	chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
	broadcast: true,
	debug: true, 
	sign: true
});

wasm = fs.readFileSync('elephantram4.wasm')
abi = fs.readFileSync('elephantram4.abi')

eos.getInfo({}).then((data, err) => {
   if(err)
        console.log(err)
   else{
        console.log(data)
   }
}).catch(e => console.log(e))

/* eos.setcode("elephantram4", 0, 0, wasm).then((data, err) => {
   if(err)
        console.log("Already the Contract is deployed" + err)
   else{
        // console.log(data)
	console.log('Contract wasm deployed successfully');
   }
}).catch(e => console.log(e)) */



// eos.setabi("elephantram4", JSON.parse(abi)).then((data) =>{
//         console.log("Contract abi deployed successfully");
//         // console.log(data)
// }).catch(e => { console.log("Error in abi "); console.log(e)})




// If you want to Clear the contarct
// eos.setabi("elephantram4", "")
// eos.setcode("elephantram4", 0, 0, new Uint8Array())
