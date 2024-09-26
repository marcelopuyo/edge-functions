import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

  if (!myImportantVariable){
    throw 'Undefined MY_IMPORTANT_VARIABLE'
  }

  console.log('Hola log de Netlify');

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      myImportantVariable,
    })
  };
};

