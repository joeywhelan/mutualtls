#/bin/sh

#generate server private key and cert
openssl req -x509 -newkey rsa:4096 -keyout serverKey.pem -out serverCert.pem -nodes -days 365 -subj "/CN=localhost"

#generate client private key and cert signing request
openssl req -newkey rsa:4096 -keyout clientKey.pem -out clientCsr.pem -nodes -subj "/CN=Client"

#sign client cert
openssl x509 -req -in clientCsr.pem -CA serverCert.pem -CAkey serverKey.pem -out clientCert.pem -set_serial 01 -days 365