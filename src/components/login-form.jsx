import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAdminLoginMutation } from "@/store/services/adminApi";
import { ArrowBigRightDashIcon } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  const [adminLogin] = useAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    await adminLogin({ email, password })
      .unwrap()
      .then(({ data }) => {
        localStorage.setItem("bookingCabsAdmin", JSON.stringify(data.token));
        toast.success(data.message || "Login Successful!");
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error(
          err.message || "Login Failed! Please check your credentials.",
        );
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Boss</CardTitle>
          <CardDescription>Admin Panel Login for Booking Cabs</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="group w-full">
                  Let's Go
                  <ArrowBigRightDashIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
