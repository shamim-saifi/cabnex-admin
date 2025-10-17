import AutopaginateTable from "@/components/auto-paginate-table";
import Back from "@/components/ui/back";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { useGetUserDetailsQuery } from "@/store/services/adminApi";
import { MailIcon, PhoneIcon } from "lucide-react";
import { Link, useParams } from "react-router";

export default function UserProfile() {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUserDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center gap-4">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Back />
      <Card className="mx-auto w-full rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {user?.data?.fullName}
          </CardTitle>
          <Link
            to={`mailto:${user?.data?.email}`}
            className="text-muted-foreground flex w-fit items-center gap-1 text-sm hover:underline"
          >
            <MailIcon size={16} /> {user?.data?.email}
          </Link>
          <Link
            to={`tel:${user?.data?.mobile}`}
            className="text-muted-foreground flex w-fit items-center gap-1 text-sm hover:underline"
          >
            <PhoneIcon size={16} /> {user?.data?.mobile}
          </Link>
          <p className="text-muted-foreground mt-1 text-sm">
            Joined: {new Date(user?.data?.createdAt).toLocaleDateString()}
          </p>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold">Bookings</h2>
          <AutopaginateTable columns={[]} data={user?.data?.bookings || []} />
        </CardContent>
      </Card>
    </>
  );
}
