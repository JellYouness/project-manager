import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps,
  Button,
} from "@mui/material";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "@/api/routes/root/tasks";
import { create } from "domain";
import { Input } from "@/components/ui/input";

export interface AddTaskDialogProps {
  open: boolean;
  onClose: VoidFunction;
}

const FormSchema = z.object({
  titre: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(2, {
    message: "La description doit contenir au moins 2 caractères.",
  }),
  date_debut: z.string(),
  date_fin: z.string(),
  etat: z.string().optional(),
  feedback: z.string().optional(),
});

const AddTaskDialog = ({ open, onClose, ...other }: AddTaskDialogProps) => {
  const [createTask, { isSuccess }] = useCreateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      titre: "",
      description: "",
      date_debut: "",
      date_fin: "",
      etat: "todo",
      feedback: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //@ts-ignore
    await createTask(data);
    enqueueSnackbar("tache ajoutée avec succès");
    onClose();
  };
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 1 }}>Ajouter une tache</DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <DialogContent sx={{ typography: "body2" }}>
            <FormField
              control={form.control}
              name="titre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="titre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_debut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_fin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogContent>

          <DialogActions>
            <Button color="inherit" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddTaskDialog;
