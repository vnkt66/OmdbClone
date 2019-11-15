import React from 'react';
import { Card, Image} from 'semantic-ui-react';

const Movie = (props) => {
  return (
    <Card key={props.imdbID} onClick={() => props.MovieClick(props.imdbID)}>
        {props.Poster === 'N/A' ? <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' wrapped ui={false}></Image> : <Image src={props.Poster}/>}
        <Card.Header>{props.Title}</Card.Header>
        <Card.Meta>
        <span className='date'>Released:{props.Year}</span>
        </Card.Meta>
    </Card>
  )
}

export default Movie;