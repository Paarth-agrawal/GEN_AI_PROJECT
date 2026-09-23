/**
 * AI MOVIE STUDIO — SITE CONTENT
 * ================================
 * SINGLE source of truth for all editable text, data, and asset paths.
 * To customize the site, edit THIS FILE and drop replacement images into assets/.
 *
 * Rules:
 * - Placeholders use brackets: "[WORKING TITLE]", "[Tool TBD]", etc.
 * - All image paths are relative to the project root.
 * - If an image is missing, the site shows a labeled placeholder automatically.
 * - Arrays (characters, timeline, etc.) are flexible — add or remove items freely.
 */

window.SITE_CONTENT = {

  // ══════════════════════════════════════════════════════
  // META
  // ══════════════════════════════════════════════════════
  meta: {
    siteTitle: "AI Movie Studio",
    pageTitle: "AI Movie Studio | Life in 2050 — From Concept to Digital Production",
    description: "A college group project exploring AI-generated filmmaking. A 60–90 second short film about how artificial intelligence transforms human life by 2050.",
    ogImage: "assets/images/og-image.webp",
    themeColor: "#0B0E14",
    githubUrl: "[GitHub URL]",
    courseInfo: "[Course Name / Assignment Info]"
  },

  // ══════════════════════════════════════════════════════
  // HERO
  // ══════════════════════════════════════════════════════
  hero: {
    label: "AI-Generated Short Film",
    title: "[WORKING TITLE]",
    tagline: "[Cinematic tagline — to be finalized]",
    description: "A 60–90 second AI-generated short film exploring how artificial intelligence reshapes everyday human life by the year 2050.",
    posterImage: "assets/images/poster.webp",
    ctaPrimary: { label: "Watch Trailer", target: "#trailer" },
    ctaSecondary: { label: "Explore the Story", target: "#story" }
  },

  // ══════════════════════════════════════════════════════
  // STORY
  // ══════════════════════════════════════════════════════
  story: {
    synopsis: "[Synopsis placeholder — describe the core narrative of the short film. What happens in 60–90 seconds? What journey does the viewer go on?]",
    setting: "[Setting description — where and when does the story take place? What does the world of 2050 look like?]",
    conflict: "[Central conflict — what tension drives the story? What choice or challenge does the protagonist face?]",
    aiChanges: "[What AI changes — how has AI transformed this world? What's different about daily life, work, relationships?]",
    humanPerspective: "[Human perspective — what does this story say about humanity? What remains fundamentally human despite technological change?]",
    keywords: ["AI", "2050", "humanity", "technology", "future"],
    image: "assets/images/story-visual.webp"
  },

  // ══════════════════════════════════════════════════════
  // CHARACTERS
  // ══════════════════════════════════════════════════════
  characters: [
    {
      name: "[Character Name]",
      role: "[Role / Archetype]",
      image: "assets/images/characters/char-01.webp",
      shortDesc: "[One-line character description — who they are at a glance]",
      fullDesc: "[Extended backstory and motivation — what drives this character, what's their history, what do they want?]",
      aiRelationship: "[How this character relates to AI — do they embrace it, fear it, depend on it, resist it?]",
      importance: "[Why this character matters to the story — what role do they play in the narrative arc?]"
    },
    {
      name: "[Character Name]",
      role: "[Role / Archetype]",
      image: "assets/images/characters/char-02.webp",
      shortDesc: "[One-line character description]",
      fullDesc: "[Extended backstory and motivation]",
      aiRelationship: "[Relationship to AI]",
      importance: "[Importance to story]"
    },
    {
      name: "[Character Name]",
      role: "[Role / Archetype]",
      image: "assets/images/characters/char-03.webp",
      shortDesc: "[One-line character description]",
      fullDesc: "[Extended backstory and motivation]",
      aiRelationship: "[Relationship to AI]",
      importance: "[Importance to story]"
    },
    {
      name: "[Character Name]",
      role: "[Role / Archetype]",
      image: "assets/images/characters/char-04.webp",
      shortDesc: "[One-line character description]",
      fullDesc: "[Extended backstory and motivation]",
      aiRelationship: "[Relationship to AI]",
      importance: "[Importance to story]"
    }
  ],

  // ══════════════════════════════════════════════════════
  // TIMELINE (scenes)
  // ══════════════════════════════════════════════════════
  timeline: [
    {
      number: 1,
      title: "[Scene Title]",
      timestamp: "0:00 – 0:12",
      description: "[Scene description — what happens in this segment of the film? What does the viewer see and hear?]",
      image: "assets/images/scenes/scene-01.webp",
      keyEvent: "[Key event — the most important moment in this scene]",
      dialogue: "[Optional dialogue or narration line]"
    },
    {
      number: 2,
      title: "[Scene Title]",
      timestamp: "0:12 – 0:24",
      description: "[Scene description]",
      image: "assets/images/scenes/scene-02.webp",
      keyEvent: "[Key event]",
      dialogue: null
    },
    {
      number: 3,
      title: "[Scene Title]",
      timestamp: "0:24 – 0:36",
      description: "[Scene description]",
      image: "assets/images/scenes/scene-03.webp",
      keyEvent: "[Key event]",
      dialogue: "[Optional dialogue or narration]"
    },
    {
      number: 4,
      title: "[Scene Title]",
      timestamp: "0:36 – 0:48",
      description: "[Scene description]",
      image: "assets/images/scenes/scene-04.webp",
      keyEvent: "[Key event]",
      dialogue: null
    },
    {
      number: 5,
      title: "[Scene Title]",
      timestamp: "0:48 – 1:00",
      description: "[Scene description]",
      image: "assets/images/scenes/scene-05.webp",
      keyEvent: "[Key event]",
      dialogue: "[Optional dialogue or narration]"
    },
    {
      number: 6,
      title: "[Scene Title]",
      timestamp: "1:00 – 1:15",
      description: "[Scene description]",
      image: "assets/images/scenes/scene-06.webp",
      keyEvent: "[Key event]",
      dialogue: null
    }
  ],

  // ══════════════════════════════════════════════════════
  // TRAILER
  // ══════════════════════════════════════════════════════
  trailer: {
    videoSrc: "assets/video/film.mp4",
    posterImage: "assets/images/trailer-poster.webp",
    title: "[WORKING TITLE] — Official Trailer",
    duration: "60–90 sec",
    description: "[Trailer description — a brief teaser text that accompanies the video player]"
  },

  // ══════════════════════════════════════════════════════
  // AI STUDIO (production pipeline)
  // ══════════════════════════════════════════════════════
  pipeline: [
    {
      stage: "Story & Script",
      icon: "📝",
      tool: "[Tool TBD]",
      purpose: "[Purpose — e.g. generate narrative structure, dialogue, scene descriptions]",
      generated: "[What was generated — e.g. initial story outline, scene breakdowns, dialogue drafts]",
      humanContribution: "[Human contribution — e.g. refined story arc, adjusted tone, added personal themes]"
    },
    {
      stage: "Image Generation",
      icon: "🎨",
      tool: "[Tool TBD]",
      purpose: "[Purpose — e.g. create character visuals, backgrounds, key frames]",
      generated: "[What was generated]",
      humanContribution: "[Human contribution]"
    },
    {
      stage: "Video Generation",
      icon: "🎬",
      tool: "[Tool TBD]",
      purpose: "[Purpose — e.g. animate scenes, generate motion from stills]",
      generated: "[What was generated]",
      humanContribution: "[Human contribution]"
    },
    {
      stage: "Voice & Narration",
      icon: "🎙️",
      tool: "[Tool TBD]",
      purpose: "[Purpose — e.g. generate voiceover, character dialogue audio]",
      generated: "[What was generated]",
      humanContribution: "[Human contribution]"
    },
    {
      stage: "Music & Sound Design",
      icon: "🎵",
      tool: "[Tool TBD]",
      purpose: "[Purpose — e.g. compose background score, create sound effects]",
      generated: "[What was generated]",
      humanContribution: "[Human contribution]"
    },
    {
      stage: "AI-Assisted Coding",
      icon: "💻",
      tool: "Antigravity",
      purpose: "Building this production microsite — design, development, and documentation",
      generated: "[Code, structure, design system, responsive layouts, interactive components]",
      humanContribution: "[Review, debugging, design decisions, content curation, UX refinement]"
    }
  ],

  // ══════════════════════════════════════════════════════
  // PROMPT ENGINEERING
  // ══════════════════════════════════════════════════════
  promptExercises: [
    {
      title: "[Prompt Engineering Exercise 1]",
      steps: [
        {
          level: "Basic Prompt",
          prompt: "[Prompt to be added — the initial, simple prompt]",
          change: "—",
          result: "[Result to be added — what the AI generated from this prompt]"
        },
        {
          level: "Improved Prompt",
          prompt: "[Prompt to be added — the refined version with more detail]",
          change: "[Change introduced — what was added or modified and why]",
          result: "[Result to be added — how the output improved]"
        },
        {
          level: "Optimized Prompt",
          prompt: "[Prompt to be added — the final, optimized version]",
          change: "[Change introduced — final refinements]",
          result: "[Result to be added — the best output achieved]"
        }
      ]
    },
    {
      title: "[Prompt Engineering Exercise 2]",
      steps: [
        {
          level: "Basic Prompt",
          prompt: "[Prompt to be added]",
          change: "—",
          result: "[Result to be added]"
        },
        {
          level: "Improved Prompt",
          prompt: "[Prompt to be added]",
          change: "[Change introduced]",
          result: "[Result to be added]"
        },
        {
          level: "Optimized Prompt",
          prompt: "[Prompt to be added]",
          change: "[Change introduced]",
          result: "[Result to be added]"
        }
      ]
    }
  ],

  // ══════════════════════════════════════════════════════
  // TOOL COMPARISON
  // ══════════════════════════════════════════════════════
  toolComparison: [
    {
      application: "[Application Area — e.g. Image Generation]",
      toolUsed: "[Tool TBD]",
      alternative: "[Alternative TBD]",
      selectionReason: "[Reason for selection TBD]",
      evaluation: {
        quality: "[Quality assessment TBD]",
        easeOfUse: "[Ease of use TBD]",
        freeAvailability: "[Free availability TBD]",
        customization: "[Customization options TBD]",
        speed: "[Generation speed TBD]",
        limitations: "[Key limitations TBD]",
        watermark: "[Watermark presence TBD]",
        formats: "[Supported formats TBD]"
      }
    },
    {
      application: "[Application Area — e.g. Video Generation]",
      toolUsed: "[Tool TBD]",
      alternative: "[Alternative TBD]",
      selectionReason: "[Reason for selection TBD]",
      evaluation: {
        quality: "[Quality TBD]",
        easeOfUse: "[Ease of use TBD]",
        freeAvailability: "[Free TBD]",
        customization: "[Customization TBD]",
        speed: "[Speed TBD]",
        limitations: "[Limitations TBD]",
        watermark: "[Watermark TBD]",
        formats: "[Formats TBD]"
      }
    },
    {
      application: "[Application Area — e.g. Music/Audio]",
      toolUsed: "[Tool TBD]",
      alternative: "[Alternative TBD]",
      selectionReason: "[Reason for selection TBD]",
      evaluation: {
        quality: "[Quality TBD]",
        easeOfUse: "[Ease of use TBD]",
        freeAvailability: "[Free TBD]",
        customization: "[Customization TBD]",
        speed: "[Speed TBD]",
        limitations: "[Limitations TBD]",
        watermark: "[Watermark TBD]",
        formats: "[Formats TBD]"
      }
    },
    {
      application: "AI-Assisted Coding",
      toolUsed: "Antigravity",
      alternative: "[Alternative TBD]",
      selectionReason: "[Reason for selection TBD]",
      evaluation: {
        quality: "[Quality TBD]",
        easeOfUse: "[Ease of use TBD]",
        freeAvailability: "[Free TBD]",
        customization: "[Customization TBD]",
        speed: "[Speed TBD]",
        limitations: "[Limitations TBD]",
        watermark: "N/A",
        formats: "[Formats TBD]"
      }
    }
  ],

  // ══════════════════════════════════════════════════════
  // HUMAN CONTRIBUTION
  // ══════════════════════════════════════════════════════
  humanContribution: {
    flowSteps: [
      { label: "AI Generated", type: "ai" },
      { label: "Human Reviewed", type: "human" },
      { label: "Human Modified", type: "human" },
      { label: "Final Result", type: "final" }
    ],
    items: [
      {
        area: "Story Edits",
        description: "[How human judgment shaped the story — editing AI-generated narrative for coherence, emotional depth, and thematic clarity]"
      },
      {
        area: "Prompt Refinement",
        description: "[How prompts were iteratively improved — learning what the AI responds to, adjusting language, adding constraints]"
      },
      {
        area: "Visual Selection & Curation",
        description: "[How humans chose between AI-generated options — selecting the most fitting images, rejecting artifacts, ensuring consistency]"
      },
      {
        area: "Video Editing",
        description: "[How human editing shaped the final film — timing, transitions, pacing, removing AI artifacts]"
      },
      {
        area: "Voice & Music Selection",
        description: "[How humans chose audio elements — matching tone, adjusting timing, selecting from AI-generated options]"
      },
      {
        area: "Code Debugging & UX",
        description: "[How humans reviewed AI-generated code — fixing bugs, improving accessibility, refining responsive layouts, making design decisions]"
      },
      {
        area: "Design Decisions",
        description: "[Creative direction that required human judgment — color palette choices, typography pairing, layout decisions, overall aesthetic]"
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // CRITICAL EVALUATION
  // ══════════════════════════════════════════════════════
  evaluation: {
    cards: [
      {
        aiOutput: "[What AI produced — describe the initial AI-generated output]",
        problem: "[Problem identified — what was wrong, inaccurate, or insufficient]",
        intervention: "[Human intervention — what the human did to fix or improve it]",
        finalResult: "[Improved result — how the output was better after human involvement]"
      },
      {
        aiOutput: "[AI output description]",
        problem: "[Problem found]",
        intervention: "[Human fix]",
        finalResult: "[Better result]"
      },
      {
        aiOutput: "[AI output description]",
        problem: "[Problem found]",
        intervention: "[Human fix]",
        finalResult: "[Better result]"
      }
    ],
    reflections: {
      aiStrengths: "[What AI did well — speed, variety, ideation, handling repetitive tasks, generating options]",
      aiLimitations: "[Limitations observed — inconsistency, artifacts, lack of context, inability to self-evaluate quality]",
      modificationsNeeded: "[Modifications required — what categories of changes were consistently needed after AI generation]",
      humanJudgment: "[How human judgment improved output — specific examples of decisions only humans could make]",
      aiAloneCannot: "[What AI alone could not achieve — emotional nuance, cultural sensitivity, narrative coherence, aesthetic taste]"
    }
  },

  // ══════════════════════════════════════════════════════
  // CREDITS
  // ══════════════════════════════════════════════════════
  credits: {
    team: [
      { name: "[Team Member 1]", role: "[Role — e.g. Director / Producer]" },
      { name: "[Team Member 2]", role: "[Role — e.g. Prompt Engineer / Writer]" },
      { name: "[Team Member 3]", role: "[Role — e.g. Visual Designer / Editor]" },
      { name: "[Team Member 4]", role: "[Role — e.g. Developer / Sound Designer]" }
    ],
    aiTools: [
      { name: "[Tool TBD]", usage: "[What it was used for]" },
      { name: "[Tool TBD]", usage: "[What it was used for]" },
      { name: "[Tool TBD]", usage: "[What it was used for]" },
      { name: "Antigravity", usage: "AI-assisted web development" }
    ],
    devTools: [
      { name: "HTML / CSS / JavaScript", usage: "Core web technologies" },
      { name: "Antigravity", usage: "AI-assisted coding and development" },
      { name: "[Tool TBD]", usage: "[Additional dev tools used]" }
    ],
    musicCredits: "[Music and audio credits — list all AI tools, stock sources, or original compositions used for sound]",
    mediaCredits: "[Image and video credits — list all AI generation tools, any stock sources, or original captures used for visuals]"
  }
};
