import { observer } from 'mobx-react-lite'
import React from 'react'
import { Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

type Props = {}

export default observer(function ModalContainer({}: Props) {
  const {modalStore} = useStore();
  return (
    <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size='mini'>
      <Modal.Content>
        {modalStore.modal.body}
      </Modal.Content>
    </Modal>
  )
})