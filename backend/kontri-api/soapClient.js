const soap = require("strong-soap").soap;

const url = "https://api.kontri.pl:8866/KontriAPIservice.svc?wsdl";

// Create a SOAP client
function createClient() {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }
            resolve(client);
        });
    });
}

async function checkService() {
    const client = await createClient();
    return new Promise((resolve, reject) => {
        client.CheckStatus({}, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    createClient,
    checkService,
};
