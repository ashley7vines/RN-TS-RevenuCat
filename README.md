# Expo Project

This project is built using Expo. Follow the steps below to set up and run the project locally, as well as to create new release builds.

## Installation

To install the project dependencies, use the following command:

```bash
npx yarn install
```

## Running the project Locally

Prebuild the project to generate the necessary native code:

```bash
npx expo prebuild
```

Start the project in development mode:

```bash
npx expo start
```

This command will start the Metro server and the Expo app on your phone or tablet.

To build the project, use the following command:

```bash
npx expo run:android  / npx expo run:ios
```

## Creating a New Release Build Using EAS

Update the build number in the app.config.ts file. Make sure to increment the build numbers for both Android and iOS. Optionally, update the app version if necessary.

Build the project using the Expo Application Services (EAS):

```bash
eas build --profile production
```

## Publishing the App to TestFlight / Google Play

To publish the app to TestFlight / Google Play, use the following command:

```bash
eas submit
```

Follow the prompts to select the build you want to upload.
