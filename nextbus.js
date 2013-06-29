function nextbusRequest() {
    var then = function() {},
        stop = 1001538,
        key = '',
        every = 1000 * 60 * 10,
        timeout = null,
        proxy = function (url) {
            return 'http://www.corsproxy.com/' + encodeURIComponent(url);
        },
        api = function(stop, key) {
            return 'http://api.wmata.com/NextBusService.svc/json/JPredictions?api_key=' + key + '&StopID=' + stop;
        },
        bus = {};

    function getNext() {
        d3.json(proxy(api(stop, key)), function(err, data) {
            timeout = window.setTimeout(getNext, every);
            if (!err) return then(data);
        });
    }

    bus.stop = function(_) {
        if (!arguments.length) return stop;
        stop = _;
        return bus;
    };

    bus.every = function(_) {
        if (!arguments.length) return every;
        every = _;
        return bus;
    };

    bus.then = function(_) {
        if (!arguments.length) return then;
        then = _;
        return bus;
    };

    bus.key = function(_) {
        if (!arguments.length) return key;
        key = _;
        return bus;
    };

    bus.proxy = function(_) {
        if (!arguments.length) return proxy;
        proxy = _;
        return bus;
    };

    bus.start = function(_) {
        getNext();
        return bus;
    };

    bus.stop = function(_) {
        if (timeout) window.clearTimeout(timeout);
        return bus;
    };

    return bus;
}

function nextbus() {
    var limit = 3;

    function bus(selection) {
        selection.each(function(d) {

            var h3 = selection.selectAll('h3').data(function(d) { return [d.StopName]; });
            h3.enter().append('h3');
            h3.text(String);

            var ul = selection.selectAll('ul').data(function(d) { return [d.Predictions]; });
            ul.enter().append('ul');

            var li = ul.selectAll('li').data(function(d) {
                return d.slice(0, limit);
            });
            var liEnter = li.enter().append('li');

            liEnter.append('span')
                .attr('class', 'minutes')
                .text(function(d) { return d.RouteID + ': '; });

            liEnter.append('span')
                .attr('class', 'minutes')
                .text(function(d) { return d.Minutes + 'min '; });

            liEnter.append('span')
                .attr('class', 'direction')
                .text(function(d) { return d.DirectionText; });
        });
    }

    bus.limit = function(_) {
        if (!arguments.length) return limit;
        limit = _;
        return bus;
    };

    return bus;
}
