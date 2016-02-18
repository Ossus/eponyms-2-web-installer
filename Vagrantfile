# Setup a box with Couchbase Server, Couchbase Sync Gateway and Flask

if (defined?(ip)).nil?
  IP_ADDRESS = "192.168.10.22"
end

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :private_network, :ip => IP_ADDRESS
  config.vm.provider "virtualbox" do |v|
    v.name = "eponyms"
    v.memory = 1536
  end

  # use cachier plugin if available
  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
  end

  # play Ansible
  config.vm.provision :ansible do |ansible|
    ansible.playbook = "playbook.yml"
    #ansible.tags = "configuration"
    ansible.extra_vars = {
      vagrant_host: IP_ADDRESS
    }
  end
  
  if ARGV[0] == "up" && !ARGV[1]
    puts "\e[32m=== Provisioning server on #{IP_ADDRESS} ==="
  end
end
