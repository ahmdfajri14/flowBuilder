#!/bin/bash

DEPLOY_SERVER=$VM_IPADDRESS

echo "Deploying to ${VM_IPADDRESS}"
ssh root@${VM_IPADDRESS} 'bash' < ./deploy/server.sh