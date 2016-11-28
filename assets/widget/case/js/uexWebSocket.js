/**
 * Created by ylt on 16/8/23.
 */

if (UNIT_TEST) {


    var uexWebSocketCase = {
        "open": function () {
             var data = {
                url: "ws://192.168.1.69:8887"
            }
            uexWebSocket.open(data);
            UNIT_TEST.assert(true);
            uexWebSocket.close();
        },
        "onConnect":function () {
             var data = {
                url: "ws://192.168.1.69:8887"
            }
            uexWebSocket.open(data);
            uexWebSocket.onConnect = function() {
                UNIT_TEST.log("--------> connected.")
                UNIT_TEST.assert(true);
            }
        },
        "send":function () {
            var data = {
                data: 'text'
            }
            uexWebSocket.send(data);
            UNIT_TEST.assert(true);
        },
        "onMessage": function() {
            UNIT_TEST.log("请用服务端向客户端发送一条消息");
            var data = {
                data: 'text'
            }
            uexWebSocket.send(data);
            uexWebSocket.onMessage = function(data) {
                UNIT_TEST.log("[receive data]" + data);
                UNIT_TEST.assert(true);
            }
        },
        "close": function close() {
            uexWebSocket.();
            UNIT_TEST.assert(true);
        }

    };
    UNIT_TEST.addCase("uexWebSocketCase", uexWebSocketCase);
}

