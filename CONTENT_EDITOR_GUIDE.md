# Oikotaan Content Editor Guide

This is for committee members who want to add or update events, photos, or
page text on the website — no code, no Git, nothing to install. If you are a
developer or teen volunteer working on the website's code instead, use
[TEEN_MANUAL.md](TEEN_MANUAL.md) — it covers this and much more.

Everything here happens in a web browser, at one address: `/admin` on the
website.

## What you can do here

- Add or update an event
- Add a Community Impact entry (a food drive, volunteering, mutual aid)
- Update the homepage's text, hero photo, or photo gallery
- Update the About page's mission text

This editor cannot create a new page, change the menu, or restructure the
site — those things simply are not here to edit. It only reaches the content
above, which is why saving publishes immediately without anyone reviewing it
first: an unusual date or a typo is easy to fix, and nothing you can do here
can break the website itself. If you ever want something the editor does not
offer, ask a maintainer — that is a code change, not a content one.

## Before you start

Ask a maintainer for two things:

1. Confirm whether you already have a GitHub account, or need one (step 1
   below).
2. Ask them to add you as a collaborator on the website's GitHub project.
   Without this, sign-in at `/admin` will not work for you.

Do not share a GitHub account with other committee members, even to save a
step. Ask the maintainer to add each person individually instead — it takes
them a minute, and it means your own changes are always recorded under your
own name, not lost in a shared login everyone uses.

## 1. Create a GitHub account

Skip this if you already have one.

1. Go to [github.com/join](https://github.com/join) and sign up with an email
   address you check regularly.
2. Verify your email address — GitHub emails you a code or link, and nothing
   else works until you do this.
3. Turn on two-factor authentication if you can: **Settings → Password and
   authentication → Two-factor authentication**. This protects your account.

Tell the maintainer your exact GitHub username once you have one.

## 2. Get access

1. The maintainer adds your username to the website's GitHub project.
2. GitHub sends you an invitation — check
   [github.com/notifications](https://github.com/notifications) or your
   email, and accept it.
3. You are now ready to sign in.

## 3. Sign in and make a change

1. Go to `https://www.oikotaannj.org/admin`.
2. Click **Sign in with GitHub**, and sign in with the account from step 1.
3. On the left, pick what you want to work on:
   - **Events** — for pujas, programs, picnics, classes
   - **Community Impact** — for food drives, volunteering, mutual aid
   - **Pages → Home Page** — the homepage's text, hero photo, and gallery
   - **Pages → About Page** — the About page's mission text
4. To add something new, click **New**. To change something existing, click
   it in the list.
5. Fill in the form. Every field has a label explaining what goes there. A
   few worth knowing:
   - **Date** fields use a calendar picker — no need to type a format.
   - **Photo** fields open an upload window (Cloudinary) — click it, choose a
     photo from your computer, and it handles resizing on its own. You do
     not need to resize or compress anything yourself first.
   - **Hide from the site** (sometimes labelled "draft") keeps a half-written
     event or entry off the live site until you are ready. Leave it checked
     while you are still working, and uncheck it when it's ready to publish.
   - Every photo needs a short **description for screen readers** — a plain
     sentence describing what's in the photo, for visitors who use one.
6. Click **Save**.

## What happens after you save

Saving publishes your change to the live website directly — there is no
separate review or approval step. It usually appears within a minute or two,
once Netlify finishes rebuilding the site. That also means a typo or a wrong
date goes live just as fast, so take a moment to reread the form before you
click Save, the same way you would before sending an email to the whole
community.

If you notice a mistake right after publishing, open the same entry, fix it,
and save again — that is normal and not something to worry about.

## If something looks wrong after it's published

Tell a maintainer what you saw and which page it was on. Do not try to fix it
by guessing — the maintainer can see exactly what changed and undo it if
needed.

## Troubleshooting

**Sign-in does nothing, or shows an error.** Ask a maintainer rather than
assuming it's something you did wrong — most sign-in problems trace back to
step 2 above (not yet added as a collaborator) rather than anything on your
end.

**"Fork this repository" instead of a normal sign-in.** You have not been
added as a collaborator yet, or have not accepted the invitation — check
[github.com/notifications](https://github.com/notifications).

**You forgot your GitHub password.** Use GitHub's own password reset at
sign-in. Do not create a second account — that would need to be added
separately, and old changes stay tied to your first account either way.

## A few rules

- Only publish photographs of children with a parent's consent.
- Never share your GitHub sign-in with anyone, including other committee
  members.
- If you are not sure whether something is ready to go live, leave **Hide
  from the site** checked and ask.
