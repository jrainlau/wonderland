# wonderland
An Electron app for learning `electron-updater`.

## Development

```
git clone https://github.com/jrainlau/wonderland.git

cd wonderland && yarn

yarn start
```

## Testing `electron-updater`

1. Building a base version
```
yarn build:mac
```
After building, a folder named `dist/1.0.1` will be generated, and you can build a new version in next step.

2. Building an upgrade version
```
yarn build:mac
```
After building, a folder named `dist/1.0.2` will be generated, this is the new version of 1.0.0.

3. Turning on the static server
`electron-updater` will fetch a `latest-mac.yml` file from a static server to find out whether it has an available upgrade.

```
yarn serve
```
The command above will turn on a static server to serve the `dist` folder.

4. Testing upgrade
Find out the `wonderland.app` inside the `dist/1.0.1` folder, and run it. (In my situation, my `wonderland.app` was located at `dist/1.0.1/mac-arm64` folder).

Now you are running the app in version `1.0.1`. It's time to switch to version `1.0.2` which were built by step 2!

Enter `1.0.2` to the input and click "Check update", then the `electron-updater` inside the app will fetch the upgrade as version `1.0.2` from `localhost:8081/dist/1.0.2`.

As soon as the upgrade ready, a dialog will be present to the left bottom, all you need to do is to click "Restart" button.

Once the app restarted, the version will be upgrade to `1.0.2`.