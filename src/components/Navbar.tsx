import { useState } from "react"
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material"
import { useDispatch } from "react-redux"
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import FlexBetween from "./FlexBetween"
import { setMode } from "../state"
import profileImage from "../assets/profile.jpg"
import { User } from "../types"

type NavbarProps = {
  user: User
  isSidebarOpen: boolean
  setIsSidebarOpen: (arg: boolean) => void
}

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isNonMobile = useMediaQuery("(min-width: 680px)")
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorEl(event.currentTarget as HTMLButtonElement)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{
              display: isNonMobile ? "block" : "none",
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={isNonMobile ? "1.5rem" : ".5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
      <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 0.8rem"
        m="0 24px"
        sx={{
          display: isNonMobile ? "none" : "flex",
        }}
      >
        <InputBase placeholder="Search..." sx={{ width: "100%" }} />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
    </AppBar>
  )
}

export default Navbar
