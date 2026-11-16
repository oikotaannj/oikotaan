---
title: "Template — Full festival event"
titleBengali: "সরস্বতী পূজা ২০২৭"
date: 2027-02-20
time: "9:00 AM to 9:00 PM"
venue: "Auten Road Intermediate School"
address: "281 Auten Rd, Hillsborough Township, NJ 08844"
summary: "A hidden starter event with every page section filled in. Duplicate it in the CMS, then replace the sample content."
image: "https://res.cloudinary.com/yxpsjuuc/image/upload/c_fill,ar_16:9,g_auto/v1790024893/oikotaan/saraswati-puja-2027.png"
imageAlt: "A devotional portrait of Devi Saraswati holding a book and prayer beads, playing a veena"
featured: false
draft: true
sections:
  - type: highlights
    heading: "What to expect"
    intro: "A full day of prayer, music and food, open to everyone whether or not you are a member."
    items:
      - kicker: "Tradition"
        title: "Pushpanjali"
        description: "Flower offerings to Devi Saraswati, led by the priest. Come a few minutes early if you would like to join the first round."
        image: "https://res.cloudinary.com/yxpsjuuc/image/upload/v1790012667/oikotaan/gallery-saraswati.jpg"
        imageAlt: "Saraswati Puja altar decorated with marigold garlands and paper flowers"
      - kicker: "For the little ones"
        title: "Hatekhori"
        description: "The first-writing ceremony for children starting to learn. Bring a slate or notebook if you have one."
        image: "https://res.cloudinary.com/yxpsjuuc/image/upload/v1790012667/oikotaan/gallery-stage-program.jpg"
        imageAlt: "Children performing a cultural program on stage"
      - kicker: "On stage"
        title: "Cultural programme"
        description: "Songs, recitation and dance from our own groups, with the children performing first."
        image: "https://res.cloudinary.com/yxpsjuuc/image/upload/v1790012666/oikotaan/gallery-classical-dance.jpg"
        imageAlt: "A classical dance duo performing in blue and gold costumes"
      - kicker: "Together"
        title: "Bhog and dinner"
        description: "Khichuri at midday and a full dinner in the evening, cooked by the food committee rather than catered."
        image: "https://res.cloudinary.com/yxpsjuuc/image/upload/v1790012668/oikotaan/gallery-volunteers.jpg"
        imageAlt: "Volunteers holding handmade paper flowers used to decorate a puja stage"
  - type: schedule
    heading: "Schedule"
    note: "Doors open at 9:00 AM. Timings shift a little on the day, so treat the evening slots as approximate."
    days:
      - label: "Saturday, 20 February"
        note: "Everything happens in the main hall unless announced otherwise."
        items:
          - {
              time: "9:00 AM",
              title: "Doors open",
              description: "Tea and biscuits at the back of the hall.",
            }
          - { time: "9:45 AM", title: "Puja begins" }
          - {
              time: "11:00 AM",
              title: "Pushpanjali",
              description: "Two rounds, the second at about 11:30 AM.",
            }
          - {
              time: "12:00 PM",
              title: "Hatekhori",
              description: "For children beginning to read and write.",
            }
          - {
              time: "12:45 PM",
              title: "Bhog served",
              description: "Please queue from the hall entrance.",
            }
          - { time: "3:30 PM", title: "Tea and snacks" }
          - { time: "4:00 PM", title: "Cultural programme begins" }
          - { time: "7:30 PM", title: "Dinner" }
          - {
              time: "9:00 PM",
              title: "Close",
              description: "Volunteers welcome to stay and help pack up.",
            }
  - type: programs
    heading: "Cultural programs"
    intro: "Our own groups perform first, followed by guest artists in the evening."
    groups:
      - label: "Afternoon"
        note: "Performed by Oikotaan members and their children."
        items:
          - {
              time: "4:00 PM",
              title: "Rabindrasangeet",
              performer: "Oikotaan Music Group",
              description: "A short set of seasonal songs.",
            }
          - {
              time: "4:30 PM",
              title: "Recitation",
              performer: "Children's Group",
              description: "Poems in Bengali and English.",
            }
          - { time: "5:00 PM", title: "Group dance", performer: "Oikotaan Dance Group" }
      - label: "Evening"
        items:
          - time: "6:00 PM"
            title: "Dance drama"
            performer: "Oikotaan Teens"
            description: "A short staging prepared over the winter by the teenage volunteers."
            image: "https://res.cloudinary.com/yxpsjuuc/image/upload/v1790012666/oikotaan/gallery-music-night.jpg"
            imageAlt: "Two members sharing a moment at a live music performance"
          - {
              time: "7:00 PM",
              title: "Open mic",
              performer: "Anyone who would like a turn",
              description: "Tell a volunteer at the sound desk before 6:30 PM.",
            }
  - type: menu
    heading: "Food"
    note: "Cooked by the food committee. Tell a volunteer about allergies and we will do our best."
    meals:
      - name: "Bhog (lunch)"
        time: "12:45 PM onwards"
        note: "Served to everyone, no ticket needed."
        items:
          - { name: "Khichuri" }
          - { name: "Labra" }
          - { name: "Beguni" }
          - { name: "Tomato chutney" }
          - { name: "Payesh" }
      - name: "Snacks"
        time: "3:30 PM"
        items:
          - { name: "Singara" }
          - { name: "Nimki" }
          - { name: "Mishti" }
          - { name: "Tea and coffee" }
      - name: "Dinner"
        time: "7:30 PM"
        note: "Included with registration."
        items:
          - { name: "Luchi" }
          - { name: "Aloor dom" }
          - { name: "Chholar dal" }
          - { name: "Kosha mangsho", nonVeg: true }
          - { name: "Fish kalia", note: "limited", nonVeg: true }
          - { name: "Chutney and papad" }
          - { name: "Mishti doi" }
  - type: registration
    heading: "Registration"
    intro: "Registration covers dinner and the evening programme. Bhog at midday is free for everyone."
    deadline: "Early registration closes Monday 1 February 2027. After that, add $5 per person."
    urlLabel: "Register online"
    tiers:
      - name: "Family"
        price: "$60"
        unit: "per family"
        description: "Two adults and any children under 12 living at the same address."
        includes:
          [
            "Dinner for everyone in the family",
            "Evening cultural programme",
            "Reserved seating if you arrive before 5:30 PM",
          ]
        highlight: true
      - name: "Single"
        price: "$25"
        unit: "per person"
        includes: ["Dinner", "Evening cultural programme"]
      - name: "Children"
        price: "Free"
        unit: "under 12"
        includes: ["Dinner", "Hatekhori ceremony"]
      - name: "Students"
        price: "$15"
        unit: "with student ID"
        includes: ["Dinner", "Evening cultural programme"]
    note: "Nobody is turned away for not being able to contribute. Write to us quietly and we will sort it out."
  - type: payment
    heading: "How to pay"
    intro: "Pay after you register. Please put your name in the reference so the treasurer can match it up."
    qrImage: "/images/sample-qr.svg"
    qrAlt: "Sample placeholder standing in for a payment QR code"
    qrCaption: "Scan with your banking app"
    methods:
      - {
          label: "Zelle",
          value: "oikotaanassociationofusa@gmail.com",
          note: 'Put your name and "Saraswati 2027" in the memo.',
        }
      - {
          label: "Cheque",
          value: "Oikotaan Association of USA",
          note: "Hand to any committee member, or post to the address in the footer.",
        }
      - {
          label: "Cash",
          value: "At the door on the day",
          note: "Please bring the exact amount if you can.",
        }
    note: "Oikotaan Association of USA is a 501(c)(3) public charity, so your contribution may be tax deductible. Ask for a receipt at the registration desk."
---

Please join us for Saraswati Puja 2027 at Auten Road Intermediate School, as we
honor Devi Saraswati, the goddess of knowledge, music and the arts.

This is a sample page. Every section below has been filled in so the committee
can see how a complete event looks before writing the real one.

### Getting there

The school is off Auten Road, with parking in the main lot behind the building.
Overflow parking is signposted from the entrance.

### Helping out

Puja runs on volunteers. If you can spare an hour on the day, tell any
committee member or mention it when you register.
