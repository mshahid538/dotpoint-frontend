import React from 'react'
import { Box } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import TextLabel from '@components/common/commonTextLabel';


const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 80,
    height: 38,
    padding: 0,
    [theme.breakpoints.down('md')]: {
        width: 70,
        height: 28,
    },
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(40px)',
            color: '#A2ACB3',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#F4F4F4',
                opacity: 1,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 35,
        height: 34,
        [theme.breakpoints.down('md')]: {
            width: 25,
            height: 24,
        },
        border: '1px solid #0099CB',
    },
    '& .MuiSwitch-track': {
        borderRadius: 35 / 1,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const ClientVisible = ({ visible, handleToggleChange, isToggled }: any) => {
    return (
        <Box display={"flex"} alignItems={"center"} gap={"8px"} >
            <TextLabel variant="subtitle2" title={visible} />
            {/* <Box> {visible}</Box> */}
            <IOSSwitch {...label}
                checked={isToggled} // Pass the toggle state to the switch component
                onChange={handleToggleChange} // Handle switch state changes
            />
        </Box>
    )
}
export default ClientVisible;
