import { LogoutRounded, SettingsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useCurrentUser } from "@/hooks/query/user/useCurrentUser";
export default function UserMenu({ slug, school }) {
  const { data: currentUser, isLoading } = useCurrentUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) return <></>;

  return (
    <Box>
      <Stack
        component={Button}
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 50,
        }}
      >
        <Avatar
          sx={{
            width: "36px",
            height: "36px",
            position: "relative",
            mr: 1,
            ml: 1,
          }}
        >
          {currentUser?.profile_image_uri ? (
            <Image
              alt="Web Image"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              src={`https://api-staging.sisva.id/file/v1/files/${currentUser?.profile_image_uri}?school_id=${school.id}`}
            />
          ) : (
            currentUser?.name.toUpperCase()[0]
          )}
        </Avatar>
        <Typography
          sx={{
            display: { xs: "none", lg: "block" },
            color: "black",
            fontWeight: 600,
            mr: 1,
          }}
        >
          {currentUser?.name}
        </Typography>
      </Stack>
      <Menu
        id="profile-menu"
        aria-labelledby="profile-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack
          sx={{
            maxWidth: 280,
            flexDirection: "row",
            alignItems: "center",
            p: "0 8px 8px",
          }}
        >
          <Avatar
            sx={{
              width: "36px",
              height: "36px",
              position: "relative",
              mr: 1,
              ml: 1,
            }}
          >
            {currentUser?.profile_image_uri ? (
              <Image
                alt="Web Image"
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                src={`https://api-staging.sisva.id/file/v1/files/${currentUser?.profile_image_uri}?school_id=${school.id}`}
              />
            ) : (
              currentUser?.name.toUpperCase()[0]
            )}
          </Avatar>
          <Typography color="black" fontWeight={600} mr={1}>
            {currentUser?.name}
          </Typography>
        </Stack>
        <Divider />
        <MenuItem
          component={Link}
          href={`/administration/${slug}/dashboard/staff/profile/${currentUser?.id}`}
          sx={{ maxWidth: 280 }}
        >
          <Stack flexDirection={"row"}>
            <SettingsOutlined />{" "}
            <Typography sx={{ ml: 1 }}>Profil Saya</Typography>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
          }}
          component={Link}
          href={`/administration/${slug}/auth/login`}
          sx={{ maxWidth: 280 }}
        >
          <Stack flexDirection={"row"}>
            <LogoutRounded /> <Typography sx={{ ml: 1 }}>Keluar</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}
