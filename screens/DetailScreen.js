import React from 'react'
import {Text,View,StyleSheet} from "react-native"
import axios from 'axios'

export default class Details extends React.Component{
    constructor(props){
        super(props)
        this.state={
            details:[]
        }
    }
    componentDidMount(){
        
        const id =this.props.route.params.id;  
        //console.log(id)
        const details1=axios.get("https://api.nasa.gov/neo/rest/v1/neo/"+id+"?api_key=YyBcj1zKd7wHfEdoef7t97ZmUTp2g8eDS5eGKip4")
        .then((response) => {
            
            this.setState({details:[...this.state.details,response.data]})
            
        })
    }
    render(){
        return(
            <View style={styles.container}>
                {
                this.state.details.map((data,i)=>{
                  //  console.log(this.state.details)
                   return(
                    <View style={styles.dataContainer}>
                   <Text style={styles.textStyles}>ID:{data.id}</Text>
                   <Text style={styles.textStyles}>Name:{data.name}</Text>
                   <Text style={styles.textStyles}>Designation: {data.designation}</Text>
                   <Text style={styles.textStyles}>Estimated Minimum Diameter:{data.estimated_diameter.kilometers.estimated_diameter_min}</Text>
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