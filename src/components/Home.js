import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Header, Icon, Search, Grid, Select, Button, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import './Home.css';

var source = ({})

const options = [
    { key: 'movie', text: 'movie', value: 'movie' },
    { key: 'series', text: 'series', value: 'series' },
    { key: 'episode', text: 'episode', value: 'episode' },
  ]
  

export default class Home extends Component {
  state = {
      isLoading: false,
      results: [],
      value: '',
      optionvalue: 'movie',
      moviesfetched: [],
      error: ''
  };

  componentDidMount() {
    axios.get('http://www.omdbapi.com/?type=movie&s=dragon&apikey=5aebc1cf').then((response) => {
     console.log(response.data);
     if(response.data.Response === false) {
         console.log(response.data.Error);
     }
     else {
        const movies = response.data.Search.map((movie) => {
           return ({
               "key": movie.imdbID,
               "title": movie.Title,
               "rating": movie.imdbRating,
               "genre": movie.Genre,
               "image": movie.Poster,
               "released": movie.Released,
               "author": movie.Writer,
               "actors": movie.Actors
           })
        })
        source = movies
     }
   })
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  onOptionChange = (e, { value }) => this.setState({ optionvalue: value }, () => console.log(this.state.optionvalue))

  onSearchHandler = () => {
    console.log(this.state.optionvalue, this.state.value);
    if(this.state.value !== '' && this.state.optionvalue !== '') {
      axios.get('http://www.omdbapi.com/?type='+this.state.optionvalue+'&s='+this.state.value+'&apikey=5aebc1cf').then((response) => {
     console.log(response.data);
     if(response.data.Response === false) {
         this.setState({
           error: response.data.Error
         })
     }
     else if(response.data.Search!==undefined) {
        // const movies = response.data.Search.map((movie) => {
        //    return ({
        //        "key": movie.imdbID,
        //        "title": movie.Title,
        //        "rating": movie.imdbRating,
        //        "genre": movie.Genre,
        //        "image": movie.Poster,
        //        "released": movie.Released,
        //        "author": movie.Writer,
        //        "actors": movie.Actors
        //    })
        // })
        this.setState({
          moviesfetched: response.data.Search
        }, () => {
          console.log(this.state.moviesfetched);
        })
     }
   })
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
        if (this.state.value.length < 1) return this.setState({ isLoading: false, results: [], value: '' })
  
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.title) || re.test(result.rating) || re.test(result.author) || re.test(result.actors)
  
        this.setState({
          isLoading: false,
          results: _.filter(source, isMatch),
        })
      }, 300)
  }


    render() {
        const { isLoading, value, optionvalue, results, error, moviesfetched } = this.state;

        var moviesdata = error !== '' ? <h3>Movies Not Found!!!</h3> : <h1>Start Searching!!!</h1>

        if (moviesfetched.length > 0) {
         console.log('GReater')
         const mvs = moviesfetched.map((movie) => {
             return (
               <Card key={movie.imdbID}>
                 {movie.Poster === 'N/A' ? <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png'></Image> : <Image src={movie.Poster} wrapped ui={false}/>}
               </Card>
             )
          })
          moviesdata = '';
        var values = <Card.Group itemsPerRow={4}>{mvs}</Card.Group>
        }

        return (
            <Container>
              <Header as='h3' icon textAlign='center'>
                <Icon name='tv' circular />
                <Header.Content>OMDB CLONE</Header.Content>
              </Header>
              <Grid>
              <Grid.Column width={6}></Grid.Column>
        <Grid.Column width={3}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            placeholder="Search Movies"
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <Select compact options={options} value={optionvalue} onChange={this.onOptionChange}/>
        </Grid.Column>
        </Grid>
        <Grid centered columns={10}>
         <Grid.Column>
          <Button basic color='green' onClick={this.onSearchHandler}>Search</Button>
         </Grid.Column>
        </Grid>
        <Grid centered>
         {moviesdata}
         {values}
        </Grid>
       </Container>
        )
    }
}