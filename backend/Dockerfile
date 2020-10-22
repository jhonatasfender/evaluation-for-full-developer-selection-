FROM maven:3.6.3-jdk-11

COPY . /backend

WORKDIR /backend

RUN mvn package -Dmaven.test.skip=true 

ENTRYPOINT [ "mvn", "spring-boot:run" ]