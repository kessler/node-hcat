# Changelog

## 2.2.2

### Fixed
- `serveOnce`: the process no longer lingers after serving. Keep-alive connections held it open for ~5s, and a second request on the same connection (e.g. the browser's `/favicon.ico`) kept it alive indefinitely. Open connections are now closed once the response is sent.
- An error in the input stream no longer crashes the process with an unhandled `'error'` event (or, if the caller handles the stream's errors, leaves the server hanging). The error is printed to stderr and the response is ended.
