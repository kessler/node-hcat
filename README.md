# node-Hcat
Pipe html into your browser from command line

You should take a look at [scat](https://github.com/hughsk/scat) which pipes javascript into your browser or [bcat](https://github.com/kessler/node-bcat) for a more log piping oriented module

## usage
```
 --port         set a port for this hcat execution, defaults to 0 (random port)
--hostname     set the hostname for this hcat execution, defaults to localhost
--contentType  set the content type header for this hcat execution, defaults to text/html
```

## example
```
> npm install -g hcat
> echo '<hr>' | hcat
```

Many thanks to all the [contributors](contributors.md)