import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const InputText = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        underlineColorAndroid="transparent"
        maxLength={props.maxLength}
        minLength={props.minLength}
        onChangeText={props.onChangeText}
        editable={props.editable}
        placeholder={props.placeholder}
        placeholderTextColor="orange"
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={[props.style, styles.text]}
        blurOnSubmit={false}
        value={props.value}
        defaultValue={props.defaultValue}
        autoCapitalize={props.autoCapitalize}
      />
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderColor: "#d3d3d3",
    borderWidth: 3,
    padding: 2,
    backgroundColor: "#7d7f7d"
  },
  text: {
    color: 'black',
  }
})
