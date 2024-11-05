import { DialogTitle } from '@mui/material';
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
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {Object.values(importReport).map((report, index) => {
          return (
            <List key={index}>
              <ListItem>{report}</ListItem>
            </List>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
