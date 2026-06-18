// English translations for /aprender/[slug] pages.
// Keys are slugs; values override the Spanish `title`, `excerpt`, and `body`.
// Body is the full markdown text. If a slug is not in this map, the
// Spanish body is served (with a visible "EN translation coming" notice).
//
// This file is hand-curated; long-form translations can be filled in
// by a translator later without touching the original data file.

import type { Guide } from "./guides";

type GuideOverride = Pick<Guide, "title" | "excerpt" | "body">;

export const GUIDES_EN: Record<string, GuideOverride> = {
  "que-es-bdsm": {
    title: "What is BDSM? An introduction for the curious",
    excerpt:
      "BDSM is not what the movies show. It is a framework of consensual practices between adults exploring power dynamics, sensory play, and intensity. What it is, what it isn't, and why millions of people practice it.",
    body: `## What is BDSM?

BDSM is an English acronym for a set of consensual practices between adults. The letters stand for:

- **B**ondage & **D**iscipline
- **D**ominance & **S**ubmission
- **S**adism & **M**asochism

The practices it covers are varied: from rope bondage, to impact play, to psychological role play, to ritualized service. What unites them is that all are **consensual, pre-negotiated, and reversible** by a safe word or gesture.

## What BDSM is NOT

- It is not abuse. Abuse is non-consensual. BDSM without consent is abuse, not BDSM.
- It does not require pain. Many practices (service, role play, ritual, light bondage) involve no physical pain at all.
- It does not require a specific kind of person. People of all orientations, gender identities, ages (always 18+) and backgrounds practice.
- It is not a "sign" of trauma. While the practice can sometimes be therapeutic, most people in kink are not trauma survivors, nor do they need to be to have intense desire.
- It is not what the media shows. Mainstream porn, film, and TV usually show BDSM without context, negotiation, safety, or aftercare. That's fiction (and not very realistic).

## What it IS

- **A practice based on consent.** Every act is negotiated AHEAD. "No" can be said at any time. Afterward you talk about what worked.
- **A practice that respects the body and limits.** Physically intense practices have safety protocols. Emotionally intense ones have aftercare protocols.
- **A community.** Dungeons, munches (social meetups), conferences, workshops, mentors. Most people in kink learned from other people, not the internet.
- **Diverse and historically queer-friendly.** While there is space for all orientations, the kink community has deep roots in the LGBTQ+ community. Today it remains one of the most welcoming spaces for non-normative gender identities and orientations.
- **18+.** BDSM involves informed consent. By legal and ethical definition, only adults.

## Why do people practice it?

The reasons are as varied as the practices themselves. Some common ones:

- **Emotional and physical intensity** — the body and mind respond differently when there is coordinated intensity.
- **Connection** — deep negotiation, attention to the other, radical trust are forms of intimacy that many people value.
- **Exploration of power** — in everyday life power is distributed in ways we don't always choose. Kink lets you experiment with power dynamics in a safe frame.
- **Healing shame** — many people grew up with shame around desire. Kink lets you reframe desire as something that can be explored with care.
- **Active meditation** — meditative practitioners report that intense practice works as a koan: it leaves little room for a ruminating mind.
- **Fun** — kink is, at its base, play between adults.

## Safety frameworks: SSC and RACK

The two great safety traditions in kink:

- **SSC — Safe, Sane, Consensual.** What is "sane" or "safe" is subjective, which has led this tradition to be complemented.
- **RACK — Risk-Aware Consensual Kink.** It acknowledges that every activity carries some risk; what matters is risk awareness, communication, and consent.

The more experienced communities use RACK explicitly: not because RACK is "less safe", but because it describes reality more honestly. An impact play session with a leather flogger has real physical risks (bruises, soreness, temporary marks). RACK says: "we know the risks, we negotiate them, we accept them, we manage them." SSC says: "we don't harm each other." The first is more useful.

At maškaráda we follow SSC **and** RACK, depending on context. Pre-negotiation is sacred. The safe word is respected without question. Aftercare is not optional.

## How do you enter the community?

There is no single door. The most common ones:

1. **Read** — about the topic, before anything else. This guide is a start. There are dozens of books. The Learn section has recommendations.
2. **Attend a munch** — a public social gathering (usually in a bar or restaurant) where the community meets without play. It is the kindest entry door.
3. **Go to an event** — like maškaráda. Entry is by ticket, dresscode is specific, and the atmosphere is explicitly consensual. It's more intense than a munch but not entry-level — it's event-level.
4. **Take a workshop** — rope, negotiation, basic impact play. There are instructors who teach individually or in small groups.
5. **Connect with a mentor** — people with years of experience who accompany newer people. The community usually has channels to find them.

None of these doors is better than the others. The one that makes sense for you is the right one.

## Is it not for me?

Maybe. BDSM is not for everyone, nor does it need to be. If after reading this your curiosity did not awaken, that's fine. If it did but the content makes you uncomfortable, that's okay too. There is no obligation to "try" anything.

What we do hope: that if you decide to explore, you do it informed, honestly about what you want, and respecting limits — yours and others'.

## To keep learning

- [Glossary of kink terms](/aprender/glosario) — basic vocabulary
- [Safewords, traffic lights, and aftercare](/aprender/palabras-seguridad) — safety protocols
- [Your first play party](/aprender/primera-fiesta) — what to expect when attending
- [Community standards at maškaráda](/reglas) — how we operate in this space`,
  },

  "palabras-seguridad": {
    title: "Safewords, aftercare and exit protocols",
    excerpt:
      "How safety is managed during a session: the traffic-light system, alternatives for non-verbal scenes, and the aftercare that comes after. What separates responsible kink from abuse.",
    body: `## Why safety protocols matter

Every kink practice — from a hand-spank to an hour-long shibari session — involves some level of physical or emotional intensity. Intensity without protocol is an accident waiting to happen. Intensity with protocol is a chosen practice.

Safety protocols serve three functions:

1. **Allow exploration of intensity** knowing you can exit at any moment.
2. **Distinguish consensual intensity from harm** — without protocol, the two get confused.
3. **Build trust** — knowing the other can say "stop" and be heard is what enables vulnerability.

## The traffic light system

The most-used system in the global community, recommended by most experienced communities:

- **🟢 Green** — "keep going, I like this, we can go up a little"
- **🟡 Yellow** — "ease up, I'm near the limit, check in with me"
- **🔴 Red** — "STOP. Immediately. No questions. Get me out of the scene."

When someone says "red" (or the agreed equivalent), the activity stops in the moment. No negotiation. No discussion. No "checking if they really mean it." It stops, the other person is brought out of the scene, and there's a verbal check-in: "are you ok? what do you need?"

The traffic light is negotiated BEFORE the session. What each color means can vary from person to person — what matters is that both parties have the same expectation.

## When the traffic light doesn't work

In sensory deprivation sessions (blindfolds, earplugs), in deep submission scenes, or when a person temporarily loses the ability to speak, the verbal system fails. Alternatives:

- **Pre-agreed physical gesture** — drop the blindfold, open and close the hand three times, slap the floor with the unrestricted hand. Whatever it is: what the person can always DO.
- **Droppable object** — a bell, a handkerchief, a ball. If it sounds, stop.
- **Timed check-in** — the active person asks every X minutes "how are we doing?" The submissive person nods or shakes their head.

Any protocol is valid as long as it is negotiated before. The rule is: **there must always be a way to stop, and the active person must be attentive to it**.

## Aftercare

"Aftercare" is the post-session care. It is **part of the practice**, not an extra. Some reasons it exists:

- **Oxytocin and dopamine release** — the body releases these hormones during practice. When they drop, you can have an emotional crash (sub drop).
- **Post-scene vulnerability** — the person who was in submission or received intensity is usually emotionally open. They need to feel the other person is still present.
- **Transition back** — returning to "everyday mode" takes time. Especially after intense role play or shibari, the body needs to recalibrate.

Typical aftercare includes:

- Soft conversation about the scene (what was good, what wasn't)
- Water, light food
- Comforting physical contact (hug, gentle touch) if both want it
- Time: minimum 20-30 minutes for soft scenes, 1+ hour for intense scenes
- Sometimes: sleeping together, showering together, or just being in the same room

The person giving the orders (top/dom) also needs aftercare. The "top drop" — guilt, emotional crash post-scene — is less discussed but equally real. Whoever gives the intensity also needs transition time.

## Sub drop and top drop

"Sub drop" is an emotional and physical crash that can occur hours or even a day after an intense scene. Typical symptoms:

- Sadness without identifiable cause
- Unexpected crying
- Extreme tiredness
- Feeling empty or disconnected
- Irritability
- Difficulty sleeping or sleeping too much
- Negative self-talk

Sub drop is NOT a sign that the scene went wrong. It is NOT that the person "isn't cut out for this". It is a normal neurochemical response: the body released oxytocin, dopamine, adrenaline, endorphins during the scene. When they drop, the nervous system needs to recalibrate. It is a hormonal process, not an emotional one in the sense of "regretting what happened."

The "top drop" is the equivalent for the person giving: intense guilt ("did I hurt them?"), tiredness, disconnection, repetitive thoughts about the scene, sometimes sadness without cause.

How to manage it:

- **Before the scene:** let your partner(s) know it can happen. Have a plan (food, water, contact) for afterwards.
- **During the scene:** enjoy it. Sub drop happens because something was intense. Intensity is part of the value.
- **Immediately after:** post-scene conversation — what was good, what wasn't, what to repeat. Comforting contact if both want it. Water, light food. Time: minimum 20-30 minutes of transition.
- **24-48 hours later:** if you feel a crash, DON'T panic. It's expected. Maintain contact with your partner(s). A message "I'm feeling a crash, don't worry, just wanted you to know" helps a lot. Eat well. Sleep. Avoid big decisions. If you need to be in a concentration space (work, study), let people know you may be tired.

## When it's NOT sub drop

Sometimes what looks like sub drop is:

- **A scene that crossed a non-negotiated limit.** If you feel something wasn't right, that's important information. Talk to the person. If you can't, talk to a trusted third party or a professional.
- **A pre-existing emotional trigger.** Sometimes a scene activates a memory or emotion that has nothing to do with the scene. Responsible practice includes knowing your triggers and negotiating them.
- **An unrelated life crisis.** Tiredness, sadness, and irritability also come from grief, changes, stress. Not every crash is post-scene.

## When to ask for professional help

- If the crash lasts more than a week
- If you think about harming yourself
- If the crash escalates in intensity with each scene
- If you have flashbacks or nightmares
- If the practice worsens a pre-existing condition (depression, anxiety, trauma)

A therapist with experience in alternative sexuality or kink-aware can help. The NCSF (National Coalition for Sexual Freedom) maintains a directory of kink-aware professionals in several countries: https://ncsfreedom.org/resources/kink-aware-professionals-directory/

In Paraguay and the region: the network of kink-aware professionals is growing. The maškaráda team can recommend contacts in Asunción if you need them.

## For someone accompanying a person with sub drop

If your partner (or someone close) is experiencing sub drop:

- **Don't minimize** ("it's just hormonal, it'll pass") — even if true, saying it that way doesn't help. Listen.
- **Don't abandon** — presence matters. A message "I'm thinking of you" can be enough.
- **Don't try to fix** — there's nothing to fix. Just be there.
- **Don't use the vulnerability for more scene** — sub drop is not an opportunity for more intensity. It is a moment for care.

## Community aftercare

At maškaráda, aftercare does not end when the event ends. The community is available to accompany you in the hours and days that follow. If you experience a significant sub drop, you can write to staff — no commitment, no cost.`,
  },

  "primera-fiesta": {
    title: "Your first party: what to expect and how to prepare",
    excerpt:
      "You decided to go. This is what happens: the dress code, entry, the spaces, the etiquette. A step-by-step guide so you arrive with the information you need.",
    body: `## Before you go

Before deciding to go to a party (like maškaráda's or any kink event in any city), there are some questions to ask yourself:

- **Am I comfortable with the idea of being in a space where anything can happen?** The party is not a show: it's an open space. Some people will be having scenes in public. If seeing intensity makes you uncomfortable, this is not your space (yet).
- **Do I have the emotional energy for a long night?** Parties usually start late (22:00) and run until 3-5am. If you've had a hard week, it's not your night.
- **Do I have someone to go with or at least someone to tell I'm going?** Going alone is fine, but the first time is better to have a friend you know or some contact.

## What to bring

**Clothing (follow the dress code).** Kink parties usually have a specific dress code. For maškaráda: dark, sexy, leather, lace, latex, fetish, fantasy, or just yourself. NO casual clothing (jeans, plain t-shirts, sweatpants, flip-flops). Entry can be denied for dress code — it's not personal, it's protocol.

**ID.** Entry is strictly 18+. No ID, no entry. No exceptions.

**Cash.** For tips, donations, or small purchases. Not all parties accept card.

**What you DON'T need to bring:** personal valuables, alcohol in excess, rigid expectations. Parties are not performances. They are space. What happens, happens.

## How to get there

Arrive early. Not because "the good stuff runs out" (it doesn't), but because the first hour is usually the most social: you arrive, you orient yourself, you see the space, you meet people with fresh heads. Arriving late puts you in an already-active space without time to acclimatize.

If you have a community contact (someone who invited you, a friend who already goes), let them know you've arrived. If you're going alone, the staff or "door" people (gatekeepers) are your first point of contact. They're there to help you.

## At arrival: door and check-in

At most events:

1. **They greet you at the door.** A staff member. Usually friendly, explains the basic rules, asks if you have questions.
2. **18+ confirmation.** ID in hand, no exceptions.
3. **They explain the space.** Where the bathroom is, where the bar/social area is, where the play zones are, where the aftercare room (if any) is, which zones are "look only" vs "you can interact".
4. **They clarify the rules.** Usually: no photos, no phones in play zones, safe words always respected, "no means no."
5. **They give you a wristband or marker** (at some parties) indicating: newbie, experienced, or role type. Not always — depends on the event.

Ask what you need. The door is a safe place to ask "what does this event do?" without commitment.

## During: how to move

**Start in the social zone.** The bar, the conversation area. People approach, talk, introduce themselves. No obligation to "see action" immediately. You can stay in the social zone all night and have had a good time.

**If you want to observe play zones,** ask before approaching a scene in progress. People in a scene may not be available to talk. Some scenes are "public" (the organizers present them), others are "open but intimate" (you can look, not interact). Ask staff which is which.

**If you want to participate,** usually there's an organizer. They know you, ask what interests you, introduce you to someone compatible. Organization is important — without it, scenes tend to be "between the same 5 people."

**If something makes you uncomfortable,** leave the zone. You don't have to end the party if something hit you. You can go to the bathroom, the aftercare area, the social zone, or leave. It's not drama.

**If someone specifically makes you uncomfortable,** tell staff. The community protects people from inappropriate behavior. The blocklist at maškaráda exists for a reason.

## When to leave

There's no "correct" time to leave. Some indicators:

- **Your body tells you it's enough** — tiredness, a sense of fullness, need for silence. Honor that.
- **You want a long conversation with someone** — that's worth more than another hour of party.
- **You have work tomorrow** — leaving before 2am keeps you functional. Staying until 5am leaves you dead the next day.

When you leave: say goodbye to whoever you want (not required), thank whoever invited you or the organizers, and go in peace. The after continues tomorrow: rest, water, food, silence if you need it.

## What NOT to do at your first party

- Don't arrive intoxicated. The community doesn't accept intoxicated people in play zones.
- Don't take photos or videos. Never. Even if you see something "instagrammable". Privacy is the law.
- Don't assume consent just because you're at the party. Every person is still a person.
- Don't harass someone you're interested in. If the interest isn't mutual, it's respected.
- Don't treat others' scenes as performance for your entertainment. They're real for the people living them.
- Don't try to "try everything" in one night. The first party is for getting acclimatized. The next ones are for exploring.

## After: integration

After your first party:

- **Process what you saw.** Sometimes a scene you observed hits you more than you expected. That's normal.
- **Talking helps.** With someone you trust, or with the community. Lived experience integrates better when shared.
- **If you don't go back:** that's fine too. The first party is not a sentence. It's an experience.`,
  },

  "negociacion": {
    title: "Negotiation 101: how to talk about what you want",
    excerpt:
      "Negotiation is the most important skill in kink. What you ask, what you don't ask, how to say yes and how to say no. A practical guide for conversations many people avoid.",
    body: `## Why negotiation is the center of everything

In kink, every consensual act is negotiated before. Not in the moment. Not by ambiguous gestures. Not "implied." It is talked about.

Negotiation is not sexy, not spontaneous, not "romantic" in the traditional sense. It is the foundation on which everything else is built. Without good negotiation, the most intense practice becomes abuse. With good negotiation, the simplest practice becomes deep.

## Before the conversation

Before negotiating a session or encounter, it's worth being clear about:

- **My own limits.** What do I know I don't want? What do I know I want to try? What am I curious about but don't know if I want it?
- **My physical and emotional needs.** Do I have any relevant injury, allergy, medical condition? Am I in a difficult emotional moment? Am I taking any medication that affects perception?
- **My experience level.** Is this my first time with this? My tenth? Do I have experience but it's been a while? Honesty about experience level is part of safety.

You don't need to have everything clear before talking. Negotiation IS the place where things get clarified.

## The conversation

A good negotiation is direct, specific, and respects the pace of both people. There's no single way, but some principles:

### 1. Start outside the scene

Pre-session negotiation happens dressed, sitting, with time. Not in the middle of excitement. Not in the car on the way to the event. Not by text when a person is distracted.

Some spaces where to negotiate:
- A pre-dinner
- A café or a call
- By text BEFORE the day (not the day, not in the moment)
- A written limits form (common at large events)

### 2. Use clear language

"I don't want X" is clear. "I don't like it much" is ambiguous. The more specific, the better.

Useful terms:

- **Yes / No / Maybe** — simple categories to start
- **Hard limit** (absolute limit) — "this never"
- **Soft limit** (soft limit) — "this only under these conditions"
- **Fantasy** (not necessarily want to do in reality) — "it excites me to think about, I don't know if I want to live it"
- **Curiosity** (want to explore) — "I've never done it, it calls my attention"
- **Previous experience** (already did it) — "I did it, I liked it, I'd like to repeat"
- **Afterwards** — "I need X minutes of aftercare / I need to eat / I need silence"

### 3. Ask, don't assume

People vary enormously. What one assumes "everyone knows" can be unique to her. Asking is care. Assuming is risk.

Useful questions to start:

- What do you like?
- What don't you like?
- Do you have anything that's an absolute limit for you?
- What do you need afterwards?
- Do you have any relevant medical condition?
- Is there anything you're curious about but haven't tried?
- Do you have any allergies (latex, oils, materials)?

### 4. Listen, not just ask

Negotiation is not a form. It's conversation. The person on the other side may have things to say that you didn't ask about. Give space. Listen. If the person takes time, wait. If they hesitate, don't pressure. If they say "I don't know", that's a data point: they don't know.

### 5. It's a continuous process

The first negotiation is not the last. People change. Limits expand or contract according to trust, experience, life. A good practice is to **re-negotiate periodically** — at the start of each new relationship, after important events, when something changes.

## "No" as data

"No" doesn't need explanation. If someone says "I don't want X", that's all you need to know. You don't have the right to "why?" You don't have to negotiate the "no." The "no" is accepted and appreciated.

The person who says "no" to something is also saying "yes" to other things. Hearing "no" as information about limits, not as personal rejection, is fundamental.

## Yes, but with care

There's a common pattern: "yes, but with care." It's valid. Specify what care. "With a condom?" "With a safe word?" "With someone trusted present?" Each care is a variable, not an absolute yes or no.

## When negotiations don't go well

Sometimes, negotiation reveals that two people aren't compatible. Not as people — as potential playmates. That's fine. One of the most valuable kink skills is knowing how to say "we're not compatible" without drama.

Sometimes, negotiation reveals that a person doesn't respect limits. That's a big red flag. Get out of there.

## After negotiation

Once you negotiate:

- **Write down the agreements.** Mentally or in writing. Especially for intense scenes, a written form is common practice.
- **Respect the agreements in the moment.** Negotiation is not optional in the middle of a scene.
- **After the scene, talk.** What worked, what didn't, what to repeat. That's feedback for next time.

## At maškaráda

The maškaráda organization promotes explicit negotiation. At events:

- There are staff who can mediate if two people don't know each other.
- Play zones are consensual. Nobody touches you without your word.
- Staff can intervene if they perceive something is non-consensual.
- If you have a bad negotiation experience, you can report to staff to block that person from future events.`,
  },

  "sub-drop": {
    title: "Sub drop, top drop and the post-scene crash",
    excerpt:
      "Hours or a day after an intense scene, a person can feel sadness, emptiness, or extreme tiredness. It's hormonal, not a sign of error. How to prepare, how to manage it, when to ask for help.",
    body: `## What is sub drop

"Sub drop" (or "submissive drop") is an emotional and physical crash that can occur hours or even a day after an intense scene. Typical symptoms:

- Sadness without identifiable cause
- Unexpected crying
- Extreme tiredness
- Feeling empty or disconnected
- Irritability
- Difficulty sleeping or sleeping too much
- Negative self-talk

Sub drop is NOT a sign that the scene went wrong. It is NOT that the person "isn't cut out for this." It is a normal neurochemical response: the body released oxytocin, dopamine, adrenaline, endorphins during the scene. When they drop, the nervous system needs to recalibrate. It is a hormonal process, not an emotional one in the sense of "regretting what happened."

## The equivalent for the giver: top drop

"Top drop" is the crash for the person giving the orders or performing the intense acts. Symptoms:

- Intense guilt ("did I hurt them?")
- Tiredness
- Feeling disconnected
- Repetitive thoughts about the scene
- Sometimes sadness without cause

Less discussed than sub drop but equally real. Whoever gives also processes hormones, also lives the intensity, also needs aftercare.

## Why it happens

The brain during an intense scene releases:

- **Adrenaline** — the alert state, the "rush"
- **Endorphins** — the body's natural opiates, euphoria
- **Oxytocin** — the "bonding hormone", sense of connection
- **Dopamine** — the reward system, anticipatory pleasure

During the scene, the body is bathed in these substances. After, the levels drop. The drop is hormonal. It's not psychological, not "regret," not "trauma." It's the body's normal response to the neurochemical change.

## How to prepare

**Before the scene:**

- Let your partner(s) know sub/top drop can happen. It's not a secret.
- Reserve time AFTER the scene to rest. Not to "go to work the next day."
- Have food prepared, water, blankets, a quiet place. Immediate aftercare is the first line of defense.

**During the scene:** Enjoy it. Sub drop happens because something was intense. Intensity is part of the value.

**Immediately after:**

- Post-scene conversation — what was good, what wasn't, what to repeat
- Comforting contact if both want it
- Water, light food
- Time: minimum 20-30 minutes of transition

**24-48 hours later:**

- If you feel a crash, DON'T panic. It's expected.
- Maintain contact with your partner(s). A message "I'm feeling a crash, don't worry, just wanted you to know" helps a lot.
- Eat well. Sleep. Avoid big decisions (your brain isn't at its best).
- If you need to be in a concentration space (work, study), let people know you may be tired.

## When it's NOT sub drop

Sometimes what looks like sub drop is:

- **A scene that crossed a non-negotiated limit.** If you feel something wasn't right, that's important information. Talk to the person. If you can't, talk to a trusted third party or a professional.
- **A pre-existing emotional trigger.** Sometimes a scene activates a memory or emotion that has nothing to do with the scene. Responsible practice includes knowing your triggers and negotiating them.
- **An unrelated life crisis.** Tiredness, sadness, and irritability also come from grief, changes, stress. Not every crash is post-scene.

## When to ask for professional help

- If the crash lasts more than a week
- If you think about harming yourself
- If the crash escalates in intensity with each scene
- If you have flashbacks or nightmares
- If the practice worsens a pre-existing condition (depression, anxiety, trauma)

A therapist with experience in alternative sexuality or kink-aware can help. The NCSF (National Coalition for Sexual Freedom) maintains a directory of kink-aware professionals in several countries: https://ncsfreedom.org/resources/kink-aware-professionals-directory/

In Paraguay and the region: the network of kink-aware professionals is growing. The maškaráda team can recommend contacts in Asunción if you need them.

## For someone accompanying a person with sub drop

If your partner (or someone close) is experiencing sub drop:

- **Don't minimize** ("it's just hormonal, it'll pass") — even if true, saying it that way doesn't help. Listen.
- **Don't abandon** — presence matters. A message "I'm thinking of you" can be enough.
- **Don't try to fix** — there's nothing to fix. Just be there.
- **Don't use the vulnerability for more scene** — sub drop is not an opportunity for more intensity. It is a moment for care.

## Community aftercare

At maškaráda, aftercare does not end when the event ends. The community is available to accompany you in the hours and days that follow. If you experience a significant sub drop, you can write to staff — no commitment, no cost.`,
  },

  "glosario": {
    title: "Glossary of kink and BDSM terms",
    excerpt:
      "Vocabulary of the community: SSC, RACK, aftercare, scene, dynamic, edge, subspace, top, bottom, switch. Quick reference, no judgment.",
    body: `## The vocabulary of kink and BDSM

A non-exhaustive glossary of terms used in the community, in plain language. Some terms have different meanings in different contexts — when in doubt, ask.

### Safety and consent

- **SSC (Safe, Sane, Consensual)** — A safety framework: the activities you do are safe, you are in a sane state to evaluate them, and both parties consent. Critics note that "sane" is subjective; the framework has been complemented by RACK.
- **RACK (Risk-Aware Consensual Kink)** — A safety framework that explicitly acknowledges that all activities carry some risk. What matters is awareness of the risk, communication, and consent.
- **PRICK (Personal Responsibility, Informed Consensual Kink)** — A framework that emphasizes each person's individual responsibility for their own decisions within the practice.
- **Safe word** — A previously agreed word (or signal) that stops an activity immediately, without question. The most common systems are: "red" (stop) / "yellow" (ease up) / "green" (keep going).
- **Traffic light system** — 🟢 green (continue), 🟡 yellow (ease up), 🔴 red (stop). The most-used safe-word system in the community.
- **Hard limit** — Something you absolutely will not do, under any circumstances, with anyone. Negotiated before any scene.
- **Soft limit** — Something you might do, with care, under specific conditions, with someone you trust.
- **Consent** — Active, informed, enthusiastic, reversible agreement to a specific activity. Consent can be withdrawn at any time.
- **Affirmative consent** — The model where the absence of "no" is not enough; you need an active "yes."

### People and roles

- **Top / Dom / Dominant** — The person who leads, gives orders, or performs the acts of intensity in a scene.
- **Bottom / Sub / Submissive** — The person who receives, follows orders, or experiences the intensity.
- **Switch** — A person who plays both roles, in different scenes or in different moments of the same scene.
- **Rigger** — The person who ties (in rope play).
- **Rope top / rope bottom** — Roles specifically in rope play.
- **Domme** — Female dominant. The word is used regardless of the gender of the person addressed.
- **Mistress / Master** — Titles used in some dynamics, typically formal power exchange.
- **Sadist** — A person who enjoys giving (or simulating) intense sensations (pain, etc.) in a consensual context.
- **Masochist** — A person who enjoys receiving intense sensations.
- **Sadomasochist** — Both, in different moments or with different partners.
- **Voyeur** — A person who enjoys watching others' scenes.
- **Exhibitionist** — A person who enjoys being watched during scenes.

### Scenes and dynamics

- **Scene** — A bounded period of play, from start to finish, with its own negotiation and aftercare.
- **Play** — The practice itself, in any of its forms. "Let's play" = "let's have a scene."
- **Dynamic** — The relationship pattern between two people, especially in power exchange. "We have a 24/7 dynamic" = "we live the D/s in everyday life, not only in scenes."
- **Protocol** — Established rules of behavior within a dynamic or scene. E.g., "the submissive doesn't speak unless spoken to."
- **Edge / Edging** — Bringing a person to the edge of climax (or another intense state) and holding them there. Play that hovers without crossing the threshold.
- **Drop** — A sudden emotional or physical change. "Sub drop" (in the submissive), "top drop" (in the dominant).
- **Subspace** — An altered state of consciousness that the submissive person can enter during intense scenes. Often described as meditative, floating, or dissociative.
- **Topspace** — The equivalent for the dominant: an altered state of focus, control, flow.
- **Aftercare** — Care after a scene. Part of the practice, not an extra. See the dedicated guide.
- **Safeword** — see Safety.
- **Hard limits / Soft limits** — see Safety.

### Common practices

- **Bondage** — Physical restraint. With rope, leather cuffs, tape, etc.
- **Shibari / Kinbaku** — Japanese rope bondage. Aesthetic, sensual, can be erotic. See the activities page.
- **Impact play** — Striking the body with hand, paddle, flogger, crop, cane. Each implement has different sensations.
- **Sensation play** — Temperature (wax, ice), textures (satin, leather), electricity (TENS units, violet wands), sensory deprivation (blindfolds, earplugs).
- **Role play** — Acting out a scene with roles. Doctor/patient, teacher/student, boss/employee, etc. Limited only by mutual agreement.
- **Service** — Acts of service in a D/s context. Cooking, cleaning, kneeling, serving drinks, etc.
- **Worship** — Devotional practices. Foot worship, body worship, etc.
- **Findom (Financial domination)** — A dynamic where the submissive gives money (or "tribute") to the dominant. Not for everyone; many kink communities are skeptical of it.
- **Pet play** — A dynamic where one person takes the role of an animal (puppy, kitten, pony, etc.) and the other takes the role of owner/handler.
- **Age play** — A dynamic where one person takes a younger role (not necessarily literal age; it can be a "little" dynamic). NO minors involved. Always adults.
- **CNC (Consensual Non-Consent)** — A pre-negotiated scene where the submissive "resists" and the dominant "overcomes" that resistance. The negotiation is very detailed. Not for beginners.

### Slang of the community

- **Daddy / Mommy / Sir / Ma'am** — Titles used in some dynamics. Not all. Never assumed.
- **Little / Babygirl** — Role in age play dynamics. Adult.
- **Good girl / Good boy** — Praise in D/s contexts. Not for everyone.
- **Brat** — A sub who "misbehaves" to provoke consequences. A specific play style.
- **Brat tamer** — The top who "punishes" the brat.
- **Scene** — see above. Also: "to scene" = to play.
- **Play party** — A social event where people have scenes (in dedicated zones).
- **Munch** — A social meetup without play. Coffee + conversation. The most amable entry door.
- **Dungeon** — A space equipped for play. Some dungeons are permanent (commercial), some are temporary (at events).
- **D/s, M/s, D/s/M** — Abbreviations for Dominant/submissive, Master/slave, etc.

### Community and culture

- **Kink-aware** — A professional, space, or community that is informed about and respectful of kink. "Kink-aware therapist" = a therapist who knows the community and doesn't pathologize.
- **Vanilla** — Non-kink. "Vanilla relationship" = a relationship without kink dynamics.
- **Kink-shaming** — Stigmatizing kink or the people who practice it. Kink-aware communities reject kink-shaming.
- **Heteronormativity** — The assumption that everyone is heterosexual and cis. The kink community has historically been more inclusive, but heteronormativity is still a force to push back on.
- **Consent culture** — The practice of centering consent in all interactions, not only in scenes.

## How to use this glossary

This is a reference, not a list to memorize. Words will come up in conversations, in the guides, in the FAQ. If you don't know one, ask. There is no shame in asking. The community values honesty over performance.`,
  },
};
