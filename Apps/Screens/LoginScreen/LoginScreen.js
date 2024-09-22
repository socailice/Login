import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Colors from '../../Utils/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/SupabaseConfig';  
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const{startOAuthFlow}=useOAuth({strategy:'oauth_google'});
  const onPress=React.useCallback(async()=>{
    try{
      const {createdSessionId,signIn,signUp,setActive}=
      await startOAuthFlow();
    if(createdSessionId) {
      setActive({session:createdSessionId});
      if(signUp?.emailAddress){
        const { data, error } = await supabase
        .from('User')
        .insert([
        { name: 'Ashish', 
          usernme: 'honey', 
          email: 'bunny',
        },
        ])  
        .select()
        if(data){
          console.log('inserted data',data)
        }
        else{
          console.error('Insert Error:', JSON.stringify(error, null, 2));  // Log full error object
        }
      }
    }
  }
  catch(error){
    console.log(`error`,error)
  }

}
    )
  return (
    <View style={{ flex: 1 }}>
      <Video
        style={styles.video}
        source={{
          uri: 'https://cdn.pixabay.com/video/2017/01/07/7105-198553615_large.mp4'
        }}
        shouldPlay={true}
        resizeMode="cover"
        isLooping={true}
        isMuted={true}
        contentFit='cover' />
        <View>
          <Text 
          style={{fontFamily:'outfit-bold',color:Colors.WHITE,fontSize:50,top:140}}>
            Socialice
          </Text>
        </View>
        <TouchableOpacity 
        onPress={onPress}
        style={{
          fontFamily:'outfit-bold',
          display:'flex',
          alignItems:'center',
          flexDirection:'row',
          justifyContent:'center',
          backgroundColor:Colors.WHITE,
          padding:10,
          borderRadius:99,
          position:'absolute',
          paddingHorizontal:20,
          bottom:150,
          gap:10}}>
          <Image source={require('./../../../assets/images/google.png')}
          style={{
            width:30,
            height:30,
          }} />
          <Text style={{
            color:Colors.BLACK,
            fontFamily:'outfit-medium',
          }}>
            Sign In With Google
          </Text>
        </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  video:{
      height:'100%',
      width:'100%',
      position:'absolute',
      top:0,
      left:-95,
      right:0,
      bottom:0
    }
  }
)

