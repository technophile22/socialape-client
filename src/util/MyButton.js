import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

export default ( { children, onClick, tip, btnClassName, tipClassName }) => (
    <LightTooltip title={tip} className={tipClassName} placement="top">
        <IconButton onClick = {onClick} className={btnClassName}>
            {children}
        </IconButton>
    </LightTooltip>
);
