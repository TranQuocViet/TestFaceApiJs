var fs = require("fs")

module.exports = {
  cert: fs.readFileSync("https/localhost.pem"),
  key: fs.readFileSync("https/localhost.key"),
  passphrase: "469454"
}