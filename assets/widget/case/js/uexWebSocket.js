/**
 * Created by ylt on 16/8/23.
 */

if (UNIT_TEST) {


    var uexWebSocketCase = {
        "open": function () {
            uexWebSocket.open("ws://192.168.1.69:8887");
            UNIT_TEST.assert(true);
            uexWebSocket.close();
        },
        "onConnect":function () {

            uexWebSocket.open("ws://192.168.1.69:8887");
            uexWebSocket.onConnect = function() {
                UNIT_TEST.log("--------> connected.")
                UNIT_TEST.assert(true);
            }
        },
        "send":function () {
            uexWebSocket.send("test data");
            UNIT_TEST.assert(true);
        },
        "onMessage": function() {
            UNIT_TEST.log("请用服务端向客户端发送一条消息");
            uexWebSocket.send("test data");
            uexWebSocket.onMessage = function(data) {
                UNIT_TEST.log("[receive data]" + data);
                UNIT_TEST.assert(true);
            }
        },
        "close": function () {
            uexWebSocket.close();
        }

    };
    UNIT_TEST.addCase("uexWebSocketCase", uexWebSocketCase);
}

