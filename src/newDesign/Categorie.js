import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { FiberNew } from '@mui/icons-material';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ImageIcon from '@mui/icons-material/Image';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HttpsIcon from '@mui/icons-material/Https';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

// import { tabsStyles, tabItemStyles } from '../utils/pillTabs'
import { appleTabsStylesHook } from '@mui-treasury/styles/tabs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const setCategorie = props.setCategorie;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Categorie(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateCategorie = (event) => {
    props.setCategorie(event.target.innerText)
  }

  let Whatshot = <WhatshotIcon />

  return (
    <Box sx={{ position: 'fixed', width: "22%", left: "1.5%", top: "90px" }} className="categorie-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Top" icon={<CheckCircleIcon />} iconPosition="end"  {...a11yProps(0)} />
          <Tab label="Hot" icon={<WhatshotIcon />} iconPosition="end" {...a11yProps(1)} />
          <Tab label="New" icon={<FiberNewIcon />} iconPosition="end" {...a11yProps(2)} />
        </Tabs>
        
      </Box>
      <TabPanel value={value} index={0}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
        >
          <ListItemButton>
            <ListItemIcon>
              <CurrencyBitcoinIcon />
            </ListItemIcon>
            <ListItemText primary="Crypto" secondary="236 posts" onClick={updateCategorie} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="NFT" secondary="54 posts" onClick={updateCategorie} />
          </ListItemButton>
          {/* <ListItemButton>
            <ListItemIcon>
              <CurrencyBitcoinIcon />
            </ListItemIcon>
            <ListItemText primary="Cryptomonnaie" secondary="236 posts" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="NFT" secondary="54 posts" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <CurrencyBitcoinIcon />
            </ListItemIcon>
            <ListItemText primary="Cryptomonnaie" secondary="236 posts" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="NFT" secondary="54 posts" />
          </ListItemButton> */}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
        >
          <ListItemButton>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Stocks" secondary="74 posts" onClick={updateCategorie} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <HttpsIcon />
            </ListItemIcon>
            <ListItemText primary="Blockchain" secondary="70 posts" onClick={updateCategorie} />
          </ListItemButton>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
        >
          <ListItemButton>
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="Car" secondary="10 posts" onClick={updateCategorie} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsBackupRestoreIcon />
            </ListItemIcon>
            <ListItemText primary="History" secondary="4 posts" onClick={updateCategorie} />
          </ListItemButton>
        </List>
      </TabPanel>
    </Box>
  );
}