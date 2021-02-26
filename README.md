# MQ-getput
This repo lets you create a nodejs server to process MQ messages from the Queue Manager 


Install/unzip IBM MQ client

# Mac
<a href="https://public.dhe.ibm.com/ibmdl/export/pub/software/websphere/messaging/mqdev/mactoolkit/" >IBM MQ MacOS toolkit for developers v 9.1.1.0 download </a>

Add <unzip location>/IBM-MQ-Toolkit-Mac-x64-9.1.1.0/bin and <unzip location>/IBM-MQ-Toolkit-Mac-x64-9.1.1.0/samp/bin, to the PATH by editing /etc/paths

export DYLD_LIBRARY_PATH=<unzip location>/IBM-MQ-Toolkit-Mac-x64-9.1.1.0/lib64

export MQ_INSTALLATION_PATH=<unzip location>/IBM-MQ-Toolkit-Mac-x64-9.1.1.0

# Windows
<a href="https://www-945.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.1.1&platform=Windows+64bit,+x86&function=fixId&fixids=9.1.1.0-IBM-MQC-Win64+&useReleaseAsTarget=true&includeSupersedes=0"> Windows client v 9.1.1.0 download </a> 

# Linux
<a href="https://www-945.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.1.1&platform=Linux+64bit,x86_64&function=fixId&fixids=9.1.1.0-IBM-MQC-UbuntuLinuxX64+&useReleaseAsTarget=true&includeSupersedes=0">
Linux Ubuntu client v 9.1.1.0 download </a>

To run the examples cd to the Node.js directory and install the prerequsites by running :

# npm install
npm install 
