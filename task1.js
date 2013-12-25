// YandexTask
// Kuvakin Sergey (https://github.com/lafin)

// 1.   Напишите функцию разбора query-строки в набор параметров.

var urlParser = (function () {

    // private
    var url = null;

    // public
    return {
        set: function (_url) {
            url = _url;
            return this;
        },
        parse: function () {
            var protocolPoint, protocol, bodyPoint, body, authPoint, auth, hostPoint, host, pathPoint, pathBody, path, hash, pathname, query, prepareHost, hostname, port;
            protocolPoint = url.indexOf('://');
            protocol = url.substring(0, protocolPoint);

            bodyPoint = url.indexOf('/', protocolPoint + 3);
            body = (~bodyPoint) ? url.substring(protocolPoint + 3, bodyPoint) : url.substring(protocolPoint + 3);

            authPoint = body.indexOf('@');
            auth = (~authPoint) ? body.substring(0, authPoint) : null;

            hostPoint = (~authPoint) ? authPoint + 1 : 0;
            host = body.substring(hostPoint);

            prepareHost = host.split(':');
            hostname = prepareHost[0] || null;
            port = prepareHost[1] || null;

            pathPoint = protocolPoint + 3 + body.length;
            pathBody = url.substring(pathPoint).split('#');
            path = pathBody[0] || null;
            hash = pathBody[1] || null;

            pathBody = path.split('?');
            pathname = pathBody[0] || null;
            query = pathBody[1] || null;

            return {
                protocol: protocol, // http
                host: host, // host.com:8080
                auth: auth, // user:pass
                hostname: hostname, // host.com
                port: port, // 8080
                pathname: pathname, // /a/b/c/path
                path: path, // /a/b/c/path?query=string
                query: query, // query=string
                hash: hash // hash
            };
        }
    };
}());

var url = 'http://user:pass@host.com:8080/a/b/c/path?query=string#hash';

console.log(urlParser.set(url).parse());