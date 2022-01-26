import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';

import Filmes from './src/Filmes';

import api from './src/services/api';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filmes: []
    }
  }

  async componentDidMount() {
    const response = await api.get("r-api/?api=filmes");
    this.setState({ filmes: response.data, loading:false });
  }

  render() {

    if (this.state.loading) {
      return(
        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
          <ActivityIndicator
            color={'#09a6ff'}
            size={60}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.filmes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Filmes data={item} />}
          />
        </View>
      );
    }


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
