FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl python-pip
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

COPY . /server

RUN curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
RUN bash Miniconda3-latest-Linux-x86_64.sh -b
ENV PATH="/root/miniconda3/bin:${PATH}"
RUN conda install numpy flask gunicorn pandas

WORKDIR /server

RUN npm install

CMD npm run build && npm run gunicorn

