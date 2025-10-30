# ====== Build stage ======
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only the pom first to leverage Docker layer caching
COPY pom.xml ./
RUN mvn -q -e -DskipTests dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn -q -DskipTests package

# ====== Runtime stage ======
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the fat jar from the build stage
# Spring Boot jar will be named <artifactId>-<version>.jar
COPY --from=build /app/target/app-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

# Optional: pass JVM options via JAVA_OPTS env var
ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]

