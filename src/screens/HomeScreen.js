import React from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";

const ENDPOINT = "https://api.nasa.gov/neo/rest/v1/neo";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      details: [],
      loader: false,
    };
  }

  findRandomId = async () => {
    this.setState({ loader: true });

    await axios
      .get(`${ENDPOINT}/browse?api_key=${API_KEY}`)
      .then((response) => {
        this.setState({
          details: response.data.near_earth_objects,
        });
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        this.setState({ loader: false });
      });

    const r1 = Math.round(Math.random() * this.state.details.length);
    this.props.navigation.navigate("Random", { obj2: this.state.details[r1] });
  };
  findID = async () => {
    this.setState({ loader: true });

    await axios
      .get(`${ENDPOINT}/${this.state.data}?api_key=${API_KEY}`)
      .then((response) => {
        this.props.navigation.navigate("Random", { obj2: response.data });
      })
      .catch((e) => {
        alert("WRONG ID");
      })
      .finally(() => {
        this.setState({ loader: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            value={this.state.data}
            style={{
              width: 200,
              height: 40,
              borderBottomWidth: 2,
              borderColor: "gray",
              alignSelf: "center",
              marginTop: 30,
            }}
            placeholder={"TYPE HERE"}
            onChangeText={(t1) => {
              this.setState({
                data: t1,
              });
            }}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              if (this.state.data.trim() === "") {
                alert("YOU MUST ENTER ID");
              } else {
                this.findID();
                this.setState({ data: "" });
              }
            }}
          >
            <Text style={styles.textStyles}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.findRandomId();
            }}
          >
            <Text style={styles.textStyles}>RANDOM</Text>
          </TouchableOpacity>
          <ActivityIndicator
            size={"large"}
            animating={this.state.loader}
            color="green"
            style={{ marginTop: 100 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF5F5",
  },
  subContainer: {
    flex: 0.8,
    backgroundColor: "#D6E4E5",
    marginTop: 40,
    alignItems: "center",
    alignContent: "center",
  },
  dataContainer: {
    backgroundColor: "#dcdcdc",
    padding: 70,
    alignSelf: "center",
    marginTop: 100,
    borderWidth: 3,
    borderColor: "#d3d3d3",
    borderRadius: 50,
  },
  textStyles: {
    color: "#EFF5F5",
    fontSize: 18,
    marginVertical: 2,
    fontWeight: "bold",
  },
  buttonStyle: {
    borderRadius: 40,
    borderWidth: 2,
    width: 150,
    height: 40,
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#33b249",
    borderColor: "#7895B2",
    alignContent: "center",
    alignItems: "center",
  },
});
