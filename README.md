# Google Cloud Function - Native C Demo
The aim of this demo is: 

1. Parse json params from incoming http/s GCP request, and pass it to a native process (written in C)
2. Echo back the params received from the native process, demostrating the ability to act on them.
3. Receive the response from the native code in js, parse response code and std-out. Frame an appropriate http/s response to the original invoker of the GCP function.

Inspiration for this demo is from [here](https://groups.google.com/forum/#!msg/cloud-functions-trusted-testers/hfEsSaMqUGA/EVZSK4PLAQAJ).

## Building Locally in GCP Functions Emulator: 

Follow the giidelines from GCP's official [emulator setup guide](https://cloud.google.com/functions/docs/emulator).

This repo contains a .c file. While the local emulator is agnostic to OS, GCP's servers use a debian distro. This is noteworhty to keep in mind, if your dev setup is the latest Ubuntu/Debian LTS release, the compiled binary (attached in this repo) is fully compatible with GCP's servers.

1. Compile the .c file: `gcc -o test_func test_func.c`

2. Deploy the .js funtion to the local emulator: 

   `functions deploy helloContent --trigger-http`

3. Trigger the function: 

   `curl -X POST -H "Content-Type:application/json" -H "X-MyHeader: 123" http://localhost:8010/heroic-icon-167622/us-central1/helloContent -d '{"name":"Neil"}'`

   If everything works as expected, the output should be as follows:

   `Hello Neil STD_OUT: { "msg": "Hello from arbitrary C program!", "args": Hello Neil! } EXIT_CODE: 0!`

## Building Locally in GCP Functions Emulator: 

NOTE - To be fully compliant with GCP's platform, as of May 2017, compile the native binary on Ubuntu 16.04 LTS (with updates) and/or it's Debain counterpart. Though untested, most other x86_64 Linux-es (latest LTS) may also generate compliant binaries.

1. Compile the .c file on Ubuntu 16.04 x86_64 : `gcc -o test_func test_func.c`

2. Deploy the .js funtion to GCP functions: 

   `gcloud beta functions deploy helloContent  --stage-bucket func_bucket --trigger-http`

3. Trigger the function (example URL below): 

    `curl -X POST -H "Content-Type:application/json" -H "X-MyHeader: 123"https://us-central1-heroic-icon-167622.cloudfunctions.net/helloContent?foo=baz  -d '{"name":"Neil"}'`

   If everything works as expected, the output should be as follows:

   `Hello Neil STD_OUT: { "msg": "Hello from arbitrary C program!", "args": Hello Neil! } EXIT_CODE: 0!`

Happy Native Coding!!!

## 

