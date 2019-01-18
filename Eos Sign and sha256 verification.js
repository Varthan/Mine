let objJsonForm = JSON.stringify(this.profile_details);
let objJsonB64 = Buffer.from(objJsonForm).toString("base64");

var signedData = {}; 
let buf = Eos.modules.ecc.sha256(objJsonB64, "hex");
var sig = Eos.modules.ecc.signHash(buf, private_key);
signedData['buf'] = buf;
signedData['sig'] = sig;
signedData['public_key'] = public_key;

// decode

if(ecc.verify(sig, objJsonB64, public_key))
{
	var str = new Buffer(objJsonB64, 'base64')
	var content = str.toString()
	console.log(content);
}
