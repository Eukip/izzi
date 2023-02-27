FROM ubuntu:latest

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y curl

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
CMD ["source", "~/.bashrc"]   

CMD ["nvm", "install", "node"] 
CMD ["nvm", "install", "12.18.3"]  

CMD ["nvm", "use", "12.18.3"] 

RUN echo "Node: " && node -v
RUN echo "NPM: " && npm -v


WORKDIR /app/frontend

COPY ./izzi_front/package.json/ .
COPY ./izzi_front/ .

CMD ["npm", "install"]
CMD ["npm", "run", "dev"]
COPY . ./
EXPOSE 8080
