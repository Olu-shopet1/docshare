import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  bio: string;
  avatar: string;
  username: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export function ProfileHeader({ name, bio, avatar, username, socialLinks }: ProfileHeaderProps) {
  const socials = [
    { icon: Github, url: socialLinks.github, label: 'GitHub' },
    { icon: Twitter, url: socialLinks.twitter, label: 'Twitter' },
    { icon: Linkedin, url: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: socialLinks.instagram, label: 'Instagram' },
  ].filter(social => social.url);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {username}
        </p>
        <p className="mt-2 text-sm text-foreground/80">
          {bio}
        </p>
      </div>

      {socials.length > 0 && (
        <div className="flex gap-4 pt-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
