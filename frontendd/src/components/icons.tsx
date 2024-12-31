import { Eye, EyeOff, Mail, Lock, Github, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Icons = {
  eye: Eye,
  eyeOff: EyeOff,
  mail: Mail,
  lock: Lock,
  github: Github,
  spinner: Loader2,
  arrowRight: ArrowRight,
  checkCircle: CheckCircle2,
};

export type Icon = keyof typeof Icons;
