let report = require('./report.json')
let Keen = require('keen-js');
let program = require('commander');


program
  .version('0.0.1')
  .option('-b, --branch <type>', 'Tie the information with a branch name')
  .option('-p, --projectId <type>', 'Keen Project Id')
  .option('-w, --writeKey <type>', 'Keen write key')
  .parse(process.argv);


function sendData(data) {
  const client = new Keen({
    projectId: program.projectId,
    writeKey: program.writeKey
  });

  client.addEvent("firepower", data, function(err, res){
    if (err) {
      console.log('there was an Error', err);
    }
    else {
      console.log("SUCCESSFUL");
    }
  });
}

function main(){
  const data = {
    aggregate: report.aggregate,
    branch: program.branch
  }

  sendData(data);
}

main();
