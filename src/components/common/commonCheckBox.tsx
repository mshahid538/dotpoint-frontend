import { Box, Checkbox, FormControlLabel, Typography, useTheme } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const OutlinedCheckbox = ({
    label,
    selected,
    handleSelect,
    value,
    name,
    defaultChecked,
    color,
    fontFamily,
    fontSize,
    marginTop,
    secondLabel,
    fontWeight,
    secondLabelClick,
    onClickSecondLabel,
    error
}: any) => {
    const theme = useTheme();
    return (
        <Box display="flex" mb={0.4} mt={marginTop} borderRadius="5px" color={selected ? theme.palette.primary.main : 'gray'} sx={{
            "& .MuiFormControlLabel-root ": {
                marginRight: "0px",
            },
        }}>
            <FormControlLabel
                control={
                    <Checkbox
                        sx={{
                            mr: 0,
                            margin: "0 !important",
                            marginLeft: 1,
                            "& .MuiSvgIcon-root": {
                                // fontSize: 30,
                                fontSize: 25,
                                color: error ? "#EF627A" : "#cdcdcd",
                                margin: '0px'
                            },
                            "& .MuiFormControlLabel-root": {
                                margin: '0px'
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                                color: "#0099CB",
                            },

                        }}
                        onChange={handleSelect}
                        value={value}
                        name={name}
                        checked={selected}
                        defaultChecked={defaultChecked}

                    />
                }
                label={<Typography fontFamily={fontFamily || "poppins"} fontWeight={fontWeight || 400} fontSize={fontSize || '14px'} color={color || 'white'}>{label} <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onClickSecondLabel}>{secondLabel}</span></Typography>}
            />
        </Box>
    );
};

export default OutlinedCheckbox;
