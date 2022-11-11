import React, { createRef } from "react";
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
      dataIDDetails: [],
      randomDetails: [],
      loader: false,
    };
  }

  findID = async () => {
    this.setState({ loader: true });

    await axios
      .get(`${ENDPOINT}/${this.state.data}?api_key=${API_KEY}`)
      .then((response) => {
        // getting the data here
        // this.setState({
        //   details: [...this.state.details, response.data.near_earth_objects],
        // });
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        // only after comepleting fetching, it'll make the loader stop.
        this.setState({ loader: false });
      });

    // var count = 0;

    // this.state.details.map((data, index) => {
    //   if (data[index].id === this.state.data) {
    //     //this.setState(prev=>({dataIDDetails:[...prev.dataIDDetails,data[index]]}))
    //     setTimeout(() => {
    //       this.props.navigation.navigate("Details", { obj1: data[index] });
    //     }, 1200);
    //     count = 1;
    //   }
    // });
    // if (count === 1) {
    //   console.log("Found");
    // } else {
    //   setTimeout(() => {
    //     alert("WRONG ID");
    //   }, 1000);
    // }
    // this.setState({
    //   data: "",
    // });
  };

  findRandomId = async () => {
    this.setState({ loader: true });

    await axios
      .get(`${ENDPOINT}/browse?api_key=${API_KEY}`)
      .then((response) => {
        this.setState({
          details: [...this.state.details, response.data.near_earth_objects],
        });
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        this.setState({ loader: false });
      });

    const r1 = Math.round(Math.random() * 19); 
    this.props.navigation.navigate("Random", { obj2: data[r1] });

    this.state.details.map((data, index) => {
      const r1 = Math.round(Math.random() * 19); // don't use hardcoode value
      this.props.navigation.navigate("Random", { obj2: data[r1] });
    });
  };

  render() {
    const ref1 = createRef();
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            ref={ref1}
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
              ref1.current.clear();
              if (this.state.data === "") {
                alert("YOU MUST ENTER ID");
              } else {
                this.findID();
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
