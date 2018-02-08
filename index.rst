thatlittlegit
=============
Hi! I'm thatlittlegit. I code a variety of projects, mainly in POSIX Shell,
AWK, C++, JavaScript and Java.

my setup
========
As of 2018-01-01, I hex-booted six operating systems: Windows (unfortunately),
Ubuntu, Manjaro, Debian, Arch and variant of `Cucumber Linux
<https://cucumberlinux.com/>`_.

However, since I got a 2TB harddrive off
Amazon, this has decreased - I currently have Windows, Ubuntu, Cucumber and
Arch. (Manjaro and Arch are still in my GRUB menu, but an update-grub will
remove them.) Ubuntu or Cucumber is going next. Ubuntu will be hard, though,
since it's the GRUB partition. I plan to have GRUB not connected to any distro,
on a separate /boot.

As for hardware, I have an Acer Aspire E1-572P, with an Intel Core i5-4200U
and *Intel HD GRAPHIX!* It has 1TB of disk, though, and 12GB RAM, so it's
not really that bad.

my projects
===========
I made a `whole page
<https://thatlittlegit.github.io/projects>`_ about my projects.

plans
-----
*Note: this will likely be out-of-date. Last updated: 18-01-29*

- A operating system builder for Linux (and maybe, eventually, kFreeBSD). It'd
  have a concept of 'packages': it would be built with a Makefile, and you
  may use command-line arguments and a config file to pick packages. For
  example:::

        PKGSRC(https://github.com/thatlittlegit/osb_pkgs)

        ALL_STAGES(binutils)

        STAGE1(tinycc)
        STAGE1(linuxapi)
        STAGE1(musl)

        // ...

- An `unhosted
  <https://unhosted.org>`_ webapp.

- A decent M[TD]A.
- A cryptocurrency in Rust. Trade 1 unit (let's say XAC) for 1 USD/CAD to
  keep a low price. Don't use proof-of work. Maybe proof-of-burn or whatever?

contact me
==========
Email me at `thatlittlegit@protonmail.com
<mailto:thatlittlegit@protonmail.com>`_.

PGP: http://pgp.mit.edu/pks/lookup?op=get&search=0x50F8158D2C508E24 (50F8158D2C508E24)

y no css bro?
=============
1. People who use `lynx
   <https://lynx.invisible-island.net>`_ will thank me.
2. It's simpler and smaller to download.
3. I was actually considering plaintext. Be happy I did ReStructuredText to
   HTML instead.

----

Copyright 2018 thatlittlegit. Under MIT license.
