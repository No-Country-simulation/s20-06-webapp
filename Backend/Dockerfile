FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn dependency:go-offline && mvn clean package -DskipTests

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/comirest-0.0.1-SNAPSHOT.jar /app/comirest.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/comirest.jar"]
