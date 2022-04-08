import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';

import pokemon from './src/data/pokemon';
import pokemon_stats from './src/data/pokemon-stats';

import Header from './src/components/Header';
import CardList from './src/components/CardList';
import AnimatedModal from './src/components/AnimatedModal';
import BigCard from './src/components/BigCard';

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

type Props = {};
export default class App extends Component<Props> {
  state = {
    isModalVisible: false,
  };

  constructor(props) {
    super(props);
    this.pokemon_stats = [];
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this.pokemon_stats = [];
    pokemon_stats.forEach(item => {
      this.pokemon_stats.push({
        label: item,
        value: getRandomInt(25, 150),
      });
    });

    this.setState({
      pokemon,
      image,
      stats: this.pokemon_stats,
      isModalVisible: true,
    });
  };

  bookmarkAction = () => {};

  shareAction = () => {};

  closeModal = () => {
    console.log('close my modal');
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const closeModal = () => {
      console.log('close my modal');
      this.setState({
        isModalVisible: false,
      });
    };
    return (
      <SafeAreaView style={styles.container}>
        <Header title={'Poke-Gallery'} />
        <CardList
          data={pokemon}
          cardAction={this.cardAction}
          viewAction={this.viewAction}
          bookmarkAction={this.bookmarkAction}
          shareAction={this.shareAction}
        />
        <AnimatedModal
          title={'View Pokemon'}
          visible={this.state.isModalVisible}
          onClose={() => closeModal()}>
          <BigCard
            title={this.state.pokemon}
            image={this.state.image}
            data={this.state.stats}
          />
        </AnimatedModal>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
