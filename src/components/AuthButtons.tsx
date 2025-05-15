
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
import { useToast } from './ui/use-toast';
import { User } from 'lucide-react';

export const AuthButtons = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sign In Successful",
      description: "You have been signed in successfully.",
    });
    setIsOpen(false);
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sign Up Successful",
      description: "Your account has been created successfully.",
    });
    setIsOpen(false);
  };
  
  const handleGuestAccess = () => {
    toast({
      title: "Guest Access Granted",
      description: "You are now browsing as a guest.",
    });
    setIsOpen(false);
  };
  
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
                <Input id="signin-email" type="email" placeholder="email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-[#3665f3] hover:bg-[#3665f3]/90">Sign In</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input id="signup-confirm" type="password" required />
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
