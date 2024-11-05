import { DialogTitle, Divider, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import type { ImportReport } from '../utils/handleUploadAcademicXLSX';

export default function ImportXLSXAlert({
  open,
  handleClose,
  importReport,
  title,
}: {
  open: boolean;
  handleClose: () => void;
  importReport: ImportReport;
  title: string;
}) {
  if (!importReport) return;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth={true}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider />
      <DialogContent>
        {Object.values(importReport)
          .filter((text) => text)
          .map((report, index) => {
            return (
              <List key={index}>
                <ListItem>{report}</ListItem>
              </List>
            );
          })}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          sx={{
            p: 1,
          }}
        >
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            sx={{
              px: 5,
            }}
          >
            OK
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
