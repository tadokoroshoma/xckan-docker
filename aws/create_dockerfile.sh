#/bin/sh

cp backend/Dockerfile aws/Dockerfile
cat << 'EOF' >> aws/Dockerfile


# Setup AWS CLI
COPY aws/awscli_setup.sh /tmp
RUN chmod +x /tmp/awscli_setup.sh && /tmp/awscli_setup.sh
ARG XCKAN_SITEMAP_URL
ARG XCKAN_SITEMAP_DIR
ENV XCKAN_SITEMAP_URL=${XCKAN_SITEMAP_URL}
ENV XCKAN_SITEMAP_DIR=${XCKAN_SITEMAP_DIR}
EOF