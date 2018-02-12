import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { mapStateToProps, mapDispatchToProps } from '../../lib/reducer';
import TitleBar from './title-bar';
import styles from './title-bar.styles';

const StyledTitleBar = withStyles(styles)(TitleBar);
export default connect(mapStateToProps, mapDispatchToProps)(StyledTitleBar);
