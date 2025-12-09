# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:24-trixie

# See https://github.com/microsoft/vscode-dev-containers/tree/master/containers/docker-from-docker for more documentation
# On how to use docker from within docker

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ENV USER_UID=${USER_UID}
ENV USER_GID=${USER_GID}
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

# Add minio CLI
# See https://min.io/download#/linux
RUN wget https://dl.min.io/client/mc/release/linux-amd64/mc \
  && mv mc /usr/local/bin/minio-cli \
  && chmod +x /usr/local/bin/minio-cli
