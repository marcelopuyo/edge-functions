import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  console.log('Hola log de Netlify');

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      message: 'Hola Mondo de las Edge Functions!'
    })
  };
};

