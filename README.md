# Running Production High Availability Docker Services on CoreOS using Fleet, Flannel, Etcd, Confd & Nginx

- View the diagram of what's going on: https://drive.google.com/file/d/0B74l6vUHf9HrMzNrYUlyMm40RWs/view?usp=sharing

## Tools used:
- `coreos`: server machine clustering via a shared cloud-config.yml
- `etcd`: key value store for service registration and discovery
- `fleet`: scheduling/failover of docker containers across coreos cluster
- `flannel`: Gives each docker container a unique ip that allows you to access the internal port (i.e. port 80 not 32679)
- `confd`: watch etcd for nodes arriving/leaving - template nginx configuration files / reload nginx on change

## Docker Containers Used:
- `willrstern/node-sample`: a sample node.js app that simply echoes it's APPNAME environment variable
- `willrstern/nginx-lb`: a reusable nginx + confd image
  - it uses confd to watch etcd and configure nginx to load balance for multiple docker containers
  - it watches `keys/services/<servicename>/upstream` folder and reloads nginx with an updated config when upstream nodes change
  - requires 2 env variables: `SERVICE_NAME` and `ETCD` so it knows which servicename to watch in etcd's registry
- `willrstern/nginx-dns`: an nginx + confd image for dynamic DNS based off of etcd entries in the `subdomain` folder
  - requires 1 env variable: `ETCD` the ip address + port of the etcd instance it's watching
