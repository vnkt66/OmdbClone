import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

const ModalComponent = (props) => {
  return (
    <Modal dimmer={props.dimmer} open={props.open} onClose={props.close}>
   
  </Modal>
  )
}

export default ModalComponent;