NETWORK="network-olsoftware-challenge"
if docker network inspect ${NETWORK} > /dev/null 2>&1
then
    echo "Network '${NETWORK}' already exists"
else
    echo "Network '${NETWORK}' doesn't exist; creating it"
    docker network create ${NETWORK}
fi
docker run -d --rm -it \
    -e 'VITE_API_HOSTNAME=https://ol-software-node-api-json-server-backend.onrender.com' \
    --name olsoftware-react-challenge \
    --network network-olsoftware-challenge \
    olsoftware-react-challenge:latest