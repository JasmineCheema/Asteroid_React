import React from 'react'
import {TextInput,Text,View,TouchableOpacity,StyleSheet} from "react-native"
import axios from 'axios'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:"",
            details:[]
        }
    }
    componentDidMount(){
        this.findID()
    }
   
    findID=()=>{
        const details1=axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=YyBcj1zKd7wHfEdoef7t97ZmUTp2g8eDS5eGKip4")
        .then((response) => {
            
            this.setState({details:[...this.state.details,response.data]})
          //  console.log(response.data.id)
            this.state.details.map((data)=>{
              //  console.log(data)
                for(var i=0;i<data.length;i++){
                   // console.log(data[i])
                }
            })
            
        })
    }
    render(){
        
        return(
            <View style={styles.container}>
                <View style={styles.subContainer}>

                <TextInput
                style={{

                    width:200,
                    height:40,
                    borderWidth:2,
                    borderColor:"gray",
                    alignSelf:"center",
                    marginTop:30
                }}
                onChangeText={(t1)=>{
                    this.setState({
                        data:t1
                    })
                }}></TextInput>
                <TouchableOpacity style={styles.buttonStyle}
                onPress={()=>{
                    if(this.state.data===""){
                        alert("YOU MUST ENTER ID")
                    }
                    else{
                   this.props.navigation.navigate("Details",{id:this.state.data})
                    } 
                }}>
                    <Text style={styles.textStyles}>SEARCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}
                onPress={()=>{
                    
                   this.props.navigation.navigate("Random")
                
                }}>
                    <Text style={styles.textStyles}>RANDOM</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EFF5F5'
    },
    subContainer:{
        flex:0.8,
        backgroundColor:"#D6E4E5",
        marginTop:40,
        alignItems:"center",
        alignContent:"center",
    },
    dataContainer:{
        backgroundColor:'#dcdcdc',
        padding:70,
        alignSelf:"center",
        marginTop:100,
        borderWidth:3,
        borderColor:'#d3d3d3',
        borderRadius:50
    },
    textStyles:{
        color:"#808080",
        fontSize:18,
        marginVertical:2,
        fontWeight:'bold'

    },
    buttonStyle:{
        borderRadius:40,
        borderWidth:2,
        width:150,
        height:40,
        marginTop:30,
        alignSelf:"center",
        backgroundColor:"#AEBDCA",
        borderColor:"#7895B2",
        alignContent:"center",
        alignItems:"center"
    }
})