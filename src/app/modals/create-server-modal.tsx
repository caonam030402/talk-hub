"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import FileUpload from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function CreateServerModal() {
  const { isOpen, onClose, type } = useModal();

  const router = useRouter();
  const isModalOpen = isOpen && type === "createServer";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axios.post("api/servers", values);
    form.reset();
    router.refresh();
    window.location.reload();
  }

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`${cn("dark:bg-white dark:text-gray-800 w-full")}`}
      >
        <DialogHeader className="">
          <DialogTitle className="text-center text-2xl font-bold">
            Custom your server
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <fieldset>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="">
                        <FileUpload
                          endpoint="serverImage"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn("text-xs uppercase text-right")}>
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={`${cn(
                            "dark:bg-gray-200 outline-none border-none"
                          )}`}
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="w-full"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </fieldset>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
