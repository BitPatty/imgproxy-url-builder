# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# See https://github.com/microsoft/vscode-dev-containers/tree/master/containers/docker-from-docker for more documentation
# On how to use docker from within docker

# Install Docker CE CLI
RUN apt-get update \
  && apt-get install -y apt-transport-https ca-certificates curl gnupg2 lsb-release \
  && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null \
  && echo "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt-get install -y docker-ce-cli

# Install Docker Compose
RUN LATEST_COMPOSE_VERSION=$(curl -sSL "https://api.github.com/repos/docker/compose/releases/latest" | grep -o -P '(?<="tag_name": ").+(?=")') \
  && curl -sSL "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
  && chmod +x /usr/local/bin/docker-compose

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

# Add the node user to the docker group to access
# the daemon without sudo
RUN groupadd docker
RUN usermod -a -G docker node

# Add minio CLI
# See https://min.io/download#/linux
RUN wget https://dl.min.io/client/mc/release/linux-amd64/mc \
  && mv mc /usr/local/bin/minio-cli \
  && chmod +x /usr/local/bin/minio-cli
