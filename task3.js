// YandexTask
// Kuvakin Sergey (https://github.com/lafin)

// 3.   Допустим, параметры http-запроса хранятся как свойства объекта. Напишите функцию сериализации параметров в query-строку с добавлением к произвольному url

// extend task1.js
/*global urlParser:false*/

urlParser.makeQuery = function (params) {
    var str = '';
    for (var name in params) {
        if (params.hasOwnProperty(name)) {
            str += name + '=' + params[name] + '&';
        }
    }
    return str.substring(0, str.length - 1);
};

urlParser.appendQuery = function (urlObject, query) {
    urlObject.query += '&' + query;
    return urlObject;
};

urlParser.serialize = function (urlObject) {
    var url = '';
    url += urlObject.protocol + '://';
    url += urlObject.auth ? urlObject.auth + '@' : '';
    url += urlObject.host;
    url += urlObject.pathname ? urlObject.pathname + '?' : '';
    url += urlObject.query || '';
    url += urlObject.hash ? '#' + urlObject.hash : '';
    return url;
};

var params = {
    name1: 'value1',
    name2: 'value2'
};

var url = 'http://user:pass@host.com:8080/a/b/c/path?query=string#hash';
var urlObject = urlParser.set(url).parse();
urlObject = urlParser.appendQuery(urlObject, urlParser.makeQuery(params));
console.log(urlParser.serialize(urlObject));