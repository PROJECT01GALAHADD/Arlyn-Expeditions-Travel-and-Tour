import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Mail, Phone, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type Login, type Booking } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { data: bookings, isLoading: isLoadingBookings } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: Login) => {
      return await apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: (data: any) => {
      setIsAuthenticated(true);
      setOperatorName(data.operator.name);
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.operator.name}!`,
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout", {});
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setOperatorName("");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/bookings/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Status updated",
        description: "Booking status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    },
  });

  const onLogin = async (data: Login) => {
    loginMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleStatusUpdate = (bookingId: string, status: string) => {
    updateStatusMutation.mutate({ id: bookingId, status });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-background to-card">
        <Card className="p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Operator Dashboard</h1>
            <p className="text-muted-foreground">Please log in to continue</p>
          </div>

          <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username")}
                placeholder="Enter your username"
                data-testid="input-username"
              />
              {errors.username && (
                <p className="text-sm text-destructive mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                data-testid="input-password"
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || loginMutation.isPending}
              data-testid="button-login"
            >
              {(isSubmitting || loginMutation.isPending) ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Default Login:</strong><br />
              Username: operator<br />
              Password: operator123
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Operator Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {operatorName}!</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            data-testid="button-logout"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="chat">Chat Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            {isLoadingBookings ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading bookings...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(bookings || []).map((booking) => (
                  <Card key={booking.id} className="p-6" data-testid={`card-booking-${booking.id}`}>
                    <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{booking.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.guests} guests
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    {booking.message && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm"><strong>Message:</strong> {booking.message}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                        disabled={booking.status === "confirmed"}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                        disabled={booking.status === "cancelled"}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card>
                ))}

                {(!bookings || bookings.length === 0) && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">No bookings yet</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="chat">
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Chat functionality will be available in a future update
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
