import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from '@material-ui/core';
import _get from 'lodash/get';
import { usePage } from '../hooks';
import { flagState, selectedPageState } from '../state';

function EditPageModalComponent() {
  const [editPageOpen, setEditPageOpen] = useRecoilState(flagState('editPageOpen'));
  const selectedPage = useRecoilValue(selectedPageState);
  const { page, updatePage } = usePage(selectedPage);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNewPageTitle(_get(page, 'title', ''));
  }, [page, setNewPageTitle]);

  function handleClose() {
    setEditPageOpen(false);
  }

  async function handleSave() {
    setSaving(true);
    await updatePage({ ...page, title: newPageTitle });
    handleClose();
    setSaving(false);
  }

  return (
    <Dialog open={editPageOpen} handleClose={handleClose} maxWidth="xl">
      <DialogTitle>Edit Page</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Page Title"
              onChange={(evt) => setNewPageTitle(evt.target.value)}
              value={newPageTitle}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          color="primary"
          disabled={saving}
          onClick={handleSave}
          variant="contained"
        >Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPageModalComponent;
