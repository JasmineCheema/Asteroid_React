import React from 'react'
import {Text,View,StyleSheet} from "react-native"
import axios from 'axios'

export default class RandomScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:this.props.route.params.obj2,
            name:"",
            id:"",
            designation:""
        }
    }
    componentDidMount=async()=>{
            this.setState({
                name:this.state.data.name,
                id:this.state.data.id,
                designation:this.state.data.designation
            })
    }
    render(){
      
        return(
            <View style={styles.container}>
            <View style={styles.dataContainer}>
           <Text style={styles.textStyles}>ID:{this.state.id}</Text>
           <Text style={styles.textStyles}>Name:{this.state.name}</Text>
           <Text style={styles.textStyles}>Designation: {this.state.designation}</Text>
           
           </View>
           
       
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