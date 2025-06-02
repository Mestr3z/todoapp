import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface FooterProps {
  remaining: number;
  onClearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({ remaining, onClearCompleted }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop="16px"
    >
      <Typography>{remaining} items left</Typography>
      <Button variant="text" onClick={onClearCompleted}>
        Clear completed
      </Button>
    </Box>
  );
};

export default Footer;
