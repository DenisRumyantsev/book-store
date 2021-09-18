FROM cypress/included:6.8.0
WORKDIR /app
COPY ./E2E/ ./
ENTRYPOINT npm run cy:run
