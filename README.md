# node-Hcat
Pipe html into your browser from command line

You should take a look at [scat](https://github.com/hughsk/scat) which pipes javascript into your browser or [bcat](https://github.com/kessler/node-bcat) for a more log piping oriented module

## usage
```
 --port                   set a port for this hcat execution
```
- _An available port between 8080 - 8181 will be automatically picked if --port is not specified_

## example
```
> npm install -g hcat

> echo '<hr>' | hcat