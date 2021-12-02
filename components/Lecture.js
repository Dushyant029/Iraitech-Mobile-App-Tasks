import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from "react-native";
import Color from "../Color";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class Lecture extends React.Component {
  state = {
    newLecs: ''
  };

  togLecDone = index => {
      let list = this.props.list
      list.secs[index].done = !list.secs[index].done;

      this.props.updtLec(list);
  }

  addLer = () => {
    let list = this.props.list
    list.secs.push({title:this.state.newLecs, done: false});

    this.props.updtLec(list);
    this.setState({newLecs: ''});

    Keyboard.dismiss();
  }

  renderLec = (secs, index) => {
    return (
      <View style={styles.lecContainer}>
        <TouchableOpacity onPress={() => this.togLecDone(index)}>
          <Ionicons
            name={secs.done ? "ios-square" : "ios-square-outline"}
            size={24}
            color={Color.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.secs,
            {
              textDecorationLine: secs.done ? "line-through" : "none",
              color: secs.done ? Color.gray : Color.black,
            },
          ]}
        >
          {secs.title}
        </Text>
      </View>
    );
  };

  render() {
      const list = this.props.list
    const cnt = list.secs.length;
    const doneCnt = list.secs.filter((sec) => sec.done).length;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={Color.black} />
        </TouchableOpacity>

        <View
          style={[
            styles.lec,
            styles.head,
            { borderBottomColor: list.color },
          ]}
        >
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.lcnt}>
              {doneCnt} of {cnt} lectures
            </Text>
          </View>
        </View>
        <View style={[styles.lec, { flex: 3 }]}>
          <FlatList
            data={list.secs}
            renderItem={({ item,index }) => this.renderLec(item,index)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

       
        <View style={[styles.lec, styles.foot]}>
          <TextInput
            style={[styles.input, { borderColor: list.color }]} onChangeText={(text) => this.setState({ newLecs: text })} value={this.state.newLecs}
          />
          <TouchableOpacity
            style={[styles.addlec, { backgroundColor: list.color }]} onPress={() => this.addLer()}
          >
            <AntDesign name="plus" size={16} color={Color.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lec: {
    flex: 1,
    alignSelf: "stretch",
  },
  head: {
    borderBottomWidth: 3,
    marginLeft: 64,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    color: Color.black,
  },
  lcnt: {
    fontWeight: "600",
    color: Color.silver,
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
    height: 48,
    flex: 1,
  },
  addlec: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  foot: {
    flexDirection: "row",
    paddingHorizontal: 32,
    alignItems: "center",
  },
  lecContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  secs: {
    fontSize: 16,
    fontWeight: "700",
    color: Color.black,
  },
});
