import { Github, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import { links } from "./content";
import type { SocialLink } from "../types";

/* Las cinco redes del diseño anterior, en un solo sitio. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub",    href: links.github,    Icon: Github },
  { label: "LinkedIn",  href: links.linkedin,  Icon: Linkedin },
  { label: "Instagram", href: links.instagram, Icon: Instagram },
  { label: "X",         href: links.twitter,   Icon: Twitter },
  { label: "Facebook",  href: links.facebook,  Icon: Facebook },
];
