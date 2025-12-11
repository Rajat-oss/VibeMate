import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return minLength && hasUpper && hasLower && hasNumber;
  };

  const isFormValid = isLogin || (
    formData.name &&
    formData.email &&
    validatePassword(formData.password) &&
    formData.password === formData.confirmPassword
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
        return;
      }
      if (!validatePassword(formData.password)) {
        toast({ title: "Error", description: "Password must be at least 8 characters with uppercase, lowercase, and number", variant: "destructive" });
        return;
      }
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        navigate('/feed');
      } else {
        await signUp(formData.email, formData.password, formData.name);
        navigate('/verify-email');
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? "Sign In" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              {!isLogin && formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    {formData.password.length >= 8 ? 
                      <Check className="w-3 h-3 text-green-600" /> : 
                      <X className="w-3 h-3 text-red-500" />}
                    <span className={formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {/[A-Z]/.test(formData.password) ? 
                      <Check className="w-3 h-3 text-green-600" /> : 
                      <X className="w-3 h-3 text-red-500" />}
                    <span className={/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {/[a-z]/.test(formData.password) ? 
                      <Check className="w-3 h-3 text-green-600" /> : 
                      <X className="w-3 h-3 text-red-500" />}
                    <span className={/[a-z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {/[0-9]/.test(formData.password) ? 
                      <Check className="w-3 h-3 text-green-600" /> : 
                      <X className="w-3 h-3 text-red-500" />}
                    <span className={/[0-9]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      One number
                    </span>
                  </div>
                </div>
              )}
            </div>
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-xs mt-1">
                    {formData.password === formData.confirmPassword ? 
                      <Check className="w-3 h-3 text-green-600" /> : 
                      <X className="w-3 h-3 text-red-500" />}
                    <span className={formData.password === formData.confirmPassword ? "text-green-600" : "text-red-500"}>
                      {formData.password === formData.confirmPassword ? "Passwords match" : "Passwords do not match"}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading || !isFormValid}>
              {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;