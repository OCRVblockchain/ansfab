# AnsFab
Ansible-based utility for easy Hyperledger Fabric deployment

## Technical requirements:
Your machine should have:
* GNU/Linux or MacOS operating system
* Ansible 2.5.0+ 

## Ports, used by default, you probably want to whitelist them in your firewall.

### Ports, needed for blockchain instances to communicate with each other:

* **7050** - Hyperledger fabric orderer port
* **7054** - Hyperledger fabric CA port
* **7051** - Hyperledger fabric peer port
* **22** - ssh, or any other port number, needed for inital ansible deployment only

If you are deploying for the first time, run:
```sudo ansible-playbook -i inventory/nodes install-dependencies.yml```

## Launch deployment
Step 1. ```sudo ansible-playbook -i inventory/nodes config-network.yml```. 
At this step, the crypto materials necessary for the further operation of the network will be generated. 

Step 2. ```sudo ansible-playbook -i inventory/nodes start-network.yml```. 
After this command, the network will be launched on the specified nodes (```inventory/nodes``` dir)
