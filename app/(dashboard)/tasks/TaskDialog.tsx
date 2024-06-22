import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { Task } from "@/api/routes/root/tasks";
import Link from "next/link";
import { getFileIcon } from "../(cruds)/sujets/Columns";
import { Badge } from "@/components/ui/badge";

export interface TaskDetailsDialogProps {
  open: Task | null;
  onClose: VoidFunction;
}

const TaskDetailsDialog = ({ open, onClose }: TaskDetailsDialogProps) => {
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth="lg"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Task Details</DialogTitle>
      <DialogContent className="w-[600px] space-y-6">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <span className="font-bold">ID: </span>
              {open?.id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <span className="font-bold">Status: </span>
              <Badge>{open?.etat}</Badge>
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant="body1">
              <span className="font-bold">Title: </span>
              {open?.titre}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant="body1">
              <span className="font-bold">Description: </span>
              {open?.description}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={6}>
            <Typography variant="body1">
              <span className="font-bold">Start Date: </span>
              {open?.date_debut}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <span className="font-bold">End Date: </span>
              {open?.date_fin}
            </Typography>
          </Grid>
          <Divider />
          {open?.feedback && (
            <Grid item xs={12}>
              <Typography variant="body1">
                <span className="font-bold">Feedback: </span>
                {open?.feedback}
              </Typography>
            </Grid>
          )}
          <Divider />
          {open?.documents?.length != 0 && (
            <Grid item xs={12}>
              <Typography variant="body1">
                <span className="font-bold">Documents:</span>
              </Typography>
              {open?.documents?.map((doc: any, index: any) => (
                <Link
                  key={index}
                  href={doc.lien}
                  target="_blank"
                  className="flex items-center justify-center w-9"
                >
                  {getFileIcon(doc.lien)}
                </Link>
              ))}
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsDialog;
