function nextbus(stop, api_key) {
    function proxy(url) {
        return 'http://localhost:3001/?url=' + encodeURIComponent(url);
    }
    return function(selection) {
        var key = api_key || 'YOUR_KEY';

        function getNext(cb) {
            var api = 'http://api.wmata.com/NextBusService.svc/json/JPredictions?api_key=' + key + '&StopID=' + stop;
            d3.json(proxy(api), function(err, data) {
                if (!err) cb([data]);
            });
        }

        function run() {
            getNext(function(data) {
                var div = selection.selectAll('div.content').data(data);
                var enter = div.enter().append('div').attr('class', 'content');
                enter.append('h3');
                enter.append('ul');

                div.select('h3').text(function(d) {
                    return d.StopName;
                });

                var predictions = div.select('ul').selectAll('li')
                    .data(function(d) {
                        return d.Predictions.slice(0, 3);
                    });

                predictions.exit().remove();
                var predictionEnter = predictions.enter()
                    .append('li');

                predictionEnter.append('span')
                    .attr('class', 'minutes')
                    .text(function(d) {
                        return d.RouteID + ': ';
                    });

                predictionEnter.append('span')
                    .attr('class', 'minutes')
                    .text(function(d) {
                        return d.Minutes + 'min ';
                    });

                predictionEnter.append('span')
                    .attr('class', 'direction')
                    .text(function(d) {
                        return d.DirectionText;
                    });
            });
        }

        window.setInterval(run, 20 * 1000);
        run();
    };
}
