#/bin/sh

#CREATE
echo '***CREATE***'
curl -v -k --key clientKey.pem --cert clientCert.pem -H "Content-Type: application/json" -d '{"key":"1", "value":"abc"}' https://localhost:8443/kvp
echo -e '\n************\n'

#RETRIEVE
echo '***RETRIEVE***'
curl -v -k --key clientKey.pem --cert clientCert.pem https://localhost:8443/kvp/1
echo -e '\n************\n'

#UPDATE
echo '***UPDATE***'
curl -v -k --key clientKey.pem --cert clientCert.pem -X PUT -H "Content-Type: application/json" -d '{"key":"1", "value":"def"}' https://localhost:8443/kvp
echo -e '\n************\n'

#DELETE
echo '***DELETE***'
curl -v -k --key clientKey.pem --cert clientCert.pem -X DELETE https://localhost:8443/kvp/1
echo -e '\n************\n'