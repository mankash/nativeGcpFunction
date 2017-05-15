/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 curl -X POST -H "Content-Type:text/plain" -H "X-MyHeader: 123" http://localhost:8010/heroic-icon-167622/us-central1/helloContent -d '{"name":"Paddi"}'
 */

 spawn = require('child_process').spawn;

exports.helloContent = function helloContent (req, res) {
  let name;

  switch (req.get('content-type')) {
    // '{"name":"John"}'
    case 'application/json':
      name = req.body.name;
      break;

    // 'John', stored in a Buffer
    case 'application/octet-stream':
      name = req.body.toString(); // Convert buffer to a string
      break;

    // 'John'
    case 'text/plain':
      name = req.body;
      break;

    // 'name=John'
    case 'application/x-www-form-urlencoded':
      name = req.body.name;
      break;
  }
  var cOut="";
  var proc_name = __dirname + '/test_func' // use __dirname so we don't need to set env[PATH] and pass env
  var args = [`Hello ${name || 'World'}!`]; // our function takes no cmd-line args

  console.log('spawning ' + proc_name);

  var proc = spawn(proc_name, args);

  proc.on('error', function (code) {
        console.log('error!!' + JSON.stringify(code));
        //context.success();
        cOut = cOut + ' ERROR: ' + JSON.stringify(code);
    });

  proc.stdout.on('data', function (exedata) {
        console.log('My GCF exe stdout: ' + exedata);
        cOut = cOut + ' STD_OUT: ' + exedata;
    });

  proc.stderr.on('data', function (exedata) {
         console.log('My GCF exe stderr: ' + exedata);
         cOut = cOut + ' STD_ERR: ' + exedata;
     });

  proc.on('close', function (code) {
         console.log('My GCF exe close');
         //context.success();
         cOut = cOut + ' CLOSE: ' + JSON.stringify(code);
    });

  proc.on('exit', function (code) {
         console.log('My GCF exe exit');
         cOut = cOut + ' EXIT_CODE: ' + JSON.stringify(code);
         name = name + cOut;
         //context.success();
         res.status(200).send(`Hello ${name || 'World'}!`);
       });

  /*res.status(200).send(`Hello ${name || 'World'}!`);*/
};
