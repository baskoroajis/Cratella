import React, {Component} from 'react';
import {View,Text, Image, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import axios from 'axios';
import {Container} from './Container';
import Colors from './Colors';
import CellItem from './CellItem';
import ProductHeader from './ProductHeader';
import NavigationBar from './NavigationBar'

class ProductListPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            listData : []
        }
    }

    static navigationOptions = ({navigation}) => ({
        header: null,
        headerTransparent: true,
    });

    componentDidMount() {
        axios.get('http://192.168.0.7:3000/products').then((response) => {
            // console.log('response is ',response.data);
            this.setState({listData:response.data})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        ;
    }

    _onPressNavigationButton (){
        console.log("navigation button pressed!")
    }

    _renderHeader() {
       return <ProductHeader/>
    }

    _renderItem(itemData){
        return <CellItem item={itemData.item}></CellItem>
    }

    render(){
        return (
            <Container>
                <NavigationBar props={ {title : 'Products', onPress : this._onPressNavigationButton}}></NavigationBar>
                <FlatList 
                    ListHeaderComponent={this._renderHeader}
                    data={this.state.listData}
                    renderItem={this._renderItem}
                    keyExtractor={this.state.listData.index}
                    numColumns={2}>

                </FlatList>
            </Container>
            )
    }

  
}

export default ProductListPage;

const styles = StyleSheet.create({
  
})

/**
 * 
 * {"index": 47, "item": {"date": "Mon Jan 13 2020 15:37:38 GMT+0700 (Western Indonesia Time)", "face": "(｀◔ ω ◔´)", "id": "59710-t0qfwgzm6vl", "price": 859, "size": 24}
 */