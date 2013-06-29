# NextBus Widget

Hits the `http://api.wmata.com/NextBusService.svc/` API and shows a list
of bus stops.

Requires [cors-proxy](https://github.com/tmcw/cors-proxy) to be running since
the NextBus API doesn't support [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
(yes, the API supports JSONP and making this use [d3.jsonp](https://github.com/d3/d3-plugins/tree/master/jsonp)
is possible)

Grab stop numbers from the API or [this crappy map](http://a.tiles.mapbox.com/v3/tmcw.all_stops/page.html#8.00/38.934/-77.025).

## api

```js
d3.select('#foo').call(nextbus(STOP_NUMBER, API_KEY));
```
