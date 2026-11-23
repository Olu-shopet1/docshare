import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { safeHref } from '@/lib/utils';

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
    <header className="flex w-full flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatar} alt="" width={96} height={96} />
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
        <ul role="list" aria-label="Social profiles" className="flex gap-2 pt-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={safeHref(social.url!)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <social.icon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">{social.label} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
