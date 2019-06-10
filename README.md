# Nasa dataset

*Original images retrieved from [NASA](https://images.nasa.gov/)*

A collection of 256x256px images computed with various images from NASA's gallery.

Below is a sample of it :

![Sample](/sample.png?raw=true)

## Regenerate images with different parameters.

You can re-run `index.js` with differents parameters to produce differents images.
The command used to generated `/computed` image is below :

```js
node index.js --size=256 --overlap=0.2 --rotate=true
```

Below is a list of accepted arguments by the utilitary :

| Parameter | Accepted values | Default | Description                                                        |
| --------- | --------------- | ------- | ------------------------------------------------------------------ |
| --size    | [1, +∞[         | 256     | Size of generated images                                           |
| --overlap | [0, 1[          | 0       | Percentage of overlaping space between generated images            |
| --rotate  | true\|false     | true    | Rotate generated images to increase the number of generated images |
