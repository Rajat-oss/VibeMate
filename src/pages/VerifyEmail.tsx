import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resendVerification } = useAuth();
  const { toast } = useToast();

  const handleResend = async () => {
    if (!email) {
      toast({ title: "Error", description: "Please enter your email address", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      await resendVerification(email);
      toast({ title: "Success", description: "Verification email sent! Check your inbox." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white/80">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-center">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
          <p className="text-sm text-gray-500 text-center">
            Didn't receive the email? Check your spam folder or resend below.
          </p>
          
          <div className="space-y-3 pt-4 border-t">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email to resend verification"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleResend}
              disabled={loading || !email}
              className="w-full"
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </div>
          
          <Button 
            variant="link" 
            className="text-purple-600 hover:text-purple-700 w-full"
            onClick={() => window.location.href = '/auth'}
          >
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
