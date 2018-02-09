import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements'
import * as _ from 'lodash';

import style, { primaryColor } from '../../styles/styles';
import Constant from '../../utilities/constants';
import SearchResult from './SearchResult';
import { 
  doneSearchingMoviesEtc,
  searchFilterChanged, searchingForMoviesEtc,
  selectedMovie, selectedTvShow,
} from '../../Actions';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
  
const buttons = ['Movie', 'Tv', 'Person']

class Search extends Component {
  onTextChange = (e) => {
    let { api_base_url, lan_region, api_key } = Constant;
    const searchUrl = '/search/multi';

    // Search only if there is any value
    if (e) {
      const url = `${api_base_url}${searchUrl}?${api_key}${lan_region}&query=${encodeURIComponent(e)}`;
      this.props.onSearchingForMoviesEtc();

      fetch(url)
      .then((res) => res.json())
      .then(res => {
        this.props.onDoneSearchingMoviesEtc(res.results)
      }, (err) => {
        console.error(err);
      });
    }
  }

  onClearText = () => {}

  /**
   * Filters search results based on media_type
   */
  filterSearchResults = (results, index) => {
    return results.filter((result) => {
      return result.media_type.toLowerCase() === buttons[index].toLowerCase()
    })
  }

  render() {
    console.log(this.props);
    const {results, isSearching, onFilterChanged, onSearchResultSelected,
      selectedIndex} = this.props;
    const filteredResults = this.filterSearchResults(results, selectedIndex);

    return (
      <View>
      <SearchBar
        style={{marginTop: 20}}
        round
        onChangeText={_.debounce(this.onTextChange, 1000)}
        onClearText={this.onClearText}
        placeholder='Search'
          />

        <ButtonGroup
            lightTheme={false}
            onPress={onFilterChanged.bind(this)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 30, backgroundColor: '#e1e1e1', marginTop: 10}}
          />

        <View>
        {isSearching ? 
          <ActivityIndicator size="large" color={primaryColor}/> :
          <SearchResult items={filteredResults} onSelect={onSearchResultSelected}/>}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.search,
});

const mapDispatchToProps = dispatch => ({
  onFilterChanged: (index) => {
    dispatch(searchFilterChanged(index));
  },
  onSearchingForMoviesEtc: () => {
    dispatch(searchingForMoviesEtc());
  },
  onDoneSearchingMoviesEtc: (results) => {
    dispatch(doneSearchingMoviesEtc(results));
  },
  onSearchResultSelected: (result) => {
    // TODO: Ideally we should maintain the search result seperate from that of
    // the movies or TvShows, so that the navigation state and screens are
    // maintained. Ex: on movies tab, select a movie, go to search, type in
    // a movie, select the result, go back to movie tab. Currently the state
    // will not be maintained. Fix this
    switch(result.media_type) {
      case 'movie':
        dispatch(selectedMovie(result));
        dispatch(NavigationActions.navigate({routeName: 'MovieDetails'}));
        break;
      case 'tv':
        dispatch(selectedTvShow(result));
        dispatch(NavigationActions.navigate({routeName: 'TvShowDetails'}));
      // TODO: add redux to castDetails, then work on following case
      // case 'person':
        // dispatch(tvShowSelected(result));
        // dispatch(NavigationActions.navigate({routeName: 'CastDetails'}));
      default:
        console.log('Unrecognised media type');
        break;
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
