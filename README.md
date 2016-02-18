Eponyms 2 Server Installation
=============================

Provisions a box that can run the complete Eponyms 2 stack.
It installs:

- Couchbase Server (port `8091`) [🔹][couchbase-server]
- Couchbase Sync Gateway (port `4999`) [🔹][sync-gateway]
- _NOT YET:_ Eponyms 2 Python web app

By default, the provisioned machine is available on [192.168.10.22](http://192.168.10.22) from the host machine.
Couchbase server wil be running on default port [`8091`](http://192.168.10.22:8091).
The Sync gateway will be running on default port `4984`, externally available via Nginx on port [`4999`](http://192.168.10.22:4999).

### -> STILL NEEDS to setup supervisor to run the sync gateway


Configuration
-------------

Most important configuration variables, like admin username+password, live in `couchbase-server.yml`.


Installation
------------

1. Install [Vagrant][] and [Ansible][]
2. Install vagrant cachier plugin (doesn't seem to work correctly though):
        
        $ vagrant plugin install vagrant-cachier

3. Run:

        $ vagrant up

4. You can now configure Couchbase by going through the setup wizard on [192.168.10.22:8091](http://192.168.10.22:8091)


### Vagrant Basics

- `vagrant up`: Build and run the VM
- `vagrant provision`: Update VM
- `vagrant ssh`: SSH into the VM
- `vagrant halt`: Shut down gracefully
- `vagrant destroy`: Destroy entire VM


Docker
------

1. Install **Docker** (`brew install docker-compose`) and [VirtualBox][].
2. Create default machine:
    
    $ docker-machine create --driver virtualbox default

3. Start the default machine and setup the environment:
    
    $ docker-machine start default
    $ eval "$(docker-machine env default)"

4. Make Docker install Couchbase server and Sync Gateway using settings in `docker-compose.yml`:
    
    $ docker-compose up -d

5. Install Sync Gateway, using configuration `couchbase-sync-gateway.json`:
    
    $ docker run -p 4984:4984 -p 4985:4985 couchbase/sync-gateway couchbase-sync-gateway.json

0. Access N1QL interface:
    
    $ docker run -it couchbase /opt/couchbase/bin/cbq \
      -engine=http://$(docker-machine ip default):8093


### Docker Basics

- `docker-machine create --driver virtualbox default`: Create machine _default_ using VirtualBox.
- `docker-machine start default`: Start the machine called _default_.
- `docker-machine env`: see docker machine environment.
- `eval "$(docker-machine env default)"`: Configure current shell with the docker machine.


[sync-gateway]: http://developer.couchbase.com/mobile/develop/guides/sync-gateway/
[couchbase-server]: http://www.couchbase.com/nosql-databases/couchbase-server
[vagrant]: http://www.vagrantup.com/downloads
[ansible]: http://docs.ansible.com
[VirtualBox]: https://www.virtualbox.org/wiki/Downloads
