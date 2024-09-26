import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';


const notify = async(message: string) => {
  const body = { content: message };
  
  const resp = await fetch (process.env.DISCORD_WEBHOOK_URL ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  
  if (!resp.ok) {
    console.log('Error al enviar mensaje a discord');
    return false;
  }
  
  return true;
}

const onStar = (payload: any): string => {

  let message: string = '';

  const { sender, repository, starred_at} = payload;

  if (starred_at){
    message = `Usuario: ${ sender.login } ha dejado una estrella al repositorio: ${repository.name} el ${starred_at}`
  } else {
    message = `Usuario: ${ sender.login } ha quitado una estrella al repositorio: ${repository.name}`
  }

  return message;
}

const onIssue = (payload: any): string => {

  let message: string = '';

  const { action, issue } = payload;

  message = `Usuario: ${ issue.user.login } ha desencadenado ${ action } en issue ${ issue.title }`

  return message;
}


export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const githubEvent = event.headers['x-github-event'] ?? 'unknown';
  const payload = JSON.parse(event.body ?? '{}');
  let message = '';

  console.log(payload);


  switch (githubEvent) {
    case 'star':
      message = onStar(payload);
      break;

    case 'issues':
      message = onIssue(payload);
      break;

    default:
      message = `Evento desconocido: ${githubEvent}`;
      break;
  }



  await notify(message);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      message: 'Hecho!'
    })
  };
};
