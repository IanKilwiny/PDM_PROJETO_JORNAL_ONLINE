import { Text, View, StyleSheet } from "react-native"

export function Header(){
    return (
        <View>
            <Text style={styleHeader.text}>Hello World</Text>
        </View>
    )
}


const styleHeader = StyleSheet.create({
  text: {
    color:"red",
    fontSize:50,
  },
});