FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:24-trixie

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ENV USER_UID=${USER_UID}
ENV USER_GID=${USER_GID}
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

# Add minio CLI
RUN wget -O mc https://release-assets.githubusercontent.com/github-production-release-asset/29329884/6c9241c5-4c73-4ea3-bdf1-3aa331f92b15 \
  && mv mc /usr/local/bin/minio-cli \
  && chmod +x /usr/local/bin/minio-cli
