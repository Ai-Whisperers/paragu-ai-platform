// English overrides for the activities (kink practices) catalog.
// The data is in /lib/activities.ts. This file holds the EN versions
// of the most-visible strings (name, tagline, shortDesc) and the longDesc
// (a 1-2 paragraph description). Equipment, safetyNotes, beginnerTips,
// etc. stay in Spanish for now — the EN page shows the EN title/tagline
// and a "Detailed English content coming" notice.

import type { Activity } from "./activities";

type ActivityOverride = Pick<
  Activity,
  "name" | "tagline" | "shortDesc" | "longDesc"
>;

export const ACTIVITIES_EN: Record<string, ActivityOverride> = {
  "shibari-rope": {
    name: "Shibari · Rope Bondage",
    tagline: "Rope as language",
    shortDesc:
      "Aesthetic, sensual and conscious tying. With roots in Japanese kinbaku, today practiced worldwide as an art of connection.",
    longDesc:
      "Shibari (縛り, 'to tie') describes rope tying as an aesthetic, sensual and sometimes erotic practice. Although the word is Japanese, kinbaku and contemporary shibari are taught and practiced globally as forms of consensual body art. The practice centers on communication, attention to the other's body, and the building of a progressive physical dialogue. In the maškaráda community, shibari is taught as one of the entry doors to kink: the rope creates a rhythm, a structure, and a shared focus that many people find meditative.",
  },
  "impact-play": {
    name: "Impact Play",
    tagline: "Rhythm, sensation and control",
    shortDesc:
      "Striking the body with controlled implements: hand, paddle, flogger, crop, cane. Each tool has a different language of sensation. An accessible practice that can go from very soft to very intense.",
    longDesc:
      "Impact play covers any practice that involves striking or applying percussive force to the body, with a controlled implement. The 'language' of each implement is different: a hand gives sharp, immediate sensation; a paddle spreads the impact over a wider area; a flogger creates a thuddy, deep sensation; a cane is precise and stingy. The practice is accessible (the simplest version, a hand, requires no equipment) and scalable (the same basic techniques work for very soft play or very intense scenes). The two most important safety concepts: 1) avoid the kidneys, lower back, and spine; 2) check in regularly — skin color, breathing, the person's verbal state. Negotiation of zones, intensity and safe words is non-negotiable.",
  },
  "sensory-deprivation": {
    name: "Sensory Deprivation",
    tagline: "When the world shortens, the other senses sharpen",
    shortDesc:
      "Reducing one sense amplifies the others. A blindfold, earplugs, a hood. A meditative and intense practice that requires minimal equipment and deep trust.",
    longDesc:
      "Sensory deprivation uses tools (blindfolds, earplugs, hoods, mittens) to reduce one or more senses. The result: the remaining senses become more acute, and small touches or sounds become enormous. The practice can be very meditative (almost trance-like for the receiver) and very intense (the receiver is at the mercy of the giver's stimuli). Safety: always have a way to communicate that doesn't depend on the affected sense (a gesture, a sound, a pre-agreed object to drop). The receiver is more vulnerable than in any other practice, so the negotiation must be especially clear.",
  },
  "role-play-scene": {
    name: "Role Play · Scene Work",
    tagline: "Characters, fictions, consensual performances",
    shortDesc:
      "Acting out scenes with roles. Teacher/student, doctor/patient, boss/employee, strangers on a train. Fiction as a tool for exploring dynamics, fantasies, and emotions.",
    longDesc:
      "Role play is the practice of acting out a scene with roles. The roles can be archetypal (teacher/student, doctor/patient, boss/employee), specific (strangers on a train, two characters from a book), or entirely constructed by the participants. The practice is versatile: it can be almost vanilla (just a different conversation) or intensely kinky (full power exchange for an hour). The most important: the roles are negotiated before. What is the dynamic? Who has the power? Where are the limits? What happens if someone breaks character? Role play is a tool for exploring fantasies that the participants don't want to live in their everyday life — and for some, it's the only way to access certain emotions. The line between role play and reality must always be clear.",
  },
  "psychological-play": {
    name: "Psychological Play",
    tagline: "The mind as a tool",
    shortDesc:
      "Practices that work on the mind: mental control, manipulation of expectations, consensual psychological intensity. The most demanding practice in terms of communication.",
    longDesc:
      "Psychological play works on the mind more than the body. Examples: consensual verbal degradation (within negotiated limits), control of information (the receiver doesn't know what comes next), consensual gaslighting (briefly making the receiver doubt a sensory input, with prior agreement), consensual fear play (controlled situations that generate adrenaline in a safe frame). It is the most demanding practice in terms of communication: the lines between role and reality, between the scene and the person, between consent and abuse, are thinner. It requires explicit negotiation of psychological limits (often more sensitive than physical ones), check-ins during the scene, and a robust aftercare that addresses the emotional impact specifically. For experienced practitioners, with solid trust and communication. Not for beginners.",
  },
  "service-play": {
    name: "Service Play",
    tagline: "Devotion, ritual and attention",
    shortDesc:
      "Acts of service in a D/s context: cooking, cleaning, kneeling, serving drinks, dressing, undressing. Often part of a 24/7 dynamic.",
    longDesc:
      "Service play is the practice of performing acts of service in a D/s context. The acts can be domestic (cooking, cleaning, doing laundry), ritual (kneeling, serving food in a specific way, dressing or undressing the dominant), or social (serving drinks at a party, attending to the dominant's needs in public). The practice is often part of a 24/7 dynamic: the service isn't a scene that ends, it's a relationship pattern. The key is consent and clarity: what is expected, what is not, when the service starts and ends, what happens if the service-provider has a bad day. Service can be deep, quiet, and profoundly intimate — or it can be elaborate and ritualized. There's no single 'correct' way; there's the way that works for the people involved.",
  },
};
