# hcat
Pipe html into your browser from command line

You should take a look at [scat](https://github.com/hughsk/scat) which pipes javascript into your browser or [bcat](https://github.com/kessler/node-bcat) for a more log piping oriented module

## CLI tool
```
npm install -g hcat
echo '<hr>' | hcat
```

### command line parameters

```
--port              set a port for this hcat execution, defaults to 0 (random port)
--hostname     set the hostname for this hcat execution, defaults to localhost
--contentType  set the content type header for this hcat execution, defaults to text/html
```

## API

```
npm install --save hcat
```

```js
const hcat = require('hcat')
const fs = require('fs')

// config is optional
hcat(fs.createReadStream('foo.html'), { port: 8080 })

```

Many thanks to all the contributors