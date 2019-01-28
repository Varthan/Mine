var web3;
var myContract;
var contract_address = "0x76a5b78ec66faebca2911e9e641a72fd51c647d8"
var contract_abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "clear",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "a",
                "type": "uint256"
            }
        ],
        "name": "update",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "show",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

var importWeb3 = () => new Promise(function(resolve, reject) {
    Web3 = import("https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js")
    resolve(Web3)
})

var check_config = new Promise(function(resolve, reject) {
    if(!myContract)
        importWeb3().then((res) => {
            web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));
            myContract = new web3.eth.Contract(contract_abi, contract_address)
            resolve(web3)
        })
    else
        resolve(true)
})

var signTransaction = (method_type, method_name, methor_arg) => new Promise(function(resolve, reject) 
{
    check_config.then(res => {
        if(method_type == "payable")
        {
            var tx={
                to: contract_address,
                data: null,
                gas:550000
            }
            if(methor_arg)
                tx.data = myContract.methods[method_name](methor_arg).encodeABI()
            else
                tx.data = myContract.methods[method_name]().encodeABI()
    
            console.log(tx);
    
            web3.eth.accounts.signTransaction(tx, localStorage.getItem('privatekey'), function(err,res){
                if(err)
                    resolve({error: true, mes: err});
    
                web3.eth.sendSignedTransaction(res.rawTransaction).on('transactionHash', txHash => {
                    console.log("tx-Hash", txHash); 
                }).on('receipt',receipt => {
                    // console.log(receipt);
                    if(receipt["status"]== "0x1")
                    {
                        console.log("Transaction Success", tx.data);
                        resolve(true);
                        // resolve({error: false, tx: txHash, receipt: receipt, mes: "Transaction Success"});
                    }
                    else
                    {
                        console.log("Transaction Failed");
                        resolve(true);
                        // resolve({error: false, tx: txHash, receipt: receipt, mes: "Transaction Failed"});
                    }
                }).catch(err =>{
                    console.error(err);
                    resolve({error: true, mes: err});
                });
            });
        }
        else
        {
            var contract_method;
            if(methor_arg)
                contract_method = myContract.methods[method_name](methor_arg)
            else
                contract_method = myContract.methods[method_name]()

            contract_method.call((err, res) => {
                resolve(res)
            });
        }
    });
});