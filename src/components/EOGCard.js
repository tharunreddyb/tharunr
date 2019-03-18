import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    width: '100%'
  }
};

const EOGCard = props => {
  const { classes, title, content } = props;
  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default withStyles(styles)(EOGCard);
