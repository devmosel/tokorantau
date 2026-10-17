import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";

export function ContactForm() {
  return (
    <form action="" method="post" className="flex-[1_1_40rem] border-brand p-20 text-center">
      <h3 className="mb-12 text-[3.5rem] capitalize text-brand-black">tell us something!</h3>

      <Input
        fieldSize="contact"
        type="text"
        name="name"
        maxLength={50}
        placeholder="enter your name"
        required
      />
      <Input
        fieldSize="contact"
        type="number"
        name="number"
        min={0}
        max={9999999999}
        placeholder="enter your number"
        required
      />
      <Input
        fieldSize="contact"
        type="email"
        name="email"
        maxLength={50}
        placeholder="enter your email"
        required
      />
      <Textarea
        name="msg"
        cols={30}
        rows={10}
        maxLength={500}
        placeholder="enter your message"
        required
      />

      <Button type="submit" name="send">
        send message
      </Button>
    </form>
  );
}