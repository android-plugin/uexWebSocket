package org.zywx.wbpalmstar.plugin.uexwebsocket;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_17;
import org.java_websocket.handshake.ServerHandshake;
import org.zywx.wbpalmstar.engine.EBrowserView;
import org.zywx.wbpalmstar.engine.universalex.EUExBase;

import java.net.URI;
import java.net.URISyntaxException;

public class EUExWebSocket extends EUExBase {
    private WebSocketClient webSocketClient;
    public static final String ON_CONNECT = "uexWebSocket.onConnect";
    public static final String ON_MESSAGE = "uexWebSocket.onMessage";
    public static final String ON_CLOSE = "uexWebSocket.onClose";
    public static final String ON_ERROR = "uexWebSocket.onError";

    public EUExWebSocket(Context context, EBrowserView eBrowserView) {
        super(context, eBrowserView);
    }

    public void open(String []args) {
        //参数需以 "ws://192.168.1.69:8887"这种格式传入
        if (TextUtils.isEmpty(args[0])) {
            return;
        }
        //"ws://192.168.1.69:8887"
        try {
            webSocketClient = new WebSocketClient(new URI(args[0]), new Draft_17()) {
                @Override
                public void onOpen(ServerHandshake serverHandshake) {
                    callBackJsObject(ON_CONNECT, null);
                }

                @Override
                public void onMessage(String s) {
                    callBackJs(ON_MESSAGE, s);
                }

                @Override
                public void onClose(int i, String s, boolean b) {
                    callBackJs(ON_CLOSE, null);
                }

                @Override
                public void onError(Exception e) {
                    e.printStackTrace();
                    callBackJs(ON_ERROR, e.getMessage());

                }
            };
            webSocketClient.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

    }
    public void send(String []args) {
        webSocketClient.send(args[0]);
    }
    public void close(String[] args) {
        webSocketClient.close();
    }


    @Override
    protected boolean clean() {
        return false;
    }
}
