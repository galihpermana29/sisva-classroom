import ProfilHeader from "./components/ProfilHeader";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import ProfilMenu from "./components/ProfilMenu";

const Profil = () => {
  return (
    <Stack sx={{ width: "100%", maxWidth: 800, mt: 2,p:0 }}>
      <ProfilHeader />
      <ProfilMenu />
    </Stack>
  );
};

export default Profil;
