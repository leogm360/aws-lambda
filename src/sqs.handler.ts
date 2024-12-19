import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import type { SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event, context, callback) => {
  // Mude o código abaixo para atender suas necessidades...

  const client = new SQSClient();

  const receiptHandle = event.Records[0]?.receiptHandle;

  if (receiptHandle) {
    await client.send(
      new DeleteMessageCommand({
        QueueUrl: process.env['QUEUE_URL'],
        ReceiptHandle: receiptHandle,
      })
    );
  }

  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  console.log('Env Example: ', process.env['EXAMPLE_ENV_VAR_1']);

  console.log('Callback: ', callback());

  return {
    batchItemFailures: [],
  };
};
