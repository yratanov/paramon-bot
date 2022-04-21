Telegram bot built on https://github.com/telegraf/telegraf

```
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```
see https://github.com/Automattic/node-canvas#compiling

## Deploy docker image:

```
docker build -t yratanov/paramon-bot .
docker push yratanov/paramon-bot
```


On the server:
```
docker pull yratanov/paramon-bot
docker stop paramon-bot
docker rm paramon-bot
docker run -d --name paramon-bot -e TELEGRAM_TOKEN=<token> NEWS_API_KEY=<key> yratanov/paramon-bot
```
