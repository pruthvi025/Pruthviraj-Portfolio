"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message is too short"),
});

type Values = z.infer<typeof Schema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Values>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (values: Values) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success(data.message || "Message sent successfully!");
        reset();
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <Input placeholder="Name" className="rounded-2xl" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Input placeholder="Email" className="rounded-2xl" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input placeholder="Subject" className="rounded-2xl" {...register("subject")} />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>
      <div>
        <Input placeholder="Phone Number" className="rounded-2xl" {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <Textarea placeholder="Message" className="rounded-2xl min-h-32" {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button className="rounded-2xl" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}




