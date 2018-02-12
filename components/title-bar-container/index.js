import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { mapDispatchToProps } from '../../lib/reducer';
import TitleBar from './title-bar';
import styles from './title-bar.styles';

const StyledTitleBar = withStyles(styles)(TitleBar);
export default connect(null, mapDispatchToProps)(StyledTitleBar);
