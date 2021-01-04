import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Slider } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { getXpColor } from '../../utils/xp';

export const ModalSelect = styled.select`
  label: ModalSelect;
  width: 30%;
  font-size: 1.4rem;
`;
ModalSelect.displayName = 'ModalSelect';

const XpSliderbase = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    border: '2px solid black',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    '& > span > span': {
      color: '#000',
      fontWeight: 700,
      fontFamily: 'Grandstander',
      fontSize: '1.2rem',
      marginTop: '4px',
      marginLeft: '-3px'
    }
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4,
    color: 'gray'
  }
})(Slider);

const useXpSliderStyles = makeStyles({
  root: {
    width: '80%',
    color: props => {
      const nextXp = props.currentXp + props.defaultValue;
      console.log('$$$ SUM', props.currentXp + props.defaultValue);
      return getXpColor(props.currentXp + props.defaultValue);
    },
    height: 8
  }
});

export const XpSlider = props => {
  console.log('$$$ props', props);
  const classes = useXpSliderStyles(props);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <XpSliderbase {...props} className={classes.root} />;
};

// export const XpSlider = withStyles(({ currentXp, defaultValue }) => {
//   console.log('$$$ currentXp, defaultValue', currentXp, defaultValue);
//   return {
//     root: {
//       width: '80%',
//       color: 'crimson',
//       height: 8
//     },
//     thumb: {
//       height: 24,
//       width: 24,
//       backgroundColor: '#fff',
//       border: '2px solid currentColor',
//       marginTop: -8,
//       marginLeft: -12,
//       '&:focus, &:hover, &$active': {
//         boxShadow: 'inherit'
//       }
//     },
//     active: {},
//     valueLabel: {
//       left: 'calc(-50% + 4px)'
//     },
//     track: {
//       height: 8,
//       borderRadius: 4
//     },
//     rail: {
//       height: 8,
//       borderRadius: 4
//     }
//   };
// })(Slider);
