// YandexTask
// Kuvakin Sergey (https://github.com/lafin)

// 2.   Напишите систему сравнения двух наборов параметров форм (включая html-интерфейс). Имена параметров могут повторяться. Система должна отвечать на вопрос: «Что изменилось в параметрах?»..

var formParser = (function () {

    // private
    var form = null;

    // public
    return {
        set: function (_form) {
            form = _form;
            return this;
        },
        getMap: function () {
            var domElement = form.elements,
                map = [];
            for (var i in domElement) {
                if (domElement.hasOwnProperty(i)) {
                    var name = domElement[i].name,
                        value = domElement[i].value;
                    if (domElement[i].nodeName === 'INPUT') {
                        map.push({
                            name: name,
                            value: value
                        });
                    }
                }
            }
            return map;

        },
        // Что изменилось в параметрах?
        diff: function (arrayFirst, arraySecond) {
            var msg = {
                deleted: [],
                added: [],
                changed: []
            };
            for (var i in arrayFirst) {
                if (arrayFirst.hasOwnProperty(i)) {
                    var el = arrayFirst[i];
                    var find = false;
                    for (var j in arraySecond) {
                        if (arraySecond.hasOwnProperty(j)) {
                            var elSecond = arraySecond[j];
                            if (el.name === elSecond.name) {
                                if (el.value !== elSecond.value) {
                                    msg.changed.push('changed element: ' + elSecond.name + ' old value: ' + el.value + ' new value: ' + elSecond.value);
                                }
                                find = true;
                                delete arraySecond[j];
                                break;
                            }
                        }
                    }
                    if (!find) {
                        msg.deleted.push('deleted element: ' + el.name);
                    }
                }
            }
            for (var k in arraySecond) {
                if (arraySecond.hasOwnProperty(k)) {
                    msg.added.push('added element: ' + arraySecond[k].name);
                }
            }
            return msg;
        }
    };
}());

var form1 = formParser.set(document.getElementById('form1')).getMap();
var form2 = formParser.set(document.getElementById('form2')).getMap();
console.log(formParser.diff(form1, form2));