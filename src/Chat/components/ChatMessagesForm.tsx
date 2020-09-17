import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import BlockIcon from '@material-ui/icons/Block';

interface ChatMessageFormState {
  message: string;
}

interface ChatMessageFormProps {
  sendMessage: (message: string) => void;
  conversationId: string;
}

class ChatMessagesForm extends React.Component<ChatMessageFormProps, ChatMessageFormState> {
  constructor(props: ChatMessageFormProps) {
    super(props);
    this.state = {
      message: ''
    }
  }

  _submit = () => {
    this.props.sendMessage(this.state.message);
    this.setState({message: ''});
  }

  render(){
    return <React.Fragment>
      <form onSubmit={(event) => { event.preventDefault(); this._submit() }}>
        <TextField 
          onChange={(event) => { 
            event.preventDefault();
            this.setState({message: event.target.value})
          }}
          fullWidth={true}
          value={this.state.message}
          variant="filled"
         />
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