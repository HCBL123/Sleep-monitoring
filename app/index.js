import React from 'react';
import {
SafeAreaView,
StyleSheet,
View,
Text,
Linking,
StyleProp,
TextStyle,
ViewStyle,
HeaderRNE,
Icon,
TouchableOpacity,
ImageBackground,
Image,
Button,
Animated,
Modal,

} from 'react-native';
import { router, useRouter } from 'expo-router';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Recorder } from 'react-native-audio-toolkit';
import layout from "./_layout";
import { generateResponse } from './ChatGPTService';
import { Configuration, OpenAIApi } from 'openai'
import { ScrollView } from 'react-native-gesture-handler';


const ModalPoup = ({visible, children}) => {
  const [start, stop] = React.useState(false);
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const sendMessage = async () => {
  if (!userInput) return;

  setMessages(prevMessages => [...prevMessages, `User: ${userInput}`]);
  const botResponse = await generateResponse(userInput);
  setMessages(prevMessages => [...prevMessages, `ChatGPT: ${botResponse}`]);
  setUserInput('');
};
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};


const Home = () => {
    const router = useRouter();

    const [start, setstart] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    function myfunction() {
      
      // this.recorder = new Recorder('breathing.mp4').record();
    }
    const sendMessage = async () => {
      var userInput = 'Hãy đưa cho tôi môt số lời khuyên để cải thiên giấc ngủ';
      // if (!userInput) return;

      setMessages(prevMessages => [...prevMessages, `User: ${userInput}`]);
      const botResponse = await generateResponse(userInput);
      setMessages(prevMessages => [...prevMessages, `ChatGPT: ${botResponse}`]);
      setUserInput('');
    };

    return (
      
        <SafeAreaView style = {styles.screen}>
        <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../icons/check-mark.png')}
                style={{height: 50, width: 50}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style = {{alignItems: 'center'}}>
          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>Đánh giá chất lượng giấc ngủ:Môi trường ồn ào, nhịp thở ngắt quãng, ngủ không sâu. Đánh giá giấc ngủ chưa được tốt.</Text>
          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>Một số phương pháp để cải thiện giấc ngủ: Sử dụng tai nghe chống ồn, đeo bịt tai, tạo môi trường yên tĩnh trước khi ngủ</Text>
        </View>
      </ModalPoup>
        <ImageBackground source = {require("../icons/background.png")} resizeMode='cover' style={{flex:1, justifyContent:'center', alignItems:
      'center'}}>
          <TouchableOpacity
              style = {{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 150,
                    width: 150,
                }}
                onPress = {myfunction()}>
           <Image style = {{ alignItems: 'center',width:150, height:150, marginBottom:15}} source={require("../icons/play.png")}/>
           </TouchableOpacity>
            {start ? <Button title = "STOP" color="#841584" onPress={() => {setVisible(true); setstart(!start)}}/>: <Button title = "START" color="#841584" onPress={() => {setVisible(false); setstart(!start)}}/>}
            
          </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
    headerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#397af8',
  marginBottom: 20,
  width: '100%',
  paddingVertical: 15,
},
heading: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
},
headerRight: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textbutton: {
    fontSize: 40,
    color: '#008080',   
    fontWeight: 'bold',
    color:'#fff',
  },
  roundButton2: {
    marginTop: 20,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 300,
    backgroundColor: '#EEA47F',
  },
});


export default Home;