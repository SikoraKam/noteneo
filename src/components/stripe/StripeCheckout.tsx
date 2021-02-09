import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';

interface StripeCheckoutProps {
  publicKey: string;
  sessionId: string;
  onClose: () => void;
  modalVisible: boolean;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  publicKey,
  sessionId,
  onClose,
  modalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={false}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <TouchableOpacity
        onPress={() => onClose()}
        style={[styles.closeButtonOpacity]}>
        <Text style={[styles.closeButtonText]}>X</Text>
      </TouchableOpacity>
      <WebView
        javaScriptEnabled
        scrollEnabled={false}
        bounces={false}
        originWhitelist={['*']}
        startInLoadingState
        source={{
          html: `<script src="https://js.stripe.com/v3"></script>
                            <script>
                            var stripe = Stripe('${publicKey}');
                            window.onload = function() {
                                stripe.redirectToCheckout({
                                      // Define the sessionId you get server side
                                      sessionId: '${sessionId}'
                                  }).then(function (result) {
                                  // If \`redirectToCheckout\` fails due to a browser or network
                                  // error, display the localized error message to your customer
                                  // using \`result.error.message\`.
                                  window.postMessage("WINDOW_CLOSED", "*");
                                });
                            };
                            </script>`,
          baseUrl: '',
        }}
        onMessage={(event) =>
          event.nativeEvent.data === 'WINDOW_CLOSED'
            ? onClose()
            : console.log('Event: ' + event.nativeEvent.data)
        }
        style={[{ flex: 1 }]}
        scalesPageToFit={Platform.OS === 'android'}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButtonOpacity: {
    width: 30,
    height: 30,
    backgroundColor: '#a1a1a1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginTop: 5,
    marginLeft: 5,
  },
  closeButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
