# nodejswebserver

## nodejs / express
https://developer.okta.com/blog/2018/11/15/node-express-typescript  
without Materialize and EJS  
until and without `A Better Way to Manage Configuration Settings in Node.js`

## HTTPS
https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

## autostart
```bash
#!/bin/bash

# lulu
cd /home/pi/lulu
nohup python3 lulu_bot.py &

# attila
cd /home/pi/attila_bot/Python
nohup python3 Test.py &

# start webserver
export PATH="$PATH:/usr/local/bin"
/usr/local/bin/forever start -c /usr/local/bin/node /home/pi/nodejswebserver/dist/index.js

# port forwarding
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8080
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to 8443
```