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
- Build out a big event page with a schedule, menu, programme and prices
  (see section 4)

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
3. Turn on two-factor authentication: **Settings → Password and
   authentication → Two-factor authentication**.

   This is not optional. GitHub requires it of anyone who can change a
   project, so you will be asked for it sooner or later whether or not you
   set it up now. Doing it now means you are not stuck on it later, halfway
   through trying to publish something.

   You will need your phone. The simplest option is an authenticator app
   (Google Authenticator, Microsoft Authenticator, or whatever your phone
   already has) — GitHub walks you through scanning a square code with it.
   **Save the recovery codes GitHub shows you** somewhere you can find again.
   They are what gets you back in if you lose your phone.

   If this step feels fiddly, do it sitting with the maintainer rather than
   alone over email. It is the one part of this setup that genuinely trips
   people up, and it takes two minutes with someone beside you.

Tell the maintainer your exact GitHub username once you have one.

## 2. Get access

1. The maintainer adds your username to the website's GitHub project.
2. GitHub sends you an invitation — check
   [github.com/notifications](https://github.com/notifications) or your
   email, and accept it.
3. You are now ready to sign in.

## 3. Sign in and make a change

1. Go to `https://www.oikotaannj.org/admin`.
2. You will see a dark screen with the Sveltia CMS logo and **two** buttons.

   Click the top one, **Sign In with GitHub**.

   Ignore **Sign In Using Access Token** underneath it. That one is for
   developers and will ask you to paste a long secret code you do not have.
   If you click it by mistake, just reload the page and pick the top button.

3. Sign in with the GitHub account from step 1.
4. The first time only, GitHub asks whether to let the editor use your
   account. Click **Authorize**. This is expected, and it is how the editor
   saves your changes under your name.

   After this, you stay signed in. On later visits `/admin` usually opens
   straight into the editor with nothing to click.

5. On the left, pick what you want to work on:
   - **Events** — for pujas, programs, picnics, classes
   - **Community Impact** — for food drives, volunteering, mutual aid
   - **Pages → Home Page** — the homepage's text, hero photo, and gallery
   - **Pages → About Page** — the About page's mission text
6. To add something new, click **New**. To change something existing, click
   it in the list.
7. Fill in the form. Every field has a label explaining what goes there. A
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
8. Click **Save**.

## 4. Building out a big event page

Most events only need the fields above — a date, a venue, a summary, a photo
and a few sentences. Skip this section until you are working on something
larger, like a puja with a full day's programme.

For those, scroll to the **very bottom** of the event form, past the Details
box. There is one more heading:

> **Homepage spotlight sections**

It is collapsed, so it looks like a single line rather than a panel. Click it
and six sections open up inside:

| Section                        | What it is for                                             |
| ------------------------------ | ---------------------------------------------------------- |
| What to expect                 | A few highlights — anjali, hatekhori, bhog                 |
| Schedule                       | What happens when, hour by hour                            |
| Cultural programs              | Performers and slots                                       |
| Food                           | What is being served at each meal                          |
| Registration and contributions | What it costs, for families and single people and children |
| How to pay                     | A payment QR code and the account details                  |

### Nothing appears until you switch it on

Each section has a **Show this section** switch, and each one starts off.

A section only appears on the website when **both** things are true: the
switch is on, and you have actually put something in it. A section that is
switched on but still empty simply does not show up — it does not leave a
blank heading or a gap on the page.

That is deliberate. You can write the schedule over three sittings across two
weeks, saving as you go, and nobody sees a half-finished list. Turn the switch
on when it is right.

### Adding things to a section

Several sections hold lists — days in a schedule, meals in the food section,
tiers in registration. They all work the same way:

- **Add** a new one with the **+** or **Add** button
- **Reorder** by dragging the handle on the left of each row
- **Remove** with the menu at the right of the row
- Click a row to open it; click the header again to fold it away

Lists can sit inside lists. The Schedule holds a list of **days**, and each
day holds a list of **items** (a time and what happens). A one-day puja has
one day in it. That is normal, not a mistake.

### A few things worth knowing

- **Food:** everything is treated as vegetarian unless you tick **Contains
  meat or fish** on a dish. The website then adds a "non-veg" marker beside
  that dish and a line explaining the marker. Tick it only on the dishes that
  need it.
- **Registration:** the **price** is free text, so `$25`, `Free` and
  `$60 per family` all work. **Draw attention to this tier** puts a highlight
  around one of them — use it on at most one, or it stops meaning anything.
- **How to pay:** fill in the **payment details** list even if you upload a
  QR code. A QR code is invisible to someone using a screen reader, and
  useless to anyone reading the page on the same phone they would scan with.
  The written details are the only way those people can pay.
- **Schedule times** are free text. Write them the way you would say them —
  `9:30 AM`, `12:30 PM onwards`.

### Checking your work

Save, wait a minute or two, then open the website and look at it on your
phone as well as a computer. Most people will read it on a phone.

If a section you filled in is not showing, the usual reason is the **Show
this section** switch is still off.

## What happens after you save

Saving publishes your change to the live website directly — there is no
separate review or approval step. It usually appears within a minute or two,
once Netlify finishes rebuilding the site. That also means a typo or a wrong
date goes live just as fast, so take a moment to reread the form before you
click Save, the same way you would before sending an email to the whole
community.

If you notice a mistake right after publishing, open the same entry, fix it,
and save again — that is normal and not something to worry about.

## Making one event the homepage

In the weeks before a big event you can hand the whole homepage over to it,
then switch back afterwards. This is in **Pages → Home Page**, at the top,
under **Homepage layout**.

**Which layout**

- **Normal homepage** — the usual page: who we are, what is coming up
- **Feature one event** — the homepage becomes that event's page, with its
  date, venue and all the sections you filled in

**Which event to feature**

Pick one from the list by name. If you leave it empty, the homepage features
whichever event is next on the calendar and moves on by itself once that one
has passed — so you do not have to remember to change it after the puja.

Pick an event by name when you want a specific one regardless of dates.

Two things that cannot go wrong:

- If you choose **Feature one event** and there is no upcoming event, the
  normal homepage is shown instead. The site never ends up with a blank
  homepage.
- If you pick an event and it is later deleted or hidden, the homepage falls
  back to the next event rather than breaking.

## If something looks wrong after it's published

Tell a maintainer what you saw and which page it was on. Do not try to fix it
by guessing — the maintainer can see exactly what changed and undo it if
needed.

## Troubleshooting

**You are being asked to paste an "access token".** You clicked the lower of
the two buttons on the sign-in screen. Reload the page and click **Sign In
with GitHub** at the top instead. You do not need a token and should not
create one.

**GitHub is asking for a code from your phone.** That is two-factor
authentication doing its job. Open your authenticator app and type the
six-digit code it shows. If you have lost your phone, use one of the recovery
codes you saved in step 1, then ask the maintainer for help setting it up
again.

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
