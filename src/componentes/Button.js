import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const MyButton = (props) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: props.btnColor }]} onPress={props.customPress}>
      <View>
        <Icon style={styles.icon} name={props.btnIcon} size={35} color='white' />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    padding: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10
  },
  text: {
    color: 'white',
  },
  icon: {
    paddingBottom: 5
  }
});