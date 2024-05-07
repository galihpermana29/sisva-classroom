"use client";

import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

const menuData = [
  {
    id: 1,
    primary: "Akun Saya",
    secondary: "Kelola informasi akun Anda",
    icon: (
      <svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00065 11.6449C10.6162 11.6449 13.6673 12.2325 13.6673 14.4991C13.6673 16.7667 10.5962 17.3333 7.00065 17.3333C3.38596 17.3333 0.333984 16.7458 0.333984 14.4791C0.333984 12.2116 3.40514 11.6449 7.00065 11.6449ZM7.00065 0.666668C9.4499 0.666668 11.4123 2.62835 11.4123 5.07588C11.4123 7.5234 9.4499 9.48592 7.00065 9.48592C4.55223 9.48592 2.589 7.5234 2.589 5.07588C2.589 2.62835 4.55223 0.666668 7.00065 0.666668Z"
          fill="#008CD5"
        />
      </svg>
    ),
    link: "/profil/akun",
  },
  {
    id: 2,
    primary: "Keamanan",
    secondary: "Atur password anda",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2360_28612)">
          <path
            d="M17.9944 3.2399C16.9897 2.89459 16.1845 2.08527 15.8408 1.07422C15.6224 0.431671 15.0204 0 14.3436 0H5.61813C4.9411 0 4.33914 0.431671 4.12079 1.07422C3.77701 2.08527 2.97241 2.89459 1.96762 3.2399C1.32812 3.45947 0.898438 4.06311 0.898438 4.74152V6.9487C0.898438 9.82895 1.76178 12.6024 3.39462 14.9689C4.88846 17.1342 6.94748 18.8289 9.34845 19.8695C9.54956 19.9567 9.76517 20 9.98077 20C10.1965 20 10.4121 19.9567 10.6129 19.8695C13.0142 18.8289 15.0732 17.1342 16.5671 14.9689C18.1999 12.6024 19.0633 9.82895 19.0633 6.9487V4.74152C19.0633 4.06311 18.6336 3.45947 17.9944 3.2399ZM13.8817 12.3805C13.8817 13.8295 12.7028 15.0084 11.254 15.0084H8.70773C7.25891 15.0084 6.07986 13.8295 6.07986 12.3805V9.00818C6.07986 8.22998 6.7128 7.5972 7.49084 7.5972H7.53067V5.92834C7.53067 4.57748 8.62991 3.47824 9.98077 3.47824C11.3316 3.47824 12.4309 4.57748 12.4309 5.92834V7.5972H12.4707C13.2489 7.5972 13.8817 8.22998 13.8817 9.00818V12.3805Z"
            fill="#008CD5"
          />
          <path
            d="M11.2594 5.92834C11.2594 5.22369 10.686 4.65012 9.9812 4.65012C9.27655 4.65012 8.70312 5.22369 8.70312 5.92834V7.5972H11.2594V5.92834Z"
            fill="#008CD5"
          />
          <path
            d="M12.4709 8.76907H7.49106C7.35937 8.76907 7.25195 8.8765 7.25195 9.00818V12.3805C7.25195 13.1833 7.90518 13.8365 8.70795 13.8365H11.2542C12.0569 13.8365 12.71 13.1833 12.71 12.3805V9.00818C12.71 8.8765 12.6031 8.76907 12.4709 8.76907ZM10.5669 11.8564C10.5669 12.1802 10.3045 12.4423 9.98099 12.4423C9.65765 12.4423 9.39505 12.1802 9.39505 11.8564V10.7492C9.39505 10.4259 9.65765 10.1633 9.98099 10.1633C10.3045 10.1633 10.5669 10.4259 10.5669 10.7492V11.8564Z"
            fill="#008CD5"
          />
        </g>
        <defs>
          <clipPath id="clip0_2360_28612">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: 3,
    primary: "Rate Sisva App",
    secondary: "Beri kami rating",
    icon: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.89936 0.0839149C6.42436 0.0998813 6.9327 0.191548 7.4252 0.359048H7.47436C7.5077 0.374881 7.5327 0.392381 7.54936 0.408215C7.73353 0.467381 7.9077 0.534048 8.07436 0.625715L8.39103 0.767381C8.51603 0.834048 8.66603 0.958215 8.74936 1.00905C8.8327 1.05821 8.92436 1.10905 8.99936 1.16655C9.9252 0.459048 11.0494 0.0757146 12.2077 0.0839149C12.7335 0.0839149 13.2585 0.158215 13.7577 0.325715C16.8335 1.32571 17.9419 4.70071 17.016 7.65071C16.491 9.15821 15.6327 10.534 14.5085 11.6582C12.8994 13.2165 11.1335 14.5999 9.2327 15.7915L9.02436 15.9174L8.8077 15.7832C6.9002 14.5999 5.12436 13.2165 3.5002 11.6499C2.38353 10.5257 1.52436 9.15821 0.991029 7.65071C0.0493627 4.70071 1.1577 1.32571 4.26686 0.308215C4.50853 0.224881 4.7577 0.166548 5.0077 0.134048H5.1077C5.34186 0.0998813 5.57436 0.0839149 5.8077 0.0839149H5.89936ZM13.3244 2.71738C12.9827 2.59988 12.6077 2.78405 12.4827 3.13405C12.366 3.48405 12.5494 3.86738 12.8994 3.99155C13.4335 4.19155 13.791 4.71738 13.791 5.29988V5.32571C13.7752 5.51655 13.8327 5.70071 13.9494 5.84238C14.066 5.98405 14.241 6.06655 14.4244 6.08405C14.766 6.07488 15.0577 5.80071 15.0827 5.44988V5.35071C15.1077 4.18321 14.4002 3.12571 13.3244 2.71738Z"
          fill="#008CD5"
        />
      </svg>
    ),
  },
  {
    id: 4,
    primary: "Log Out",
    secondary: "Keluar dari akun",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 16.5H3.16667C2.72464 16.5 2.30072 16.3244 1.98816 16.0118C1.67559 15.6993 1.5 15.2754 1.5 14.8333V3.16667C1.5 2.72464 1.67559 2.30072 1.98816 1.98816C2.30072 1.67559 2.72464 1.5 3.16667 1.5H6.5M12.3333 13.1667L16.5 9M16.5 9L12.3333 4.83333M16.5 9H6.5"
          stroke="#008CD5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];

const ProfilMenu = () => {
  const router = useRouter();
  return (
    <Paper elevation={2} sx={{ my: 3 }}>
      <MenuList>
        {menuData.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => router.push(item?.link)}
            sx={{
              m: "8px",
              borderRadius: "6px",
              py: "10px",
              "& .MuiTouchRipple-child": {
                bgcolor: "primary.main",
              },
              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: "#DBEFF5",
                  tint: "#008CD5",
                  color: "#008CD5",
                }}
              >
                {item.icon}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={item.primary}
              secondary={item.secondary}
              sx={{
                ml: 2,
                "& .MuiListItemText-primary": {
                  fontWeight: 600,
                  fontSize: 14,
                },
                "& .MuiListItemText-secondary": {
                  fontSize: 12,
                },
              }}
            />
            <ListItemIcon>
              <ChevronRightRoundedIcon sx={{ ml: "auto" }} />
            </ListItemIcon>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default ProfilMenu;
