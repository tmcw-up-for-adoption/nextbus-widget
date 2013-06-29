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
var every = 1000 * 60 * 2;
nextbusRequest()
    .stop(1001538)
    .key('c23qpgm7cxvc47fvw4zx57ht')
    .every(every)
    .proxy(function(url) {
        return 'http://hidden-cove-3992.herokuapp.com/?url=' +
            encodeURIComponent(url) + '&freshness=' + every;
    })
    .then(function(data) {
        d3.select('#nextbus').datum(data).call(nextbus());
    })
    .start();
```

It's two parts: `nextbusRequest()` does the requesting of `.stop`
`.every` given number of milliseconds with your `.key` and through a
`.proxy` since the API doesn't do [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
You can `.start` and `.stop` the auto-polling.

`nextbus()` displays stops on a page and right now you can just `.limit`
how many stops are shown.
