#/bin/sh

# AWS CLI setup
cd /tmp
apk --no-cache add binutils curl
curl -sL https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub -o /etc/apk/keys/sgerrand.rsa.pub
curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-2.33-r0.apk
curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-bin-2.33-r0.apk
apk add --no-cache glibc-2.33-r0.apk glibc-bin-2.33-r0.apk
curl -sL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip
unzip -q awscliv2.zip
aws/install
rm -rf aws*

mkdir /root/.aws
cat << 'EOF' > /root/.aws/config
[default]
region = ap-northeast-1
output = json
EOF