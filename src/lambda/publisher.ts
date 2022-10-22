import { APIGatewayEvent, ProxyResult } from 'aws-lambda';
import SQS from 'aws-sdk/clients/sqs';
import { v1 } from 'uuid';
import { generateSQSQueueUrlFromArn, getOfflineSqsQueueUrl, isLocalHost } from './utils';

export const handlePublish = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  console.log('Publishing message to SQS queue from Lambda');
  const sqsQueueUrl = generateSQSQueueUrlFromArn(process.env.FIFO_QUEUE_ARN);

  if (!sqsQueueUrl) {
    return {
      statusCode: 404,
      body: 'Queue not found',
    };
  }

  const id = v1();
  const sqs = new SQS();
  const url = isLocalHost(event) ? getOfflineSqsQueueUrl(sqsQueueUrl) : sqsQueueUrl;

  try {
    const result = await sqs
      .sendMessage({
        QueueUrl: url,
        MessageBody: JSON.stringify({
          id,
          message: 'Hello from Lambda!',
        }),
        MessageDeduplicationId: id,
        MessageGroupId: `Test-Group-${id}`,
        MessageAttributes: {
          id: {
            DataType: 'String',
            StringValue: id,
          },
        },
      })
      .promise();

    console.info(`SQS publish result from Lambda: ${JSON.stringify(result, null, 2)}`);
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Error publishing message to SQS',
    };
  }

  return {
    statusCode: 200,
    body: 'Published message to SQS queue',
  };
};
