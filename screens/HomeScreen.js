import React,{createRef} from 'react'
import {TextInput,Text,View,TouchableOpacity,StyleSheet, ActivityIndicator} from "react-native"
import axios from 'axios'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:"",
            details:[],
            dataIDDetails:[],
            randomDetails:[],
            loader:false ,
            notFound:0   
        }

    }
    
    componentDidMount=async()=>{
        const details1=await axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=YyBcj1zKd7wHfEdoef7t97ZmUTp2g8eDS5eGKip4")
        .then((response) => {
            this.setState({details:[...this.state.details,response.data.near_earth_objects]})}).catch((e)=>{alert(e)})
    }
 
    findID=async()=>{
            this.setState({loader:true})
            const enteredId=this.state.data
            const dataId=this.state.details
            const item=  this.state.details.map((data)=>{ 
           
            for(var i=0;i<data.length;i++){
                if(data[i].id===enteredId)
                {
                
                 this.setState({dataIDDetails:[...this.state.dataIDDetails,data[i]]})
                 setTimeout(()=>{this.props.navigation.navigate("Details",{obj1:this.state.dataIDDetails})},6000)
                 
                }
            }
            
            setTimeout(()=>{
                if(this.state.dataIDDetails.length===0){
                alert('wrong id')
               }},5000)
           
         })
        
    }
    findRandomId=async()=>{
        this.setState({loader:true})
        const r1=Math.round(Math.random()*19)
        this.state.details.map((data)=>{
            for(var i=0;i<data.length;i++){
                if(data[i].id===data[r1].id)
                {
                
                 this.setState({randomDetails:[...this.state.randomDetails,data[i]]})
                 console.log("HELLLOOO"+data[r1].id)
                 setTimeout(()=>{this.props.navigation.navigate("Random",{obj2:this.state.randomDetails})},6000)
                
                }
            }
        })
       
    }
  
    render(){
        const ref1=createRef()
        return(
            <View style={styles.container}>
                <View style={styles.subContainer}>
                   
                <TextInput
                ref={ref1}
                style={{
                    width:200,
                    height:40,
                    borderBottomWidth:2,
                    borderColor:"gray",
                    alignSelf:"center",
                    marginTop:30
                }}
                placeholder={"TYPE HERE"}
                onChangeText={(t1)=>{
                    this.setState({
                        data:t1
                    })
                }}
                keyboardType='numeric'/>
                <TouchableOpacity style={styles.buttonStyle}
                onPress={()=>{
                    ref1.current.clear()
                    if(this.state.data===""){
                        alert("YOU MUST ENTER ID")
                    }
                    else{
                       
                    this.findID()
                    setTimeout(()=>{
                        this.setState({
                        loader:false,
                        
                    })
                    
                },5700)
                    setTimeout(()=>{this.setState({dataIDDetails:[]})
                    },6500)
                        
                    } 
                }}>
                    <Text style={styles.textStyles}>SEARCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}
                onPress={()=>{
             
               this.findRandomId()
             
               setTimeout(()=>{this.setState({loader:false})},5700)
                
                }}>
                    <Text style={styles.textStyles}>RANDOM</Text>
                </TouchableOpacity>
                <ActivityIndicator size={'large'} animating={this.state.loader} color="green" style={{marginTop:100}}/>
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
        color:"#EFF5F5",
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
        backgroundColor:"#33b249",
        borderColor:"#7895B2",
        alignContent:"center",
        alignItems:"center"
    }
})