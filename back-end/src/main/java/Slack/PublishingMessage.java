package Slack;

import com.slack.api.methods.SlackApiException;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import com.slack.api.Slack;


public class PublishingMessage {

    /**
     * Post a message to a channel your app is in using ID and message text
     */
    static void publishMessage(String id, String text) {
        // you can get this instance via ctx.client() in a Bolt app
        var client = Slack.getInstance().methods();
        var logger = LoggerFactory.getLogger("my-awesome-slack-app");
        try {
            // Call the chat.postMessage method using the built-in WebClient
            var result = client.chatPostMessage(r -> r
                            // The token you used to initialize your app
                            .token("xoxb-7153877952561-7143689860164-EnZOLImd2z663poEJzKDk4Kw")
                            .channel(id)
                            .text(text)
                    // You could also use a blocks[] array to send richer content
            );
            // Print result, which includes information about the message (like TS)
            logger.info("result {}", result);
        } catch (IOException | SlackApiException e) {
            logger.error("error: {}", e.getMessage(), e);
        }
    }

    public static void main(String[] args) throws Exception {
        publishMessage("C0747L675LL", "Hello world :tada:");
    }

}


