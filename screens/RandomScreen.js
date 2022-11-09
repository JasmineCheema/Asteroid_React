import React from 'react'
import {Text,View,StyleSheet} from "react-native"
import axios from 'axios'

export default class RandomScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            details:[],
            id:[]
        }
    }
    componentDidMount(){
        //let today = new Date().toISOString().slice(0, 10)
        
        let r1=Math.round(Math.random(0,19))
        const details1=axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=YyBcj1zKd7wHfEdoef7t97ZmUTp2g8eDS5eGKip4")
        .then((response) => {
            this.setState({
                id:[...this.state.id,response.data.near_earth_objects]
            })
            this.state.id.map((data)=>{
              /*  var id=null
               for(var i in data)
               {
                    console.log(data[i].id)
               }*/
               axios.get("https://api.nasa.gov/neo/rest/v1/neo/"+data[r1].id+"?api_key=YyBcj1zKd7wHfEdoef7t97ZmUTp2g8eDS5eGKip4").then((response)=>{

                    this.setState({details:[...this.state.details,response.data]})


                })
            
            
            })
                
            })
            
       
    }
    render(){
      
        return(
            <View style={styles.container}>
                {
                   
                this.state.details.map((data,i)=>{
                
                   return(
                    <View style={styles.dataContainer}>
                   <Text style={styles.textStyles}>ID:{data.id}</Text>
                   <Text style={styles.textStyles}>Name:{data.name}</Text>
                   <Text style={styles.textStyles}>Designation: {data.designation}</Text>
                   
                   </View>
                   )
                })}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0f8ff'
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
        marginVertical:2

    }
})