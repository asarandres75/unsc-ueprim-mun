/*
  ============================================================
  SITE CONTENT: edit this file to change what the website says
  ============================================================
  Everything delegates read on the site lives here. Change the text
  between the quotes, save, commit to GitHub and Vercel redeploys
  the site on its own in about a minute.
*/
window.SITE = {
  edition: 'IV Edition 2026–2027',
  model: 'UEPRIM-MUN',

  /* ---------- CONTACTS ---------- */
  contacts: [
    { role: 'Chair', name: 'Jared Montero Tenesaca', email: 'st-jmontero@ueprim.edu.ec' },
    { role: 'Co-Chair', name: 'Andrés Aguilar Rizzo', email: 'st-aaguilar17@ueprim.edu.ec' },
    { role: 'Secretary', name: 'Joaquín Tapia', email: 'st-jtapia3@ueprim.edu.ec' },
  ],

  /* ---------- EVENTS (Home) ----------
     Shown on Home until the Presidency adds its own events from
     Presidency Only, then Events. */
  events: [
    { title: 'Day 18: Strategy session', when: 'Aula 18, 3:15 to 4:15 PM',
      text: 'Roll call and submissions, a second look at Topics A and B together with the new website, a short presentation on how national interests shape negotiations, individual strategy meetings with the Chair and Co-Chair, a diplomatic roundtable, and a short class for the P5 on how the Motion to exercise the VETO works.' },
  ],

  /* ---------- DOCUMENTS ----------
     Each line is [title, file]. Cover thumbnails live in /thumbs with the same name. */
  documents: [
    { group: 'Start here', items: [
      ['Security Council Handbook', 'docs/unsc-handbook.pdf'],
      ['Handbook references', 'docs/handbook-references.pdf'],
      ['Estatuto General Oficial 2026–2027', 'docs/estatuto-general-oficial.pdf'],
    ]},
    { group: 'Guides', items: [
      ['Opening Speech Writing Guide', 'docs/opening-speech-guide.pdf'],
      ['Position Paper Writing Guide', 'docs/position-paper-guide.pdf'],
      ['Resolution Guide', 'docs/resolution-guide.pdf'],
      ['Draft Resolution (DRES) Guide', 'docs/draft-resolution-guide.pdf'],
      ['Declaration Guide', 'docs/declaration-guide.pdf'],
      ['Clause phrases', 'docs/clause-phrases.pdf'],
      ['All Motions and Points', 'docs/motions-and-points-full.pdf'],
      ['Motions and Points (short class version)', 'docs/motions-and-points-short.pdf'],
    ]},
    { group: 'Examples', items: [
      ['Position paper example: Algeria', 'docs/position-paper-example-algeria.pdf'],
      ['Opening speech example: Lesotho', 'docs/opening-speech-example-lesotho.pdf'],
      ['Country research example: China', 'docs/country-research-china.pdf'],
      ['Draft Resolution B example', 'docs/draft-resolution-example.pdf'],
      ['Declaration example: Russian Federation', 'docs/declaration-example-russia.pdf'],
      ['Russian declaration with Presidency notes', 'docs/declaration-russia-notes.pdf'],
      ['Resolution example (Spanish)', 'docs/resolution-example-spanish.pdf'],
      ['Multilateral declaration example (Spanish)', 'docs/multilateral-declaration-example-spanish.pdf'],
    ]},
    { group: 'Templates', items: [
      ['Position paper template', 'docs/position-paper-template.docx'],
      ['Resolution format', 'docs/resolution-format.docx'],
      ['Declaration format', 'docs/declaration-format.pdf'],
      ['Statement on the Exercise of the VETO', 'docs/veto-statement-format.pdf'],
    ]},
    { group: 'MOCK SESSION #1: The Situation in Myanmar', items: [
      ['The Situation in Myanmar, background guide', 'docs/myanmar-background.pdf'],
      ['UNSC Myanmar Newspaper', 'docs/myanmar-newspaper.pdf'],
      ['Myanmar Draft Resolution A', 'docs/myanmar-resolution-a.pdf'],
      ['Myanmar Draft Resolution A with Presidency notes', 'docs/myanmar-resolution-a-notes.pdf'],
      ['Myanmar Draft Resolution B', 'docs/myanmar-resolution-b.pdf'],
      ['Myanmar Draft Resolution B with Presidency notes', 'docs/myanmar-resolution-b-notes.pdf'],
    ]},
    { group: 'MOCK SESSION #2: Military Competition in Outer Space', items: [
      ['Introduction to the topic', 'docs/outer-space-topic.pdf'],
    ]},
    { group: 'Other', items: [
      ['Day 18 presentation', 'docs/day-18-presentation.pdf'],
      ['Strategy session instructions', 'docs/strategy-session-instructions.pdf'],
      ['Resolution with flaws', 'docs/workshop-resolution-with-flaws.pdf'],
      ['Declaration with flaws', 'docs/workshop-declaration-with-flaws.pdf'],
      ['Resolution with flaws: solutions', 'docs/resolution-flaws-solutions.pdf'],
      ['Declaration with flaws: solutions', 'docs/declaration-flaws-solutions.pdf'],
    ]},
  ],

  /* ---------- PROCEDURE ---------- */
  procedure: {
    intro: 'Procedure is what turns fifteen people with strong opinions into a Council that can actually decide something. You do not need to know every rule by heart on day one, but you should know the ones below well enough to use them without looking. When in doubt, raise a Point of Parliamentary Inquiry and ask. That is exactly what it is for.',
    flow: [
      ['Roll call', 'The Secretary calls each delegation. Answer “present” if you want the freedom to abstain later, or “present and voting” if you are committing to vote for or against every substantive item.'],
      ['Setting the agenda', 'The first motion of the model decides whether the Council opens with Topic A or Topic B.'],
      ['Guest Speakers’ List', 'Delegations deliver their 1:30 opening speeches. Whenever a caucus ends, the Council returns here.'],
      ['Caucuses', 'Moderated caucuses focus the debate on one sub-topic, while unmoderated caucuses let you leave your seat to negotiate and build blocs.'],
      ['Drafting', 'Blocs turn their ideas into working papers, which become draft resolutions once submitted to the Chair.'],
      ['Presentation and amendments', 'Submitters read the operative clauses, answer questions and the Council debates friendly and unfriendly amendments.'],
      ['Voting procedure', 'The room closes, drafts are voted in the order presented and a single P5 “against” can stop a draft.'],
    ],
    points: [
      ['Point of Order', 'Used when a delegate has not followed the rules of procedure. In this Council you never shout it out. You write it on a note and send it to the Chair through the Pager, saying which rule was broken and by whom, and the Chair answers at the right moment so no speaker is ever interrupted.', '“Point of Order: the delegate of [country] used first-person pronouns.”'],
      ['Point of Personal Privilege', 'For a personal discomfort that affects your participation, such as not being able to hear the speaker.', '“Point of Personal Privilege: could the speaker please raise their voice?”'],
      ['Point of Parliamentary Inquiry', 'A question to the Chair about the rules of procedure, for example which motion is on the floor. It cannot interrupt a speaker.', '“Point of Parliamentary Inquiry: is the Council voting on Draft Resolution A or B?”'],
      ['Point of Information', 'A question of up to 45 seconds to the previous speaker, mostly after speeches and during debate. If the question challenges someone’s sources, the Fact-Checker reviews them and reports to the Chair, who tells the Council the result.', '“Point of Information: does the delegation have evidence to support that claim?”'],
      ['Right of Reply', 'For when your delegation has been directly offended or your country’s integrity attacked. Raise your placard and ask for it out loud after the speech ends, never during it. If the Chair accepts, you get 45 seconds, and each delegation gets only one reply per exchange.', ''],
      ['Right of Rejoinder', 'Lets the delegation that received a Right of Reply answer one final time, only if the Chair allows it. It lasts 30 seconds and closes the exchange.', ''],
    ],
    motions: [
      ['Motion to Set the Agenda', 'Always the first motion of the model. It fixes which topic is debated first.', '“Motion to Set the Agenda to Topic A: Combating State-Sponsored Cyberattacks Against Critical National Infrastructure.”'],
      ['Motion to Open the Guest Speakers’ List', 'Raised right after the agenda is set. After your speech you can yield the remaining time to the Chair, to another delegate or to a round of extraordinary questions.', ''],
      ['Motion for a Moderated Caucus', 'The Chair gives the floor in turns on a specific sub-topic. You must state the total time, the speaking time and the topic.', '“Motion for a Moderated Caucus of 10 minutes, with 60 seconds speaking time per delegate, on the topic of cybersecurity responses in conflict zones.”'],
      ['Motion for an Unmoderated Caucus', 'Formal debate pauses so delegates can stand up and negotiate freely for the time proposed.', '“Motion for an Unmoderated Caucus of 10 minutes and 30 seconds.”'],
      ['Motion to Hold a Round of Extraordinary Questions', 'Opens a period of questions to the speaker after their speech. State how many questions, how long to ask and how long to answer.', '“Motion to Hold a Round of Extraordinary Questions with 2 questions per delegate, 45 seconds to state the question and 1 minute for the speaker to answer.”'],
      ['Motion for a Subsequent Question', 'If the answer to your question was not clear, the Chair asks you and you may ask one follow-up that is related to the first.', '“No, Motion for a Subsequent Question.”'],
      ['Motion for a Tour de Table', 'Every delegation is called once, in order, to state its position briefly. Great for quickly mapping where the room stands.', '“Motion for a Tour de Table on the achievability of Draft Resolution A, with 60 seconds speaking time per delegate.”'],
      ['Motion for a Consultation of the Whole', 'A self-moderated debate where the speaker picks who goes next, while everyone stays seated.', '“Motion for a Consultation of the Whole on international intervention dilemmas, of 15 minutes.”'],
      ['Motion to Move into Voting Procedure', 'Ends debate and starts the vote. Once it passes, no more caucuses or debate motions are accepted.', '“Motion to move into voting procedure.”'],
      ['Motion to Vote by Clause', 'Splits a draft so each operative clause is voted on separately, useful when the room only disagrees on part of a text.', ''],
      ['Motion to Request a Roll Call Vote', 'Each delegation votes out loud when called instead of raising placards, leaving a public record of every vote.', ''],
      ['Motion to Explain the Vote', 'Lets a delegation justify its vote right after voting, in 45 seconds.', ''],
      ['Motion to Adjourn the Session', 'Formally ends the session, normally at the close of the day.', ''],
    ],
    documents: [
      'A resolution is a working paper until it is submitted to the Chair. From then on it is a draft resolution (DRES) until it is presented and voted on. Submitters read the operative clauses and present the draft in under two minutes, a Question and Answer session follows, and then the Chair recognizes speakers for and against.',
      'Amendments can only change operative clauses. A friendly amendment is approved by all the submitters and is added automatically without a vote. An unfriendly amendment is one the submitters do not all accept, so it needs one speaker for, one against and a majority vote before it goes into the text.',
      'A declaration, whether unilateral, bilateral or multilateral, states the official position and commitments of one or more States. It is read in session and formally acknowledged by the Chair, with no vote and no amendments.',
    ],
    voting: [
      'To begin voting, a delegate says “Motion to move into voting procedure”, which needs a majority. Drafts are voted on in the order they were presented, and delegations vote in favour, against, or abstain, and you can only abstain if you answered “present” at roll call.',
      'Procedural matters need nine votes in favour from any members. Draft resolutions are substantive matters, so they need nine votes in favour and no negative vote from a permanent member.',
      'That last condition is the VETO. A P5 “against” stops a draft no matter how many votes it received, although an abstention by a permanent member is not a VETO and the VETO never applies to procedural matters. When it is used, the permanent member says “Motion to exercise the VETO power”, the Chair announces that the draft is not adopted, and the member then delivers its Statement on the Exercise of the VETO at the podium in under two minutes. The submitters may revise the draft together with that member and resubmit it if the Chair approves.',
    ],
    conduct: [
      'Speak in the third person at all times and refer to others as “the delegate of” or by their country. “I think” becomes “the delegation believes”. Messages to the Chair and to other delegates go through the Pager service only and must be about the model, because inappropriate content is sanctioned.',
      'Formal dress is required during the official model, though not during PRE-MUN. Red, fuchsia and orange are not allowed, and neither are t-shirts, shorts, caps or sneakers. Internet and devices are limited and monitored during formal sessions.',
      'Under the Estatuto, a written warning (amonestación escrita) is given to delegations that repeatedly break procedure or disturb the order of the room. Two written warnings add up to a formal warning (amonestación formal), which means leaving the session for a while, and a formal warning can also be given straight away for a serious lack of respect.',
    ],
  },

  /* ---------- PRE-MUN SESSIONS ---------- */
  sessions: {
    days: [
      { day: '1', title: 'Welcome to the Council', text: 'Our first official training class. We talked about what a Model United Nations is, what makes the Security Council different from every other committee, and the basic difference between a point and a motion.' },
      { day: '2', title: 'Voting procedures and the handbook', text: 'Every delegate received their official delegation, and we walked through the handbook section by section. Then we looked at how a debate flows from opening to voting and practised a moderated caucus and a vote on a fictional resolution.', docs: ['docs/unsc-handbook.pdf'] },
      { day: '3', title: 'Motions, points and the placard', text: 'A guided class on the essential motions and points, with real examples of when you should interrupt and when you should wait. We practised the placard protocol and finished with a short live session where the Chair made deliberate mistakes to see who would catch them with a Point of Order.', docs: ['docs/motions-and-points-short.pdf'] },
      { day: '4', title: 'Researching your country', text: 'How to find your government’s real position using official statements, UN documents from the UN Library and reliable news. We closed with a ten-minute challenge to find one statistic and turn it into a hook and a stance.', docs: ['docs/opening-speech-guide.pdf'] },
      { day: '5', title: 'Drafting the Topic A opening speech', text: 'Feedback on the first drafts, a short tutorial on the World Factbook and the UN Library, and time to write a complete opening speech with hook, introduction, stance, data and solutions.' },
      { day: '6', title: 'Delivering your speech', text: 'Posture, eye contact, pacing and gestures, plus small writing tricks like active verbs and smooth transitions. Everyone delivered their Topic A speech and received individual feedback on content and delivery.' },
      { day: '7', title: 'Speech practice and the position paper', text: 'Speeches under formal committee conditions with peer and mentor evaluation, followed by a full mock session of Topic A and an introduction to the four-part position paper.', docs: ['docs/position-paper-guide.pdf'] },
      { day: '8–9', title: 'Writing the position paper', text: 'We reviewed the document header, the formatting rules and APA 7 citations using a paper from a previous model, then checked whether each delegate’s argument really matched their country’s stance. Everyone left with at least the introduction written.', docs: ['docs/position-paper-example-algeria.pdf', 'docs/position-paper-template.docx'] },
      { day: '10–13', title: 'Cyberattacks mini-simulation and resolution workshop', text: 'A 45-minute mini-session on cyberattacks against critical infrastructure where delegates practised the Guest Speakers’ List and rounds of extraordinary questions, more work on position papers for both topics, and a first workshop on how resolutions and working papers are built.', docs: ['docs/resolution-guide.pdf'] },
      { day: '14–16', title: 'Mock Simulation #1: Myanmar', text: 'Our first full simulation over three sessions, on the protection of civilians, ethnic conflict and the restoration of democratic governance in Myanmar. It closed with a Tour de Table, two competing draft resolutions, one from Haiti and the United States and one from China, and a formal vote.', docs: ['docs/myanmar-background.pdf', 'docs/myanmar-resolution-a.pdf', 'docs/myanmar-resolution-b.pdf'] },
      { day: '17', title: 'Advanced resolution writing and the VETO', text: 'Feedback on both Myanmar resolutions, a class on resolutions, declarations and amendments, the VETO and how it is presented, and a workshop where groups found and fixed the flaws in real clauses.', docs: ['docs/draft-resolution-guide.pdf', 'docs/declaration-guide.pdf', 'docs/veto-statement-format.pdf'] },
      { day: '18', title: 'Strategy session', text: 'Individual and small-group strategy meetings to refine opening speeches and prepare for specific voting scenarios, a second look at Topics A and B and the new website, a presentation on how national interests shape negotiations, a diplomatic roundtable, and a short class for the P5 on how the Motion to exercise the VETO works.', docs: ['docs/day-18-presentation.pdf', 'docs/strategy-session-instructions.pdf', 'docs/veto-statement-format.pdf'] },
      { day: '19–20', title: 'Mock Simulation #2: Military Competition in Outer Space', docs: ['docs/outer-space-topic.pdf'], text: 'Outer space has become an increasingly important place for military and political competition. As nations expand their anti-satellite capabilities (ASAT), concerns arise regarding the potential escalation of an arms race, the generation of orbital debris and the vulnerability of essential satellite infrastructure, including telecommunications, navigation and emergency response systems.' },
      { day: '21', title: 'Mock #2 feedback, diplomatic strategy and persuasive arguments', text: 'We review how each delegation performed in the second mock simulation and how its resolutions held up, then move into an interactive workshop on diplomatic influence, strategic negotiation, persuasive argumentation, national interests and consensus-building. Delegates then apply these techniques to the official UNSC topics to prepare for the conference.', upcoming: true },
    ],
  },

  /* Presidency-only files (served from /private, only after the Presidency code is entered). */
  privateFiles: [
    { group: 'Session plans', items: [
      ['Day 2 session plan', 'day-2-session-plan.pdf'], ['Day 3 session plan', 'day-3-session-plan.pdf'], ['Day 4 session plan', 'day-4-session-plan.pdf'],
      ['Day 5 session plan', 'day-5-session-plan.pdf'], ['Day 6 session plan', 'day-6-session-plan.pdf'], ['Day 7 session plan', 'day-7-session-plan.pdf'],
      ['Day 9 session plan', 'day-9-session-plan.pdf'], ['Day 14 session plan (Myanmar I)', 'day-14-session-plan.pdf'], ['Day 15 session plan (Myanmar II)', 'day-15-session-plan.pdf'],
      ['Day 16 session plan (Myanmar III)', 'day-16-session-plan.pdf'], ['Day 17 session plan (resolution writing)', 'day-17-session-plan.pdf'],
      ['Day 18 session plan (strategy session)', 'day-18-session-plan.pdf'],
    ]},
    { group: 'Evaluation and workshops', items: [
      ['Delegate evaluation rubric', 'delegate-evaluation-rubric.pdf'],
      ['Workshop: resolution with flaws', 'workshop-resolution-with-flaws.pdf'],
      ['Workshop: declaration with flaws', 'workshop-declaration-with-flaws.pdf'],
      ['Seating plan', 'seating-plan.png'],
      ['Day 18 room layout', 'room-layout-day-18.png'],
    ]},
    { group: 'Feedback', items: [
      ['Opening speech feedback (Topic A)', 'opening-speech-feedback.pdf'],
      ['Speech feedback: France, Latvia, Russia, United States', 'speech-feedback-france-latvia-russia-usa.pdf'],
    ]},
    { group: 'Delegate submissions', items: [
      ['Position paper: China', 'position-paper-china.pdf'],
      ['Position paper: DR Congo', 'position-paper-drc.pdf'],
      ['Position paper: Haiti', 'position-paper-haiti.pdf'],
      ['Position paper: Pakistan', 'position-paper-pakistan.pdf'],
      ['Opening speech: China, Topic A', 'opening-speech-china-a.pdf'],
      ['Opening speech: China, Topic B', 'opening-speech-china-b.pdf'],
      ['Opening speech: DR Congo, Topic B', 'opening-speech-drc-b.pdf'],
      ['Opening speech: Haiti, Topic B', 'opening-speech-haiti-b.pdf'],
      ['Opening speech: Pakistan, Topic B', 'opening-speech-pakistan-b.pdf'],
    ]},
  ],
};
