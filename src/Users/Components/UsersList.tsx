import * as React from 'react';
import { IUser } from '../User.interface';
import { ListItem, List, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Grid, IconButton, Toolbar } from '@material-ui/core';
import UsersListItem from './UsersListItem';
import history from '../../history';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Forum } from '@material-ui/icons';
import MessageIcon from '@material-ui/icons/Message';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

interface UsersListProps {
  users: IUser[];
  connectedUser?: IUser;
  params?: {skip: number, limit: number}
}

interface UsersListState {
  expanded: string;
}

class UsersList extends React.Component<UsersListProps, UsersListState>{
  constructor(props: UsersListProps) {
    super(props);
    this.state = {
      expanded: ''
    }
  }
  createConversation = (target: string) => {
    const {connectedUser} = this.props;
    if (connectedUser) {
      const conversationId = this.buildConversationId(connectedUser._id, target);
      return history.push(`/chats/${conversationId}?target=${target}`);
    }
  }

  buildConversationId = (connectedUserId: string, target: string) : string => {
    return Buffer.from([connectedUserId, target, new Date().toISOString()].join('_')).toString('base64');
  }

  handleChange = (panel: string) => {
    if(panel === this.state.expanded) {
      this.setState({ expanded: '' })
    }else {
      return this.setState({ expanded: panel })
    }
  }

  render(){
    const { expanded } = this.state;

    return <React.Fragment>
      {this.props.users.map((user, index) => {
        return <Accordion 
          expanded={expanded === `panel${index}`}
          onChange={(_event) => this.handleChange(`panel${index}`)}
          key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <UsersListItem firstname={user.firstname} lastname={user.lastname}/>
            </AccordionSummary>
            <AccordionDetails>
            <Box>
              <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
                <Grid item >
                  <Toolbar>
                    <IconButton onClick={(_event: any) => { this.createConversation(user._id) }}>
                      <MessageIcon />
                    </IconButton>
                  </Toolbar>
                </Grid>
                <Grid item>
                  <Toolbar>
                  <IconButton 
                    onClick={(_event: any) => history.push(`/profiles/${user._id}`)}>
                      <AccountBoxIcon />
                    </IconButton>
                  </Toolbar>
                </Grid>
              </Grid>
            </Box>
            </AccordionDetails>
          </Accordion>
      })}
      {/* <List>
        {this.props.users.map((user, index) => {
          return <ListItem key={index} button onClick={(_event) => { this.createConversation(user._id) }}>
              <UsersListItem firstname={user.firstname} lastname={user.lastname}/>
            </ListItem>
        })}
      </List> */}
    </React.Fragment>
  }
}

const mapStateToProps = ({ user, layout }: IAppState) => ({
  users: user.users,
  connectedUser: user.connectedUser
})

export default connect(mapStateToProps)(UsersList);