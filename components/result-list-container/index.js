import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { mapStateToProps } from '../../lib/reducer';
import ResultList from './result-list';
import styles from './result-list.styles';

const StyledResultList = withStyles(styles)(ResultList);
export default connect(mapStateToProps)(StyledResultList);
