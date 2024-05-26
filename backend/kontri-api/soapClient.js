const soap = require("strong-soap").soap;

const url = "https://api.kontri.pl:8866/KontriAPIservice.svc?wsdl";
const username = process.env.KONTRI_API_USER;
const password = process.env.KONTRI_API_PASSWORD;

function createClient() {
    return new Promise((resolve, reject) => {
        const options = {
            wsdl_headers: {
                Authorization: "Basic " + Buffer.from(username + ":" + password).toString("base64"),
            },
        };
        soap.createClient(url, options, (err, client) => {
            if (err) {
                return reject(err);
            }
            client.setSecurity(new soap.BasicAuthSecurity(username, password));
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
