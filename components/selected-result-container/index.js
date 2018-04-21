import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { mapStateToProps, mapDispatchToProps } from '../../lib/ducks';
import SelectedResult from './selected-result';
import styles from './selected-result.styles';

const StyledSelectedResult = withStyles(styles)(SelectedResult);
export default connect(mapStateToProps, mapDispatchToProps)(StyledSelectedResult);
