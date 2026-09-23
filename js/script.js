/**
 * AI MOVIE STUDIO — RENDERING & INTERACTIONS
 * ============================================
 * Reads window.SITE_CONTENT and populates all sections.
 * Modular functions, no globals except SITE_CONTENT.
 *
 * Structure:
 *  1. Utilities (image fallback, escape HTML, keyword highlighting)
 *  2. Render functions (one per section)
 *  3. Interaction initializers (nav, timeline, scroll reveal, reduced motion)
 *  4. Boot
 */

(function () {
  'use strict';

  var C = window.SITE_CONTENT;
  if (!C) {
    console.error('SITE_CONTENT not found. Ensure content.js loads before script.js.');
    return;
  }

  // ═══════════════════════════════════════════════════════
  // 1. UTILITIES
  // ═══════════════════════════════════════════════════════

  /** Escape HTML special characters */
  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /** Generate a placeholder SVG data URI for missing images */
  function placeholderSVG(label, w, h) {
    w = w || 800;
    h = h || 450;
    var text = esc(label || 'PLACEHOLDER');
    // Wrap text for long labels
    var lines = text.match(/.{1,30}/g) || [text];
    var textEls = lines.map(function (line, i) {
      var y = (h / 2) + (i - lines.length / 2 + 0.5) * 16;
      return '<text x="' + (w / 2) + '" y="' + y + '" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%236B6A68">' + line + '</text>';
    }).join('');

    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<rect width="' + w + '" height="' + h + '" fill="%231A1F2B"/>' +
      '<rect x="1" y="1" width="' + (w - 2) + '" height="' + (h - 2) + '" fill="none" stroke="%23252A37" stroke-width="2" stroke-dasharray="8,4"/>' +
      textEls +
      '</svg>'
    );
  }

  /** Create an img element with fallback handling */
  function createImg(src, alt, cssClass, w, h, placeholderLabel) {
    var img = document.createElement('img');
    img.alt = alt || '';
    if (cssClass) img.className = cssClass;
    if (w) img.width = w;
    if (h) img.height = h;
    img.loading = 'lazy';
    img.decoding = 'async';

    var fallbackLabel = placeholderLabel || 'PLACEHOLDER: replace ' + src;

    img.onerror = function () {
      this.onerror = null; // prevent loop
      this.src = placeholderSVG(fallbackLabel, w || 800, h || 450);
      this.alt = fallbackLabel;
    };

    img.src = src;
    return img;
  }

  /** Highlight keywords in text */
  function highlightKeywords(text, keywords) {
    if (!keywords || !keywords.length) return esc(text);
    var escaped = esc(text);
    keywords.forEach(function (kw) {
      var regex = new RegExp('\\b(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'gi');
      escaped = escaped.replace(regex, '<span class="keyword">$1</span>');
    });
    return escaped;
  }


  // ═══════════════════════════════════════════════════════
  // 2. RENDER FUNCTIONS
  // ═══════════════════════════════════════════════════════

  /** Update <head> meta from content */
  function renderMeta() {
    var m = C.meta;
    document.title = m.pageTitle;
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.content = m.description;
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = m.pageTitle;
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = m.description;
    var ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.content = m.ogImage;
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = m.themeColor;
  }

  /** Render hero section */
  function renderHero() {
    var h = C.hero;
    var el = document.querySelector('.hero-content');
    if (!el) return;

    el.innerHTML =
      '<div class="hero-label hero-enter hero-enter--delay-1">' + esc(h.label) + '</div>' +
      '<h1 id="hero-title" class="hero-enter hero-enter--delay-2">' + esc(h.title) + '</h1>' +
      '<p class="hero-tagline hero-enter hero-enter--delay-3">' + esc(h.tagline) + '</p>' +
      '<p class="hero-desc hero-enter hero-enter--delay-4">' + esc(h.description) + '</p>' +
      '<div class="hero-ctas hero-enter hero-enter--delay-5">' +
        '<a href="' + esc(h.ctaPrimary.target) + '" class="btn btn-primary btn-lg">' +
          '<span aria-hidden="true">▶</span> ' + esc(h.ctaPrimary.label) +
        '</a>' +
        '<a href="' + esc(h.ctaSecondary.target) + '" class="btn btn-secondary btn-lg">' +
          esc(h.ctaSecondary.label) +
        '</a>' +
      '</div>';

    // Trigger hero entrance animation
    requestAnimationFrame(function () {
      var items = el.querySelectorAll('.hero-enter');
      items.forEach(function (item) {
        item.classList.add('entered');
      });
    });
  }

  /** Render story section */
  function renderStory() {
    var s = C.story;
    var el = document.getElementById('story-content');
    if (!el) return;

    var textHTML =
      '<div class="story-text">' +
        '<h3>Synopsis</h3>' +
        '<p>' + highlightKeywords(s.synopsis, s.keywords) + '</p>' +
        '<h3>Setting</h3>' +
        '<p>' + highlightKeywords(s.setting, s.keywords) + '</p>' +
        '<h3>Central Conflict</h3>' +
        '<p>' + highlightKeywords(s.conflict, s.keywords) + '</p>' +
        '<h3>What AI Changes</h3>' +
        '<p>' + highlightKeywords(s.aiChanges, s.keywords) + '</p>' +
        '<h3>The Human Perspective</h3>' +
        '<p>' + highlightKeywords(s.humanPerspective, s.keywords) + '</p>' +
      '</div>';

    var visualHTML = '<div class="story-visual reveal"></div>';

    el.innerHTML = textHTML + visualHTML;

    // Add image with fallback
    var visualEl = el.querySelector('.story-visual');
    visualEl.appendChild(createImg(s.image, 'Story visual — ' + s.synopsis.substring(0, 50), '', 800, 450, 'PLACEHOLDER: replace ' + s.image));
  }

  /** Render characters section */
  function renderCharacters() {
    var chars = C.characters;
    var el = document.getElementById('characters-grid');
    if (!el || !chars.length) return;

    el.innerHTML = chars.map(function (ch, i) {
      var id = 'char-details-' + i;
      return (
        '<div class="card character-card reveal" style="--reveal-index:' + i + '">' +
          '<div class="character-card-img-wrapper"></div>' +
          '<div class="character-card-body">' +
            '<h3>' + esc(ch.name) + '</h3>' +
            '<div class="character-role">' + esc(ch.role) + '</div>' +
            '<p class="character-short-desc">' + esc(ch.shortDesc) + '</p>' +
            '<button class="character-expand-btn" ' +
              'aria-expanded="false" ' +
              'aria-controls="' + id + '" ' +
              'data-index="' + i + '">' +
              'Details <span class="arrow" aria-hidden="true">▼</span>' +
            '</button>' +
          '</div>' +
          '<div class="character-details" id="' + id + '" role="region" aria-labelledby="char-name-' + i + '">' +
            '<h4>Full Description</h4>' +
            '<p>' + esc(ch.fullDesc) + '</p>' +
            '<h4>Relationship to AI</h4>' +
            '<p>' + esc(ch.aiRelationship) + '</p>' +
            '<h4>Importance to Story</h4>' +
            '<p>' + esc(ch.importance) + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    // Add images with fallback
    chars.forEach(function (ch, i) {
      var wrapper = el.querySelectorAll('.character-card-img-wrapper')[i];
      if (wrapper) {
        wrapper.appendChild(createImg(ch.image, ch.name + ' — ' + ch.role, 'character-card-img', 400, 533, 'PLACEHOLDER: replace ' + ch.image));
      }
    });

    // Expand/collapse handlers
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('.character-expand-btn');
      if (!btn) return;
      toggleCharacterDetails(btn);
    });

    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var btn = e.target.closest('.character-expand-btn');
        if (!btn) return;
        e.preventDefault();
        toggleCharacterDetails(btn);
      }
    });
  }

  function toggleCharacterDetails(btn) {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    var targetId = btn.getAttribute('aria-controls');
    var details = document.getElementById(targetId);
    if (!details) return;

    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      details.classList.remove('expanded');
    } else {
      details.classList.add('expanded');
    }
  }

  /** Render timeline section */
  function renderTimeline() {
    var scenes = C.timeline;
    var el = document.getElementById('timeline-content');
    if (!el || !scenes.length) return;

    // Scene navigation buttons
    var navHTML = '<div class="timeline-nav" role="tablist" aria-label="Scene navigation">';
    scenes.forEach(function (sc, i) {
      navHTML +=
        '<button class="timeline-scene-btn' + (i === 0 ? ' active' : '') + '" ' +
          'role="tab" ' +
          'aria-selected="' + (i === 0 ? 'true' : 'false') + '" ' +
          'aria-controls="timeline-panel" ' +
          'id="scene-tab-' + i + '" ' +
          'data-scene="' + i + '" ' +
          'tabindex="' + (i === 0 ? '0' : '-1') + '">' +
          '<span class="scene-num">' + esc(String(sc.number)) + '</span>' +
          '<span class="scene-label">' + esc(sc.title) + '</span>' +
        '</button>';
    });
    navHTML += '</div>';

    // Progress bar
    var progressHTML =
      '<div class="timeline-progress" aria-hidden="true">' +
        '<div class="timeline-progress-fill" style="width:' + (100 / scenes.length) + '%"></div>' +
      '</div>';

    // Detail panel (starts with first scene)
    var detailHTML = '<div class="timeline-detail" id="timeline-panel" role="tabpanel" aria-labelledby="scene-tab-0"></div>';

    // Arrow navigation
    var arrowsHTML =
      '<div class="timeline-nav-arrows">' +
        '<button class="timeline-arrow-btn" data-dir="prev" aria-label="Previous scene" disabled>←</button>' +
        '<button class="timeline-arrow-btn" data-dir="next" aria-label="Next scene">→</button>' +
      '</div>';

    el.innerHTML = navHTML + progressHTML + detailHTML + arrowsHTML;

    // Render first scene
    updateTimelineDetail(0);
    initTimelineInteractions();
  }

  function updateTimelineDetail(index) {
    var scenes = C.timeline;
    var sc = scenes[index];
    if (!sc) return;

    var panel = document.getElementById('timeline-panel');
    if (!panel) return;

    var dialogueHTML = '';
    if (sc.dialogue) {
      dialogueHTML = '<div class="timeline-dialogue">' + esc(sc.dialogue) + '</div>';
    }

    panel.innerHTML =
      '<div class="timeline-detail-visual"></div>' +
      '<div class="timeline-detail-content">' +
        '<h3>Scene ' + esc(String(sc.number)) + ': ' + esc(sc.title) + '</h3>' +
        '<div class="timeline-detail-meta">' +
          '<span class="timeline-meta-item">' +
            '<span>Time:</span> <span class="meta-value">' + esc(sc.timestamp) + '</span>' +
          '</span>' +
        '</div>' +
        '<p class="timeline-detail-desc">' + esc(sc.description) + '</p>' +
        '<div class="timeline-meta-item" style="margin-bottom:var(--sp-md)">' +
          '<span>Key Event:</span> <span class="meta-value">' + esc(sc.keyEvent) + '</span>' +
        '</div>' +
        dialogueHTML +
      '</div>';

    // Add image with fallback
    var visualEl = panel.querySelector('.timeline-detail-visual');
    visualEl.appendChild(createImg(sc.image, 'Scene ' + sc.number + ' — ' + sc.title, '', 800, 450, 'PLACEHOLDER: replace ' + sc.image));

    // Update progress
    var fill = document.querySelector('.timeline-progress-fill');
    if (fill) {
      fill.style.width = ((index + 1) / scenes.length * 100) + '%';
    }

    // Update tab panel label
    panel.setAttribute('aria-labelledby', 'scene-tab-' + index);

    // Update arrow states
    var prevBtn = document.querySelector('.timeline-arrow-btn[data-dir="prev"]');
    var nextBtn = document.querySelector('.timeline-arrow-btn[data-dir="next"]');
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === scenes.length - 1);
  }

  function initTimelineInteractions() {
    var activeIndex = 0;
    var scenes = C.timeline;
    var navEl = document.querySelector('.timeline-nav');
    if (!navEl) return;

    function setActiveScene(index) {
      if (index < 0 || index >= scenes.length) return;
      activeIndex = index;

      // Update tab buttons
      var btns = navEl.querySelectorAll('.timeline-scene-btn');
      btns.forEach(function (btn, i) {
        var isActive = i === index;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
        btn.tabIndex = isActive ? 0 : -1;
      });

      // Scroll active tab into view
      var activeBtn = btns[index];
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        activeBtn.focus();
      }

      updateTimelineDetail(index);
    }

    // Click on scene buttons
    navEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.timeline-scene-btn');
      if (!btn) return;
      setActiveScene(parseInt(btn.dataset.scene, 10));
    });

    // Arrow keys on tab list
    navEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveScene(Math.min(activeIndex + 1, scenes.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveScene(Math.max(activeIndex - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveScene(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveScene(scenes.length - 1);
      }
    });

    // Arrow buttons (prev/next)
    document.querySelectorAll('.timeline-arrow-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = this.dataset.dir;
        if (dir === 'prev') setActiveScene(activeIndex - 1);
        else if (dir === 'next') setActiveScene(activeIndex + 1);
      });
    });

    // Touch / swipe support
    var startX = 0;
    var panel = document.getElementById('timeline-panel');
    if (panel) {
      panel.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].clientX;
      }, { passive: true });

      panel.addEventListener('touchend', function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) setActiveScene(Math.min(activeIndex + 1, scenes.length - 1));
          else setActiveScene(Math.max(activeIndex - 1, 0));
        }
      }, { passive: true });
    }
  }

  /** Render trailer section */
  function renderTrailer() {
    var t = C.trailer;
    var el = document.getElementById('trailer-content');
    if (!el) return;

    // We try to detect if video file exists by creating a test video element
    // If it errors, show the placeholder
    var playerHTML =
      '<div class="trailer-player" id="trailer-player">' +
        '<video controls preload="metadata" ' +
          'poster="" ' +
          'id="trailer-video">' +
          '<source src="' + esc(t.videoSrc) + '" type="video/mp4">' +
          'Your browser does not support the video element.' +
        '</video>' +
      '</div>';

    var placeholderHTML =
      '<div class="trailer-placeholder" id="trailer-placeholder" style="display:none">' +
        '<div class="trailer-placeholder-icon" aria-hidden="true">▶</div>' +
        '<h3>Film Coming Soon</h3>' +
        '<p>The completed film will appear here. Drop your video file at<br>' +
        '<code>' + esc(t.videoSrc) + '</code></p>' +
      '</div>';

    var infoHTML =
      '<div class="trailer-info">' +
        '<h3>' + esc(t.title) + '</h3>' +
        '<div class="trailer-duration">' + esc(t.duration) + '</div>' +
        '<p>' + esc(t.description) + '</p>' +
      '</div>';

    el.innerHTML = playerHTML + placeholderHTML + infoHTML;

    // Set poster image with fallback
    var video = document.getElementById('trailer-video');
    var player = document.getElementById('trailer-player');
    var placeholder = document.getElementById('trailer-placeholder');

    if (video) {
      // Try setting poster
      var posterImg = new Image();
      posterImg.onload = function () {
        video.poster = t.posterImage;
      };
      posterImg.onerror = function () {
        video.poster = placeholderSVG('PLACEHOLDER: replace ' + t.posterImage, 900, 506);
      };
      posterImg.src = t.posterImage;

      // If video source fails, show placeholder
      video.addEventListener('error', function () {
        if (player) player.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
      }, true);

      // Also check the source element
      var source = video.querySelector('source');
      if (source) {
        source.addEventListener('error', function () {
          if (player) player.style.display = 'none';
          if (placeholder) placeholder.style.display = 'flex';
        });
      }
    }
  }

  /** Render AI Studio pipeline */
  function renderPipeline() {
    var stages = C.pipeline;
    var el = document.getElementById('pipeline-grid');
    if (!el || !stages.length) return;

    el.innerHTML = stages.map(function (stage, i) {
      return (
        '<div class="card card--accent pipeline-card reveal" style="--reveal-index:' + i + '">' +
          '<div class="pipeline-card-header">' +
            '<div class="pipeline-icon" aria-hidden="true">' + stage.icon + '</div>' +
            '<h3>' + esc(stage.stage) + '</h3>' +
            '<span class="pipeline-tool-badge">' + esc(stage.tool) + '</span>' +
          '</div>' +
          '<div class="pipeline-card-body">' +
            '<div class="pipeline-field">' +
              '<div class="pipeline-field-label">Purpose</div>' +
              '<div class="pipeline-field-value">' + esc(stage.purpose) + '</div>' +
            '</div>' +
            '<div class="pipeline-field">' +
              '<div class="pipeline-field-label">What Was Generated</div>' +
              '<div class="pipeline-field-value">' + esc(stage.generated) + '</div>' +
            '</div>' +
            '<div class="pipeline-field">' +
              '<div class="pipeline-field-label">Human Contribution</div>' +
              '<div class="pipeline-field-value">' + esc(stage.humanContribution) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /** Render prompt engineering section */
  function renderPromptEngineering() {
    var exercises = C.promptExercises;
    var el = document.getElementById('prompt-content');
    if (!el || !exercises.length) return;

    el.innerHTML = exercises.map(function (ex) {
      var stepsHTML = ex.steps.map(function (step) {
        var levelClass = 'prompt-level--' + step.level.toLowerCase().split(' ')[0];
        return (
          '<div class="card prompt-step-card">' +
            '<span class="prompt-level ' + levelClass + '">' + esc(step.level) + '</span>' +
            '<div class="prompt-text">' + esc(step.prompt) + '</div>' +
            '<div class="prompt-meta">' +
              '<p><strong>Change Introduced:</strong> ' + esc(step.change) + '</p>' +
              '<p><strong>Result / Observation:</strong> ' + esc(step.result) + '</p>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      return (
        '<div class="prompt-exercise reveal">' +
          '<h3 class="prompt-exercise-title">' + esc(ex.title) + '</h3>' +
          '<div class="prompt-steps">' + stepsHTML + '</div>' +
        '</div>'
      );
    }).join('');
  }

  /** Render tool comparison (table + mobile cards) */
  function renderToolComparison() {
    var tools = C.toolComparison;
    var el = document.getElementById('comparison-content');
    if (!el || !tools.length) return;

    // Desktop table
    var tableHTML =
      '<div class="comparison-table-wrapper reveal">' +
        '<table class="comparison-table">' +
          '<thead><tr>' +
            '<th>Application</th>' +
            '<th>Tool Used</th>' +
            '<th>Alternative</th>' +
            '<th>Selection Reason</th>' +
            '<th>Quality</th>' +
            '<th>Ease of Use</th>' +
            '<th>Free</th>' +
            '<th>Speed</th>' +
            '<th>Limitations</th>' +
          '</tr></thead>' +
          '<tbody>';

    tools.forEach(function (t) {
      tableHTML +=
        '<tr>' +
          '<td>' + esc(t.application) + '</td>' +
          '<td class="tool-name">' + esc(t.toolUsed) + '</td>' +
          '<td>' + esc(t.alternative) + '</td>' +
          '<td>' + esc(t.selectionReason) + '</td>' +
          '<td>' + esc(t.evaluation.quality) + '</td>' +
          '<td>' + esc(t.evaluation.easeOfUse) + '</td>' +
          '<td>' + esc(t.evaluation.freeAvailability) + '</td>' +
          '<td>' + esc(t.evaluation.speed) + '</td>' +
          '<td>' + esc(t.evaluation.limitations) + '</td>' +
        '</tr>';
    });

    tableHTML += '</tbody></table></div>';

    // Mobile cards
    var cardsHTML = '<div class="comparison-cards">';
    tools.forEach(function (t, i) {
      cardsHTML +=
        '<div class="card comparison-card-item reveal" style="--reveal-index:' + i + '">' +
          '<div class="comparison-card-header">' + esc(t.application) + '</div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Tool</span><span class="comparison-field-value tool-name">' + esc(t.toolUsed) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Alternative</span><span class="comparison-field-value">' + esc(t.alternative) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Reason</span><span class="comparison-field-value">' + esc(t.selectionReason) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Quality</span><span class="comparison-field-value">' + esc(t.evaluation.quality) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Ease of Use</span><span class="comparison-field-value">' + esc(t.evaluation.easeOfUse) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Free</span><span class="comparison-field-value">' + esc(t.evaluation.freeAvailability) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Speed</span><span class="comparison-field-value">' + esc(t.evaluation.speed) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Limitations</span><span class="comparison-field-value">' + esc(t.evaluation.limitations) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Watermark</span><span class="comparison-field-value">' + esc(t.evaluation.watermark) + '</span></div>' +
          '<div class="comparison-field"><span class="comparison-field-label">Formats</span><span class="comparison-field-value">' + esc(t.evaluation.formats) + '</span></div>' +
        '</div>';
    });
    cardsHTML += '</div>';

    el.innerHTML = tableHTML + cardsHTML;
  }

  /** Render human contribution section */
  function renderHumanContribution() {
    var hc = C.humanContribution;
    var el = document.getElementById('contribution-content');
    if (!el) return;

    // Flow visualization
    var flowHTML = '<div class="contribution-flow reveal">';
    hc.flowSteps.forEach(function (step, i) {
      if (i > 0) {
        flowHTML += '<span class="flow-arrow" aria-hidden="true">→</span>';
      }
      var stepClass = 'flow-step--' + step.type;
      flowHTML += '<span class="flow-step ' + stepClass + '">' + esc(step.label) + '</span>';
    });
    flowHTML += '</div>';

    // Items
    var itemsHTML = '<div class="contribution-items reveal-stagger">';
    hc.items.forEach(function (item, i) {
      itemsHTML +=
        '<div class="card card--accent reveal" style="--reveal-index:' + i + '">' +
          '<h3>' + esc(item.area) + '</h3>' +
          '<p class="text-secondary">' + esc(item.description) + '</p>' +
        '</div>';
    });
    itemsHTML += '</div>';

    el.innerHTML = flowHTML + itemsHTML;
  }

  /** Render critical evaluation section */
  function renderEvaluation() {
    var ev = C.evaluation;
    var el = document.getElementById('evaluation-content');
    if (!el) return;

    // Problem → Fix cards
    var cardsHTML = '<div class="evaluation-cards reveal-stagger">';
    ev.cards.forEach(function (card, i) {
      cardsHTML +=
        '<div class="card evaluation-card reveal" style="--reveal-index:' + i + '">' +
          '<div class="eval-step eval-step--ai">' +
            '<span class="eval-step-label">AI Output</span>' +
            '<span class="eval-step-text">' + esc(card.aiOutput) + '</span>' +
          '</div>' +
          '<div class="eval-step eval-step--problem">' +
            '<span class="eval-step-label">Problem</span>' +
            '<span class="eval-step-text">' + esc(card.problem) + '</span>' +
          '</div>' +
          '<div class="eval-step eval-step--fix">' +
            '<span class="eval-step-label">Human Fix</span>' +
            '<span class="eval-step-text">' + esc(card.intervention) + '</span>' +
          '</div>' +
          '<div class="eval-step eval-step--result">' +
            '<span class="eval-step-label">Result</span>' +
            '<span class="eval-step-text">' + esc(card.finalResult) + '</span>' +
          '</div>' +
        '</div>';
    });
    cardsHTML += '</div>';

    // Reflections
    var r = ev.reflections;
    var reflHTML =
      '<h3 class="section-header" style="margin-top:var(--sp-xl)"><span>Reflections</span></h3>' +
      '<div class="reflections-grid reveal-stagger">' +
        '<div class="card reflection-card reveal" style="--reveal-index:0">' +
          '<h3>What AI Did Well</h3>' +
          '<p>' + esc(r.aiStrengths) + '</p>' +
        '</div>' +
        '<div class="card reflection-card reveal" style="--reveal-index:1">' +
          '<h3>AI Limitations</h3>' +
          '<p>' + esc(r.aiLimitations) + '</p>' +
        '</div>' +
        '<div class="card reflection-card reveal" style="--reveal-index:2">' +
          '<h3>Modifications Needed</h3>' +
          '<p>' + esc(r.modificationsNeeded) + '</p>' +
        '</div>' +
        '<div class="card reflection-card reveal" style="--reveal-index:3">' +
          '<h3>Human Judgment</h3>' +
          '<p>' + esc(r.humanJudgment) + '</p>' +
        '</div>' +
        '<div class="card reflection-card reveal" style="--reveal-index:4">' +
          '<h3>What AI Cannot Achieve Alone</h3>' +
          '<p>' + esc(r.aiAloneCannot) + '</p>' +
        '</div>' +
      '</div>';

    el.innerHTML = cardsHTML + reflHTML;
  }

  /** Render credits section */
  function renderCredits() {
    var cr = C.credits;
    var el = document.getElementById('credits-content');
    if (!el) return;

    var html = '';

    // Team
    html += '<div class="credits-section">';
    html += '<div class="credits-section-title">The Team</div>';
    html += '<div class="credits-list">';
    cr.team.forEach(function (member) {
      html +=
        '<div class="credit-item">' +
          '<span class="credit-name">' + esc(member.name) + '</span>' +
          '<span class="credit-separator" aria-hidden="true">·</span>' +
          '<span class="credit-role">' + esc(member.role) + '</span>' +
        '</div>';
    });
    html += '</div></div>';

    // AI Tools
    html += '<div class="credits-section">';
    html += '<div class="credits-section-title">AI Tools</div>';
    html += '<div class="credits-list">';
    cr.aiTools.forEach(function (tool) {
      html +=
        '<div class="credit-item">' +
          '<span class="credit-name">' + esc(tool.name) + '</span>' +
          '<span class="credit-separator" aria-hidden="true">·</span>' +
          '<span class="credit-role">' + esc(tool.usage) + '</span>' +
        '</div>';
    });
    html += '</div></div>';

    // Dev Tools
    html += '<div class="credits-section">';
    html += '<div class="credits-section-title">Development Tools</div>';
    html += '<div class="credits-list">';
    cr.devTools.forEach(function (tool) {
      html +=
        '<div class="credit-item">' +
          '<span class="credit-name">' + esc(tool.name) + '</span>' +
          '<span class="credit-separator" aria-hidden="true">·</span>' +
          '<span class="credit-role">' + esc(tool.usage) + '</span>' +
        '</div>';
    });
    html += '</div></div>';

    // Music & Media
    html += '<div class="credits-section">';
    html += '<div class="credits-section-title">Music & Audio</div>';
    html += '<p class="text-secondary">' + esc(cr.musicCredits) + '</p>';
    html += '</div>';

    html += '<div class="credits-section">';
    html += '<div class="credits-section-title">Image & Video</div>';
    html += '<p class="text-secondary">' + esc(cr.mediaCredits) + '</p>';
    html += '</div>';

    el.innerHTML = html;
  }

  /** Render footer */
  function renderFooter() {
    var m = C.meta;
    var el = document.getElementById('footer-content');
    if (!el) return;

    el.innerHTML =
      '<div class="footer-title">' + esc(m.siteTitle) + '</div>' +
      '<p class="footer-course">' + esc(m.courseInfo) + '</p>' +
      '<div class="footer-links">' +
        '<a href="#hero">Back to Top</a>' +
        '<a href="' + esc(m.githubUrl) + '" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      '</div>' +
      '<p class="footer-copy">© ' + new Date().getFullYear() + ' ' + esc(m.siteTitle) + '. A college group project.</p>';
  }


  // ═══════════════════════════════════════════════════════
  // 3. INTERACTION INITIALIZERS
  // ═══════════════════════════════════════════════════════

  /** Sticky nav: shrink on scroll + active section highlight */
  function initNav() {
    var nav = document.querySelector('.site-nav');
    var links = document.querySelectorAll('.nav-links a[data-nav]');
    var sections = [];
    var scrollThreshold = 60;

    // Collect sections
    links.forEach(function (link) {
      var id = link.getAttribute('data-nav');
      var section = document.getElementById(id);
      if (section) sections.push({ id: id, el: section, link: link });
    });

    // Scroll handler: shrink nav
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // IntersectionObserver for active section
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          var match = sections.find(function (s) { return s.el === entry.target; });
          if (match) match.link.classList.add('active');
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(function (s) { observer.observe(s.el); });

    // Mobile menu
    initMobileMenu();
  }

  /** Mobile menu with focus trap and Esc support */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      menu.classList.add('open');
      // Focus first link
      var firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      isOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      menu.classList.remove('open');
      toggle.focus();
    }

    toggle.addEventListener('click', function () {
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close on Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });

    // Close when clicking a nav link (mobile)
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });

    // Focus trap: keep focus inside menu when open
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !isOpen) return;

      var focusable = menu.querySelectorAll('a, button');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /** Scroll reveal with IntersectionObserver */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    reveals.forEach(function (el) { observer.observe(el); });
  }


  // ═══════════════════════════════════════════════════════
  // 4. BOOT
  // ═══════════════════════════════════════════════════════

  function init() {
    renderMeta();
    renderHero();
    renderStory();
    renderCharacters();
    renderTimeline();
    renderTrailer();
    renderPipeline();
    renderPromptEngineering();
    renderToolComparison();
    renderHumanContribution();
    renderEvaluation();
    renderCredits();
    renderFooter();

    // Init interactions after render
    initNav();
    initScrollReveal();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
