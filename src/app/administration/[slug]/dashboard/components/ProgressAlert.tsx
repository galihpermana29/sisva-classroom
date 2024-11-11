import { DialogTitle, Divider, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function ProgressAlert({
  open,
  report,
  title,
}: {
  open: boolean;
  report: string[];
  title: string;
}) {
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth={true}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider />
      <DialogContent>
        {report.map((report, index) => {
          return (
            <List key={index}>
              <ListItem>{report}</ListItem>
            </List>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
