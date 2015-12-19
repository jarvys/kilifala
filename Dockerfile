FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm 
RUN     yum install -y git 

# Install bower
RUN npm install -g bower --registry=http://registry.npm.taobao.org

# Bundle app source
COPY . /src

# Install app dependencies
RUN cd /src; npm install --production --registry=http://registry.npm.taobao.org
RUN cd /src; bower install --allow-root

WORKDIR /src

CMD ["node", "app.js"]

