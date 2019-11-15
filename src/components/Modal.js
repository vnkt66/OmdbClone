import React from 'react';
import { Modal, Image, Header, Button, Icon } from 'semantic-ui-react';

import './Modal.css';

const ModalComponent = (props) => {
  return (
      <Modal dimmer={props.dimmer} open={props.open} onClose={props.close}>
       <Modal.Content image>
       <Image
        wrapped
        size='medium'
        src={props.moviedata.Poster}
       />
       <Modal.Description>
         <Header>{props.moviedata.Title}</Header>
         <p>Year: {props.moviedata.Year}</p>
         <p>Rating: {props.moviedata.imdbRating}</p>
         <p>Actors: {props.moviedata.Actors}</p>
         <p>Director: {props.moviedata.Director}</p>
         <p>Genre: {props.moviedata.Genre}</p>
        </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button negative onClick={props.close}><Icon name='trash'/></Button>
        {/* <Button
         positive
         icon='checkmark'
         labelPosition='right'
         content="Yep, that's me"
         onClick={props.close}
         /> */}
         </Modal.Actions>
        </Modal>
  )
}

export default ModalComponent;