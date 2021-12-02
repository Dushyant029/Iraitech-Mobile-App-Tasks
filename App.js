import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import color from "./Color";
import { AntDesign } from "@expo/vector-icons";
import ddata from "./ddata";
import Section from "./components/Section";
import AddSec from "./components/AddSec";
import Color from "./Color";

export default class App extends React.Component {
  state={
    addSecVisible: false,
    lecs: ddata
  }

  togAddModal() {
    this.setState({addSecVisible: !this.state.addSecVisible})
  }

  showSec = list => {
    return <Section list={list}  updtLec={this.updtLec}/>
  }

  addLec = list => {
    this.setState({lecs: [...this.state.lecs, { ...list, id: this.state.lecs.length+1,secs: []}]});
  };

  updtLec = list => {
    this.setState({
      lecs: this.state.lecs.map(item => {
        return item.id === list.id ? list: item;
      })
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType="fade" visible={this.state.addSecVisible} onRequestClose={()=>this.togAddModal()}>
          <AddSec closeModal={() => this.togAddModal()} addLec={this.addLec} />
        </Modal>  
        <View style={{ flexDirection: "row" }}>
          <View style={styles.section} />
          <Text style={styles.title}>
            Task 1 <Text style={{ fontWeight: "300", color: color.pink }}>
              Nested Control
            </Text>
          </Text>
          <View style={styles.section} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addsec} onPress={() => this.togAddModal()}>
            <AntDesign name="plus" size={16} color={color.pink} />
          </TouchableOpacity>

          <Text style={styles.add}>Add Section</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lecs}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.showSec(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
        <View><Text style={{marginTop: 50, color:Color.pink}}>Made by Dushyant</Text></View>
        <StatusBar style="auto" />
      </View>
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
  section: {
    backgroundColor: color.cream,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: color.black,
    paddingHorizontal: 6,
  },
  addsec: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: color.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
    color: color.pink,
  },
});
