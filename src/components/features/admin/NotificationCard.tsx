import { Badge } from "@/components/ui/Badge";
import type { EmailNotification, EmailType } from "@/types/api";
import { Card, Fact } from "@/components/ui/Card";

const TYPE_LABEL: Record<EmailType, string> = {
  ORDER_CREATED: "order created",
  ORDER_PAID: "order paid",
  ORDER_SHIPPED: "order shipped",
  ORDER_CANCELLED: "order cancelled",
  PASSWORD_RESET: "password reset",
};

const formatDateTime = (iso: string) => iso.replace("T", " ").slice(0, 16);

/** One row of the email notification log. */
export function NotificationCard({ notification: n }: { notification: EmailNotification }) {
  const failed = n.status === "FAILED";

  return (
    <Card
      eyebrow={formatDateTime(n.createdAt)}
      title={TYPE_LABEL[n.type]}
      badges={
        <>
          <Badge tone={failed ? "red" : "green"}>{n.status.toLowerCase()}</Badge>
          <Badge tone="muted">{n.provider}</Badge>
        </>
      }
    >
      <Fact label="recipient">{n.recipient}</Fact>
      <Fact label="subject">{n.subject}</Fact>
      <Fact label="order">{n.orderId ?? "-"}</Fact>
      {n.errorMessage && (
        <p role="alert" className="mt-auto bg-brand-red/10 p-10 text-[1.4rem] text-brand-red">
          {n.errorMessage}
        </p>
      )}
    </Card>
  );
}
