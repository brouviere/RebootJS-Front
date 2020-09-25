import * as React from 'react';
import AppContent from './AppContent';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import AppDrawer, {drawerWidth} from './AppDrawer';
import AppMenu  from './AppMenu';
import { IUser } from '../../Users/User.interface';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { updateConnectedUser } from '../../Users/actions/updateConnectedUser';
import { makeInitApp } from '../actions/makeInitApp';

interface AppLayoutProps {
  classes: any;
  showDrawer: boolean;
  updateIdentity: (user: IUser) => void;
  makeInitApp: () => void;
}

interface AppLayoutState {
  polling?: NodeJS.Timeout;
}

const styles = (theme: Theme) => createStyles({
  content: {
    width: '100vw',
    height: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    width: `calc(100vw - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawer: {
    width: drawerWidth
  }
});

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState>{
  constructor(props: AppLayoutProps){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.props.makeInitApp();
  }

  componentWillUnmount(){
    const { polling } = this.state;
    if(polling) clearInterval(polling);
  }

  render(){
    const { classes, showDrawer } = this.props;
    const filteredClasses = [classes.content, showDrawer && classes.contentShift].filter(Boolean).join(' ');
    
    return <React.Fragment>
        <div className={filteredClasses}>
          <AppMenu />
          <AppContent />
        </div>
        <AppDrawer
          showDrawer={showDrawer}
        />
          
      </React.Fragment>
  }

}

const mapStateToProps = ({ layout } : IAppState) => ({
  showDrawer: layout.showDrawer
})

const mapDispatchToProps = (dispatch: any) => ({
  updateIdentity: (user: IUser) => dispatch(updateConnectedUser(user)),
  makeInitApp: () => dispatch(makeInitApp())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout));