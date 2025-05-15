
import { useState } from 'react';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

// Mock authentication state
interface AuthState {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null
};

// In a real app, this would be handled by a proper auth provider
let authState = initialAuthState;

export const getAuthState = () => authState;

export const setAuthState = (newState: AuthState) => {
  authState = newState;
  // In a real app, we'd persist this to localStorage or similar
};

export const AuthButtons = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, allow login with test@test.com and any password
    if (email === "test@test.com") {
      setAuthState({
        isLoggedIn: true,
        user: {
          name: "Test User",
          email: "test@test.com",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        }
      });
      
      toast({
        title: "Sign In Successful",
        description: "You have been signed in successfully.",
      });
      setIsOpen(false);
      
      // Force a page reload to reflect the auth state change
      window.location.reload();
    } else {
      toast({
        title: "Sign In Failed",
        description: "Please use test@test.com as the email address.",
        variant: "destructive",
      });
    }
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, show success for any input
    setAuthState({
      isLoggedIn: true,
      user: {
        name: name || "New User",
        email: email,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    });
    
    toast({
      title: "Sign Up Successful",
      description: "Your account has been created successfully.",
    });
    setIsOpen(false);
    
    // Force a page reload to reflect the auth state change
    window.location.reload();
  };
  
  const handleGuestAccess = () => {
    setAuthState({
      isLoggedIn: true,
      user: {
        name: "Guest User",
        email: "guest@example.com",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      }
    });
    
    toast({
      title: "Guest Access Granted",
      description: "You are now browsing as a guest.",
    });
    setIsOpen(false);
    
    // Force a page reload to reflect the auth state change
    window.location.reload();
  };
  
  const handleLogout = () => {
    setAuthState(initialAuthState);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    
    // Force a page reload to reflect the auth state change
    window.location.reload();
  };
  
  // Check if user is logged in
  const auth = getAuthState();
  
  if (auth.isLoggedIn && auth.user) {
    return (
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-[#3665f3] text-[#3665f3] hover:text-[#3665f3]/90 hover:bg-[#3665f3]/10"
        onClick={handleLogout}
      >
        <User className="h-4 w-4" />
        <span>Logout ({auth.user.name})</span>
      </Button>
    );
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-[#3665f3] text-[#3665f3] hover:text-[#3665f3]/90 hover:bg-[#3665f3]/10">
          <User className="h-4 w-4" />
          <span>Sign in</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Account Access</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input 
                  id="signin-email" 
                  type="email" 
                  placeholder="test@test.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  For demo purposes, use test@test.com
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input 
                  id="signin-password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Any password will work for this demo
                </p>
              </div>
              <Button type="submit" className="w-full bg-[#3665f3] hover:bg-[#3665f3]/90">Sign In</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="email@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input 
                  id="signup-confirm" 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-[#3665f3] hover:bg-[#3665f3]/90">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col space-y-2 mt-4">
          <div className="text-center text-sm text-muted-foreground">or</div>
          <Button 
            variant="outline" 
            onClick={handleGuestAccess}
            className="w-full"
          >
            Continue as Guest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthButtons;
