Telegram bot built on https://github.com/telegraf/telegraf

## Deploy docker image:

```
docker build -t yratanov/paramon-bot .
docker push yratanov/paramon-bot
```


On the server:
```
docker pull yratanov/paramon-bot
docker stop paramon-bot
```
