import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Color from "../Color";
import Lecture from "./Lecture";

export default class Section extends React.Component {
  state = {
    showSecVisible: false,
  };

  togSecMod() {
    this.setState({ showSecVisible: !this.state.showSecVisible });
  }
  render() {
    const list = this.props.list;

    const doneCnt = list.secs.filter((sec) => sec.done).length;
    const leftCnt = list.secs.length - doneCnt;

    return (
      <View>
        <Modal
          animationType="fade"
          visible={this.state.showSecVisible}
          onRequestClose={() => this.togSecMod()}
        >
          <Lecture list={list} closeModal={() => this.togSecMod()} updtLec={this.props.updtLec} />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => this.togSecMod()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.cnt}>{leftCnt}</Text>
              <Text style={styles.sub}>Left</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.cnt}>{doneCnt}</Text>
              <Text style={styles.sub}>Done</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    width: 200,
    alignItems: "center",
    borderRadius: 6,
  },
  listTitle: {
    color: Color.white,
    marginBottom: 18,
    fontSize: 24,
    fontWeight: "700",
  },
  cnt: {
    color: Color.white,
    fontSize: 48,
    fontWeight: "200",
  },
  sub: {
    color: Color.white,
    fontSize: 12,
    fontWeight: "700",
  },
});
