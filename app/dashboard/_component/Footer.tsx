import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FacebookIcon, GitlabIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-muted p-6 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold text-prim">Social</h3>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <FacebookIcon className="h-5 w-5 text-acc" />
            Facebook
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <InstagramIcon className="h-5 w-5 text-acc" />
            Instagram
          </Link>
        </div>
        <div className='grid gap-1'>
          <h3 className="font-semibold text-prim">Social</h3>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <TwitterIcon className="h-5 w-5 text-acc" />
            Twitter
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            <LinkedinIcon className="h-5 w-5 text-acc" />
            LinkedIn
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold text-prim">Company</h3>
          <Link
            href="/dashboard/About"
            className="text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            About Us
          </Link>
          <Link
            href="/dashboard/Contact"
            className="text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            Our Team
          </Link>
        </div>
        <div className="grid gap-0.2">
          <h3 className="font-semibold text-prim">Resources</h3>
          <Link
            href="/dashboard/Blog"
            className="text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            Blog
          </Link>
          <Link
            href="/dashboard/How"
            className="text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            How it Works?
          </Link>
        </div>
        <div className="grid">
          <h3 className="font-semibold text-prim">Legal</h3>
          <Link
            href="/dashboard/PP"
            className="text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/dashboard/TOS"
            className="text-muted-foreground hover:text-prim"
            prefetch={false}
            style={{ cursor: 'url(/poin.png), auto' }}
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
