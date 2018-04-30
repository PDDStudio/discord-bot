FROM ubuntu

RUN apt-get update \
    && apt-get install \
    build-essential \
    cmake \
    pkg-config \
    wget \
    git \
    execstack \
    python \
    libgtk2.0-dev \
    libavcodec-dev \
    libavformat-dev \
    libswscale-dev \
    curl \
    net-tools \
    iputils-ping \
    python3-virtualenv \
    python3-venv \
    python3-pip \
    python3-dev \
    libcairo2-dev \
    libjpeg8-dev \
    libpango1.0-dev \ 
    libgif-dev \
    build-essential \
    g++ \
    -yy

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 9.9.0

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

EXPOSE 8081

CMD ["npm", "start"]
