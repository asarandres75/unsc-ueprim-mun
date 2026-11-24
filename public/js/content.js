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
  institution: 'Bilingual Private Education Unit “Principito & Marcel Laniado de Wind”',

  /* ---------- DAIS / CONTACT ---------- */
  dais: [
    { name: 'Jared Montero Tenesaca', role: 'President of the Security Council', email: 'st-jmontero@ueprim.edu.ec',
      blurb: 'Jared chairs the Council, rules on motions and points, and has the final word on procedure during session. Write to him about anything that touches the debate itself or your evaluation.' },
    { name: 'Andrés Aguilar Rizzo', role: 'Vice-President of the Security Council', email: 'st-aaguilar17@ueprim.edu.ec',
      blurb: 'Andrés co-chairs every session and runs most of the PRE-MUN training. He is the person to ask about speeches, position papers, resolutions and the documents on this site.' },
    { name: 'Joaquín Tapia', role: 'Secretary of the Security Council', email: 'st-jtapia3@ueprim.edu.ec',
      blurb: 'Joaquín keeps the roll, the speakers’ list and the paperwork moving. Send him your submitted documents, attendance questions and anything about deadlines.' },
  ],

  /* ---------- HANDBOOK ---------- */
  handbook: {
    pdf: 'docs/unsc-handbook.pdf',
    letter: {
      greeting: 'Distinguished delegates of the Security Council,',
      paragraphs: [
        'It is of great honor to address you as Chair of the United Nations Security Council at the 2026–2027 IV Internal Model of the United Nations. On behalf of the Council, I extend my warmest greetings and express my genuine excitement to engage with your world views, dedication and commitment to the human rights issues we will confront together in the coming days.',
        'In this simulation, we will explore the pressing security challenges facing our world today that require the necessary approaches to defend your perspectives. Throughout our sessions in the Council, I encourage you to participate actively in debate, challenge oppositions with diplomacy and collaborate in blocs to build consensus. Most importantly, I expect you to approach discussions with integrity, empathy and a desire to advance international peace and security, proposing solutions that promote accountability, inclusivity and sustainability.',
        'I am confident that each of you will bring unique insights and valuable experiences to this Council. I have every faith in the critical thinking and creativity you will bring to our debates. The Council serves as a space to reflect on our shared commitment to a world where peace and security is maintained.',
        'I wish you all the greatest success at this IV Internal Model of the United Nations. May your voices inspire the change that we need to see in the world!',
      ],
      closing: 'With deep gratitude and consideration,',
      signers: [
        ['Jared Montero', 'President of the Security Council'],
        ['Andrés Aguilar', 'Vice-President of the Security Council'],
        ['Joaquín Tapia', 'Secretary of the Security Council'],
      ],
    },
    intro: [
      { h: 'What is the Security Council?', p: [
        'The United Nations Security Council (UNSC) is one of the six main organs of the United Nations and holds primary responsibility for the maintenance of international peace and security (Article 24 of the Charter of the United Nations). It is the only organ whose decisions are legally binding on all Member States, which agree to accept and carry out its decisions under Article 25 of the Charter.',
        'The Council determines the existence of any threat to the peace, breach of the peace or act of aggression and decides which measures must be taken in response, from calling on the parties to settle a dispute peacefully to imposing sanctions or authorizing the use of force. Unlike other organs, it must be able to function continuously, so it can meet at any time whenever peace is threatened.',
      ]},
      { h: 'Structure of the Security Council', p: [
        'The Council “shall consist of fifteen Members of the United Nations” (United Nations, 1945). Five are permanent members (P5): the People’s Republic of China, the French Republic, the Russian Federation, the United Kingdom of Great Britain and Northern Ireland and the United States of America. The other ten are non-permanent members, elected by the General Assembly for two-year terms, with retiring members not being able to be immediately re-elected.',
        'The UNSC is supported by subsidiary organs (Article 29), such as its sanctions committees, the Counter-Terrorism Committee (CTC) and the Military Staff Committee, and it supervises peacekeeping operations and special political missions in the field. States that are not members of the Security Council may take part, without the need to vote, in discussions that specially affect their interests.',
      ]},
      { h: 'Main functions of the Security Council', p: [
        'Under the Charter, the Council maintains international peace and security, investigates any situation that might lead to international friction, recommends ways of settling disputes, calls on Member States to apply economic sanctions and other measures that do not involve the use of force (Article 41), takes military action against an aggressor, plans a system to regulate armaments and recommends the admission of new members to the General Assembly (Article 4).',
        'Its powers go further than any other organ. Its resolutions bind all 193 Member States and not only the fifteen seated at the table. It can impose asset freezes, travel bans and arms embargoes on States, groups or individuals, supervised by a sanctions committee and a panel of experts. It creates, renews and ends the mandates of peacekeeping operations and may authorize multinational forces led by Member States. And a negative vote by any permanent member, the VETO, blocks the adoption of a draft resolution on a substantive matter (Article 27).',
      ]},
    ],
    topics: [
      {
        letter: 'A',
        title: 'Combating State-Sponsored Cyberattacks Against Critical National Infrastructure',
        quote: '“Episodes of cyber warfare between states already exist. What is worse is that there is no regulatory scheme for that type of warfare... the next war will begin with a massive cyber attack to destroy military capacity... and paralyse basic infrastructure such as the electric networks.”',
        quoteBy: 'Secretary-General António Guterres, 2018',
        body: [
          'The Critical National Infrastructure (CNI) includes the physical and digital networks that provide a society with electricity, clean water, healthcare, transport, communications and financial services (Satola, 2007). As these public services increasingly depend on digital systems, they have become a target for hostile actors. Rather than launching traditional military strikes, some governments now use computer network operations to disable foreign power grids, hospitals or communication systems from abroad, causing serious damage while remaining below the brink of open conflict (Chen, 2026). The international community saw an early example in April and May 2007, when massive cyberattacks disrupted public and private networks across the Republic of Estonia. Later, in December 2015, an attack on Ukrainian power companies left around 230,000 people without electricity, the first confirmed case of a cyberattack causing a national power outage.',
          'Since then, operations attributed to States have grown in scale and ambition. The NotPetya malware (2017) spread from Ukraine to hospitals, ports and companies worldwide, and the attack against the KA-SAT satellite network on 24 February 2022, attributed to the Russian Federation by the European Union, the United Kingdom and the United States, disrupted communications across Europe at the beginning of the invasion of Ukraine. In 2024, United States agencies warned that actors sponsored by the People’s Republic of China (known as “Volt Typhoon”) had pre-positioned themselves inside energy, water and transport networks to disrupt them in a future crisis. All the States accused have rejected these allegations.',
          'The biggest obstacle for the Security Council is proving who is responsible for an attack. Hackers can hide their tracks by routing operations through servers located in unaffiliated third countries or by using criminal groups as proxies, which makes it difficult to establish the legal responsibility of a government (Melzer, 2011). As a result, Member States disagree on how the United Nations should respond and at what point a cyberattack becomes a use of force under Article 2 of the Charter, or an armed attack that justifies self-defence under Article 51. While some States argue that disabling a country’s entire power grid is as dangerous as a physical attack, others reject binding global rules and insist on sovereign control over their own networks without any external interference (Myers, 2020).',
          'Because of these divisions, progress has come mostly through non-binding agreements negotiated outside the Council. In 2015, the Group of Governmental Experts agreed on eleven voluntary norms of responsible State behaviour, later approved by the General Assembly, including the commitment not to damage CNI. The Open-Ended Working Group (2021–2025) built on this framework and led to the creation, by General Assembly resolution 80/16, of a permanent Global Mechanism on ICT Security, which began its work in 2026 under the chairmanship of El Salvador (Diplo, 2026). The Security Council has addressed the issue only partially, with resolution 2341 (2017) calling on States to protect critical infrastructure against attacks by violent actors, and it held its first formal open debate on cybersecurity in June 2021. Meanwhile, regional organizations such as the European Union have adopted their own measures, including cyber sanctions and rules to protect submarine cables and energy grids (Kinder, 2026).',
          'Delegates must therefore decide whether the Council should treat severe cyberattacks against critical infrastructure as threats to international peace and security, how allegations could be made credible and how to protect developing States that lack the capacity to defend their own networks, without duplicating the work of the Global Mechanism or limiting legitimate national security interests.',
        ],
        links: [
          ['United Nations Office for Disarmament Affairs, ICT security', 'https://disarmament.unoda.org/en/our-work/emerging-challenges/developments-field-information-and-telecommunications-context'],
          ['Diplo, UN Global Mechanism on ICT security', 'https://dig.watch/processes/un-gge'],
          ['Security Council resolution 2341 (2017)', 'https://docs.un.org/en/S/RES/2341(2017)'],
          ['Charter of the United Nations (1945)', 'https://www.un.org/en/about-us/un-charter/full-text'],
        ],
        quarmas: [
          'At what point should a cyberattack against critical infrastructure be considered a threat to international peace and security, a use of force or an armed attack?',
          'How can the Council establish a credible and impartial mechanism to attribute cyberattacks to States, and what evidence should it require?',
          'Should the Council adopt binding measures, such as targeted sanctions, against States or groups responsible for attacks on hospitals, power grids or water systems?',
          'How can the Council support developing States in protecting their critical infrastructure without duplicating the work of the Global Mechanism on ICT Security and the International Telecommunication Union?',
          'How can international cyber rules be reconciled with the sovereign control that States claim over their own networks?',
        ],
      },
      {
        letter: 'B',
        title: 'Collapse of State Authority in the Republic of Haiti and International Intervention Dilemmas',
        quote: '“The Transitional Presidential Council concluded its term without having fulfilled its mandate.”',
        quoteBy: 'Center for Strategic and International Studies (CSIS), 2026',
        body: [
          'The Republic of Haiti is going through one of the most severe governance crises in the Western Hemisphere. Since the assassination of President Jovenel Moïse in July 2021, the country has had no elected President and no functioning Parliament, while armed gangs have expanded their control over territory, roads, ports and public services. In 2024, Prime Minister Ariel Henry resigned and a Transitional Presidential Council (TPC) was installed to restore security and organize elections. Its mandate ended on 7 February 2026 without fulfilling either goal, and executive power remained in the hands of Prime Minister Alix Didier Fils-Aimé (CSIS, 2026). The elections planned for August 2026, the first in almost a decade, were postponed because of insecurity.',
          'Gangs allied under the coalition “Viv Ansam” control around 90 percent of Port-au-Prince and its metropolitan area and have expanded into other departments. Between January and September 2025, criminal groups murdered more than 4,000 people, and by September 2025 around 1.4 million people were internally displaced (Human Rights Watch, 2026). Gangs use kidnappings, sexual violence and the recruitment of children as tools to expand their influence, while abuses have also been reported during police operations and by self-defence groups. In 2025, the United States classified Viv Ansam and Gran Grif as terrorist organizations, and the Security Council has imposed targeted sanctions on gang leaders under the sanctions regime established by resolution 2653 (2022).',
          'Haiti itself has requested international assistance. In October 2023 the Council authorized a Multinational Security Support (MSS) mission led by Kenya (resolution 2699) that deployed in 2024 but lacked the staff and funding to defeat the gangs. In September 2025, the Council transformed it into a Gang Suppression Force (GSF) of up to 5,550 personnel with the power to make arrests, supported by a new United Nations Support Office in Haiti (UNSOH). That resolution was adopted by 12 votes in favour, with China, the Russian Federation and Pakistan abstaining (Al Jazeera, 2026). The first contingents of the force arrived in April 2026.',
          'Any intervention, however, raises difficult questions. Haiti’s history includes previous foreign interventions and United Nations missions associated with serious abuses, such as the 2010 cholera epidemic linked to peacekeepers from abroad, which still shapes public distrust. Delegates must balance national sovereignty and Haitian ownership of the solution with the responsibility to protect a population exposed to massacres, hunger and displacement. Lasting stability also depends on long-term factors such as strengthening Haitian institutions and the National Police, disarmament and reintegration programmes, control of the illegal arms trafficking that supplies the gangs, economic recovery and the protection and rehabilitation of children (World Bank, 2025).',
          'At its core, the debate asks whether the Security Council can help the Republic of Haiti restore State authority through a force that is legitimate, accountable and sustainable, or whether international intervention will once again replace the political solution that only the Haitian community can build.',
        ],
        links: [
          ['United Nations Integrated Office in Haiti (BINUH)', 'https://binuh.unmissions.org/fr'],
          ['Human Rights Watch, World Report 2026: Haiti', 'https://www.hrw.org/world-report/2026/country-chapters/haiti'],
          ['Security Council Report, Haiti: Briefing and Consultations', 'https://www.securitycouncilreport.org/whatsinblue/2026/10/haiti-briefing-and-consultations-19.php'],
          ['UNODC, Organized crime and gang violence in Haiti', 'https://www.unodc.org/unodc/en/frontpage/2026/January/explainer_-organized-crime-and-gang-violence-in-haiti.html'],
        ],
        quarmas: [
          'How can the Gang Suppression Force be made effective while respecting Haitian sovereignty and human rights standards?',
          'Which accountability mechanisms should apply to international personnel deployed in Haiti, taking into account past abuses?',
          'How can the Security Council stop the illegal flow of weapons and ammunition that supplies the gangs?',
          'What conditions of security and governance are necessary to hold credible elections, and what role should the Council play in the political transition?',
          'How should the Council address the protection, disarmament and reintegration of children recruited by armed gangs?',
        ],
      },
    ],
  },

  /* ---------- DOCUMENT CENTRE ---------- */
  documents: [
    { group: 'Start here', note: 'If you only open two files this year, make it these. The handbook is the official background for both topics, and the Estatuto is the rulebook for the whole model, including dress code and sanctions.', items: [
      ['Security Council Handbook', 'The official handbook with the letter from the Presidency, Topics A and B, links of interest, QARMAs and committee procedure.', 'docs/unsc-handbook.pdf'],
      ['Estatuto General Oficial 2026–2027', 'The general statute of UEPRIM-MUN in Spanish. It covers the structure of the model, dress code, sanctions and awards.', 'docs/estatuto-general-oficial.pdf'],
    ]},
    { group: 'Speeches and position papers', note: 'Your opening speech and your position paper tell the same story at two lengths. Write the speech first, then grow it into the paper using the guide and the Algeria example as a model for tone and citations.', items: [
      ['Opening Speech Writing Guide', 'The six-part structure for a 1:30 speech, from the hook to the proposed solutions, with what to avoid.', 'docs/opening-speech-guide.pdf'],
      ['Position Paper Writing Guide', 'Page-by-page layout of the full paper: cover, delegate introduction, power of attorney, letter to the Chair, the paper itself and the bibliography.', 'docs/position-paper-guide.pdf'],
      ['Position paper template (Word)', 'An editable Word file already laid out in the right format, so you can focus on writing rather than formatting.', 'docs/position-paper-template.docx'],
      ['Position paper example: Algeria', 'A finished paper from a previous model, useful to see how a strong stance and APA 7 citations look on the page.', 'docs/position-paper-example-algeria.pdf'],
    ]},
    { group: 'Resolutions, declarations and the VETO', note: 'These are the documents that end a debate. Read the resolution guide before the second mock simulation, since it was written for it, and keep the clause phrases sheet next to you when you draft.', items: [
      ['Resolution Guide (for the 2nd mock session)', 'How submitters, co-submitters and signatories work, how preambulatory and operative clauses are written and how voting runs.', 'docs/resolution-guide.pdf'],
      ['Draft Resolution (DRES) Guide', 'The detailed guide used in the Day 17 workshop, with the full drafting and presentation process.', 'docs/draft-resolution-guide.pdf'],
      ['Resolution format (Word)', 'The blank UNSC resolution format ready to fill in with your bloc.', 'docs/resolution-format.docx'],
      ['Resolution format, worked example', 'The same format filled in, so you can see where every part goes.', 'docs/resolution-format-example.pdf'],
      ['Draft Resolution B example', 'A complete draft resolution from a previous session that shows the expected level of detail.', 'docs/draft-resolution-example.pdf'],
      ['Clause phrases', 'The list of preambulatory and operative opening phrases you are allowed to use.', 'docs/clause-phrases.pdf'],
      ['Declaration Guide', 'What unilateral, bilateral and multilateral declarations are for and how they are read in session.', 'docs/declaration-guide.pdf'],
      ['Declaration format', 'The blank layout for a declaration.', 'docs/declaration-format.pdf'],
      ['Declaration example: Russian Federation', 'An official-style declaration to use as a reference.', 'docs/declaration-example-russia.pdf'],
      ['Statement on the Exercise of the VETO', 'The format a permanent member uses to justify a VETO at the podium in under two minutes.', 'docs/veto-statement-format.pdf'],
    ]},
    { group: 'Procedure sheets', note: 'Print one of these and keep it under your placard. Nobody memorises every motion on day one, and the Chair would much rather you check than guess.', items: [
      ['All Motions and Points', 'Every motion and point used in this Council, from setting the agenda to explaining your vote, each with an example of how to say it.', 'docs/motions-and-points-full.pdf'],
      ['Motions and Points (short class version)', 'The shorter sheet from the class on motions and points, good for a quick review before session.', 'docs/motions-and-points-short.pdf'],
      ['UNSC placards', 'Printable placards for every delegation.', 'docs/unsc-placards.pdf'],
    ]},
    { group: 'Mock Simulation I: Myanmar', note: 'Our first full simulation. Keep these as a model of what a background guide, a crisis newspaper and two competing draft resolutions look like.', items: [
      ['The Situation in Myanmar, background guide', 'The topic guide on protection of civilians, ethnic conflict and the restoration of democratic governance.', 'docs/myanmar-background.pdf'],
      ['UNSC Myanmar Newspaper', 'The news bulletin that set the scene for the simulation.', 'docs/myanmar-newspaper.pdf'],
      ['Draft Resolution A (Myanmar)', 'The draft presented by the bloc led by Haiti and the United States.', 'docs/myanmar-resolution-a.pdf'],
      ['Draft Resolution B (Myanmar)', 'The draft presented by the bloc led by China.', 'docs/myanmar-resolution-b.pdf'],
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
    intro: 'PRE-MUN runs every week in Aula 18 from 3:15 to 4:15 PM. Each session builds on the one before, so if you missed a day, read its summary here and catch up with the documents linked to it before the next class.',
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
      { day: '14–16', title: 'Mock Simulation I: Myanmar', text: 'Our first full simulation over three sessions, on the protection of civilians, ethnic conflict and the restoration of democratic governance in Myanmar. It closed with a Tour de Table, two competing draft resolutions, one from Haiti and the United States and one from China, and a formal vote.', docs: ['docs/myanmar-background.pdf', 'docs/myanmar-resolution-a.pdf', 'docs/myanmar-resolution-b.pdf'] },
      { day: '17', title: 'Advanced resolution writing and the VETO', text: 'Feedback on both Myanmar resolutions, a class on resolutions, declarations and amendments, the VETO and how it is presented, and a workshop where groups found and fixed the flaws in real clauses.', docs: ['docs/draft-resolution-guide.pdf', 'docs/declaration-guide.pdf', 'docs/veto-statement-format.pdf'] },
      { day: '19–20', title: 'Mock Simulation II: Red Sea security', text: 'Our second full simulation. Read the briefing in the Mock Simulation II section and come with your opening speech ready.', next: true },
    ],
  },

  /* ---------- MOCK SIMULATION II ---------- */
  mock: {
    title: 'Maritime Security in the Red Sea and the Gulf of Aden',
    days: 'Days 19 & 20',
    body: [
      'Around 12 percent of world trade used to pass through the Bab el-Mandeb, the narrow strait between Yemen and Djibouti that connects the Red Sea and the Suez Canal to the Gulf of Aden and the Indian Ocean. That changed in November 2023, when the Houthi movement (Ansar Allah), which controls much of northern Yemen including the port of Hudaydah, seized the car carrier Galaxy Leader and began attacking commercial ships with drones and missiles, saying it was acting in response to the war in Gaza.',
      'The attacks forced most large shipping companies to send their vessels around the Cape of Good Hope instead, adding around ten days and thousands of kilometres to each trip between Asia and Europe. Traffic through the Suez Canal fell by more than half and Egypt lost billions of dollars in canal revenue, while higher freight and insurance costs were passed on to consumers far from the region. Crews paid the heaviest price: ships such as the Rubymar were sunk, seafarers were killed aboard the True Confidence in 2024, and in July 2025 the Magic Seas and the Eternity C were attacked and sunk.',
      'The Council’s response has been limited. In January 2024 it adopted resolution 2722, which demanded that the Houthis stop all attacks and release the Galaxy Leader and its crew, with eleven votes in favour and Algeria, China, Mozambique and the Russian Federation abstaining. Outside the Council, the United States led Operation Prosperity Guardian and carried out strikes on Houthi targets together with the United Kingdom, while the European Union launched the defensive naval mission EUNAVFOR Aspides. Some members of the Council welcomed these operations as the protection of freedom of navigation, while others warned that strikes on Yemeni territory without explicit Council authorization risked widening the conflict.',
      'Underneath the shipping crisis sits one of the worst humanitarian situations on the planet. Yemen depends on imports through Hudaydah for most of its food and fuel, so any measure that tightens control over the coast, such as inspections, an arms embargo or strikes on ports, also affects millions of civilians. The region is also crowded with other risks, including piracy that has returned off the coast of Somalia, the war in Sudan on the western shore of the Red Sea and the growing number of foreign military bases in Djibouti and the Horn of Africa.',
      'For this simulation the Council must decide how to restore safe navigation without turning the Red Sea into a wider battlefield. Delegates will need to weigh the right of States to protect their ships against the risks of unilateral force, decide whether the Council should create or authorize a maritime mission of its own, consider how to stop weapons reaching armed groups along the coast and keep humanitarian aid flowing into Yemen while doing all of it.',
    ],
    quarmas: [
      'Should the Security Council authorize a multinational naval mission to protect commercial shipping in the Red Sea, and under which limits and mandate?',
      'How can the Council strengthen the arms embargo against non-State armed groups in Yemen without blocking the food and fuel that civilians depend on?',
      'Are strikes against targets on land a legitimate form of self-defence when ships are attacked at sea, or do they require explicit Council authorization?',
      'How should the Council support coastal States such as Yemen, Djibouti, Eritrea, Somalia and Egypt in securing their own waters?',
      'How can the protection of seafarers, including those held hostage, be made a priority in any Council action?',
    ],
    prepare: [
      'Read this briefing twice, once to understand the situation and once from your country’s point of view. Ask yourself whether your government has ships, trade, bases or allies in the region, and how it voted on resolution 2722.',
      'Write a 1:30 opening speech following the Opening Speech Writing Guide and bring it printed. The Chair will open the Guest Speakers’ List early on Day 19.',
      'Re-read the Resolution Guide, which was written for this simulation, because Day 20 ends with draft resolutions and a formal vote. P5 delegations should also review the VETO statement format.',
      'Bring your placard, your motions and points sheet and at least three sources you trust. The Fact-Checker will be in the room.',
    ],
    links: [
      ['Security Council resolution 2722 (2024)', 'https://docs.un.org/en/S/RES/2722(2024)'],
      ['Security Council Report, Yemen', 'https://www.securitycouncilreport.org/yemen/'],
      ['UNCTAD, Navigating troubled waters: impact on global trade', 'https://unctad.org/publication/navigating-troubled-waters-impact-global-trade-disruption-shipping-routes-red-sea-black-sea'],
      ['International Maritime Organization, Red Sea', 'https://www.imo.org/en/MediaCentre/HotTopics/Pages/Red-Sea.aspx'],
    ],
  },

  /* Default upcoming event. The Presidency can override this from the
     Presidency page without touching the code. */
  upcoming: {
    title: 'Second Mock Simulation, Days 19 & 20',
    when: 'Days 19 & 20 of PRE-MUN, Aula 18, 3:15 to 4:15 PM',
    text: 'Our second full simulation of the Council on maritime security in the Red Sea. Read the briefing, prepare your opening speech and come ready to negotiate, because Day 20 ends with a formal vote on draft resolutions.',
  },

  /* Presidency-only files (served from /private, only after the code is entered). */
  privateFiles: [
    { group: 'Session plans', items: [
      ['Day 2 session plan', 'day-2-session-plan.pdf'], ['Day 3 session plan', 'day-3-session-plan.pdf'], ['Day 4 session plan', 'day-4-session-plan.pdf'],
      ['Day 5 session plan', 'day-5-session-plan.pdf'], ['Day 6 session plan', 'day-6-session-plan.pdf'], ['Day 7 session plan', 'day-7-session-plan.pdf'],
      ['Day 9 session plan', 'day-9-session-plan.pdf'], ['Day 14 session plan (Myanmar I)', 'day-14-session-plan.pdf'], ['Day 15 session plan (Myanmar II)', 'day-15-session-plan.pdf'],
      ['Day 16 session plan (Myanmar III)', 'day-16-session-plan.pdf'], ['Day 17 session plan (resolution writing)', 'day-17-session-plan.pdf'],
    ]},
    { group: 'Evaluation and workshops', items: [
      ['Delegate evaluation rubric', 'delegate-evaluation-rubric.pdf'],
      ['Workshop: resolution with flaws', 'workshop-resolution-with-flaws.pdf'],
      ['Workshop: declaration with flaws', 'workshop-declaration-with-flaws.pdf'],
      ['Seating plan', 'seating-plan.png'],
    ]},
  ],
};
