import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'
export default function HomeScreen() {
    const {user}=useUser();
    useEffect(()=>{
        user&&updateProfileImage();
    },[user])
    const updateProfileImage=async()=>{
        const {data,error}=await supabase
        .from('User')
        .update({'profileImage':user?.imageUrl})
        .eq('email',user?.primaryEmailAddress?.emailAddress)
        .is('profileImage',null)
        .select();
    }
    return (
    <View>
        <Text>HomeScreen</Text>
    </View>
  )
}