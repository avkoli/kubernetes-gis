FROM ubuntu:latest

ARG ACCEPT_EULA=Y
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=Europe/Zagreb 

ARG GS_VERSION=2.19.2
ARG WAR_URL=https://downloads.sourceforge.net/project/geoserver/GeoServer/${GS_VERSION}/geoserver-${GS_VERSION}-war.zip
ARG BIN_URL=https://downloads.sourceforge.net/project/geoserver/GeoServer/${GS_VERSION}/geoserver-${GS_VERSION}-bin.zip
ARG GEOSERVER_UID=1000
ARG GEOSERVER_GID=10001
ARG USER=gsuser
ARG GROUP_NAME=gsusers

RUN apt-get -y update; apt-get -y --no-install-recommends install fonts-cantarell lmodern ttf-aenigma \
    ttf-georgewilliams ttf-bitstream-vera ttf-sjfonts tv-fonts  libapr1-dev libssl-dev  \
    gdal-bin libgdal-java wget zip unzip curl xsltproc certbot  cabextract gettext postgresql-client figlet toilet \
    curl wget zip unzip nano \
    openjdk-11-jdk openjdk-11-jre

ENV \
    JAVA_HOME=${JAVA_HOME} \
    DEBIAN_FRONTEND=noninteractive \
    GEOSERVER_DATA_DIR=/geoserver/data_dir \
    GEOSERVER_HOME=/geoserver \
    HTTPS_PORT=8443 \
    HTTP_PORT=8080

WORKDIR /scripts

RUN wget ${BIN_URL}
RUN unzip geoserver-${GS_VERSION}-bin.zip -d /geoserver

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

RUN echo 'figlet -t "GeoServer"' >> ~/.bashrc

RUN groupadd -r ${GROUP_NAME} -g ${GEOSERVER_GID} && \
    useradd -m -d /home/${USER}/ -u ${GEOSERVER_UID} --gid ${GEOSERVER_GID} -s /bin/bash -G ${GROUP_NAME} ${USER}

RUN chown -R ${USER}:${GROUP_NAME} ${GEOSERVER_HOME} /scripts /tmp/ /home/${USER}/  
USER ${GEOSERVER_UID}:${GEOSERVER_GID} 
VOLUME ["${GEOSERVER_DATA_DIR}"]
WORKDIR ${GEOSERVER_HOME}

EXPOSE $HTTP_PORT
EXPOSE $HTTPS_PORT

CMD ["/bin/bash", "/scripts/entrypoint.sh"]