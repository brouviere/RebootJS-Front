import * as React from 'react';
import { Button } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import BlockIcon from '@material-ui/icons/Block';

interface ChatMessageFormState {
  message: string;
}

interface ChatMessageFormProps {
  sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void;
  conversationId: string;
  targets: string[];
}

class ChatMessagesForm extends React.Component<ChatMessageFormProps, ChatMessageFormState> {
  constructor(props: ChatMessageFormProps) {
    super(props);
    this.state = {
      message: ''
    }
  }

  render(){
    const {conversationId, targets} = this.props;
    return <React.Fragment>
      <form onSubmit={(event) => { event.preventDefault(); this.props.sendMessage(conversationId, '12345', targets, this.state.message) }}>
        <textarea rows={3} onChange={(event) => { 
          event.preventDefault();
          this.setState({message: event.target.value})
         }}/>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={(!this.state.message)}
          startIcon={(!this.state.message) ? <BlockIcon color="error"/> : <DoneOutlineIcon />}
          fullWidth={true}
        >Send</Button>
      </form>
      
    </React.Fragment>
  }
}

export default ChatMessagesForm;