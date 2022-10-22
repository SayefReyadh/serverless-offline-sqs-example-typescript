# serverless-offline-sqs-example-typescript

This is a sample example project written in Typescript to run AWS SQS with Serverless Offline

## Setup
First, you will need to install Node 16+ and Docker in your OS before starting.

Run this command to initialize a new project in a new working directory.

```
npm install
```

## Usage

**Start and Run the Project Offline**

Run the following commands in two cmd.

```
npm run start-elastic-mq
```

```
npm start
```

**Invoke the function**

Make a get request to the following endpoint `http://localhost:8080/`

```
curl http://localhost:8080/
```

## Reference

- https://www.npmjs.com/package/serverless-offline
- https://www.npmjs.com/package/serverless-offline-sqs
- https://github.com/softwaremill/elasticmq
