import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Findmodal = ({ brands, title, setSelectedBrandss, open, setOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  console.log("selectedBrands", selectedBrands, searchTerm);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (brand) => {
    const currentIndex = brand;
    setSelectedBrands(currentIndex);
    setSelectedBrandss(currentIndex);
    setOpen(false);
  };

  const Addcustom = () => {
    brands[0].items.push(searchTerm);
    handleToggle(brands[0].items);
    setSearchTerm("");
  };

  const filteredBrands = brands.map((group) => ({
    category: group.category,
    items: group.items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));
  console.log("filteredBrands", filteredBrands);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { maxHeight: "80vh" },
        }}
      >
        <DialogTitle>
          {title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            variant="outlined"
            placeholder="Search"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          {filteredBrands[1]?.items?.length === 0 && (
            <ListItem onClick={Addcustom}>
              <AddCircleOutlineIcon />
              <ListItemText
                primary={searchTerm}
                primaryTypographyProps={{
                  variant: "subtitle1",
                  fontWeight: "bold",
                }}
                
              />
            </ListItem>
          )}
          {filteredBrands.map((group) => (
            <List key={group.category}>
              <ListItem>
                <ListItemText
                  primary={group.category}
                  primaryTypographyProps={{
                    variant: "subtitle1",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
              {group.items.map((item) => (
                <ListItem button key={item} onClick={() => handleToggle(item)}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={selectedBrands}
                        checked={selectedBrands.includes(item)}
                        onChange={() => handleToggle(item)}
                      />
                    }
                    label={item}
                  />
                </ListItem>
              ))}
            </List>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Findmodal;
