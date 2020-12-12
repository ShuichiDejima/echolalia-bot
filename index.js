const line = require('@line/bot-sdk')
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN })

exports.handler = function (event, context) {
  let body = JSON.parse(event.body)
  let text = body.events[0].message.text
  const message = {
    'type': 'text',
    'text': text
  }
  client.replyMessage(body.events[0].replyToken, message)
    .then((response) => {
      let lambdaResponse = {
        statusCode: 200,
        headers: { "X-Line-Status": "OK" },
        body: '{"result":"completed"}'
      }
      context.succeed(lambdaResponse)
    }).catch((err) => console.log(err))
}
