# syntax = docker/dockerfile:1.0-experimental
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM threax/build-dotnet:3.1.0 AS build
WORKDIR /src
COPY . .
WORKDIR /src/Files
RUN --mount=type=cache,target=node_modules,id=threax-build-files npm install
RUN --mount=type=cache,target=/root/.nuget/packages,id=threax-build-dotnet-310-nuget dotnet restore Files.csproj
RUN --mount=type=cache,target=/root/.nuget/packages,id=threax-build-dotnet-310-nuget dotnet build Files.csproj -c Release -o /app
RUN --mount=type=cache,target=node_modules,id=threax-build-files npm run clean
RUN --mount=type=cache,target=node_modules,id=threax-build-files npm run build

FROM build AS publish
RUN --mount=type=cache,target=/root/.nuget/packages,id=threax-build-dotnet-310-nuget dotnet publish Files.csproj -c Release -o /app

FROM base AS final
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Files.dll"]
