import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../Color";
import ddata from "../ddata";

export default class AddSec extends React.Component {
  backgroundColors = ["#34568B", "#FF6F61", "#6B5B95", "#88B04B", "#92A8D1"];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createSec = () => {
      const {name,color} = this.state
        const list = {name,color};
        this.props.addLec(list);
        this.setState({name:''});
        this.props.closeModal();
  };

  showColors() {
    return this.backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.selectclr, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={Colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create Section</Text>
          <TextInput
            style={styles.txt}
            placeholder="Section Name"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            {this.showColors()}
          </View>

          <TouchableOpacity
            style={[styles.crate, { backgroundColor: this.state.color }]} onPress={this.createSec}
          >
            <Text style={{ fontWeight: "600", color: Colors.white }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    marginBottom: 16,
    color: Colors.black,
    fontSize: 28,
    fontWeight: "800",
  },
  txt: {
    fontSize: 18,
    marginTop: 8,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.pink,
  },
  crate: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 24,
    borderRadius: 6,
  },
  selectclr: {
    height: 30,
    width: 30,
    borderRadius: 4,
  },
});
