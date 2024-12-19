import {
  APIGatewayClient,
  GetAccountCommand,
} from '@aws-sdk/client-api-gateway';
import type {
  Handler,
  APIGatewayEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

export const handler: Handler<APIGatewayEvent, APIGatewayProxyResult> = async (
  event,
  context
) => {
  // Mude o código abaixo para atender suas necessidades...

  const client = new APIGatewayClient();

  await client.send(new GetAccountCommand());

  console.log(`Event: ${JSON.stringify(event, null, 2)}`);

  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  console.log('Env Example: ', process.env['EXAMPLE_ENV_VAR_1']);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};
