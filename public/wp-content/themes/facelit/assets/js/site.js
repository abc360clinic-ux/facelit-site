/**
 * Facelit theme site JS — mobile menu, reveal, hero lock, marquee, ripple, treatments.
 */
(function () {
  "use strict";

  function clamp(n, min, max) {
    min = min == null ? 0 : min;
    max = max == null ? 1 : max;
    return Math.min(max, Math.max(min, n));
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var header = document.querySelector("[data-site-header]");
    if (!header) return;

    var btn = header.querySelector("[data-menu-toggle]");
    var panel = header.querySelector("[data-menu-panel]");
    var barTop = header.querySelector('[data-menu-bar="top"]');
    var barMid = header.querySelector('[data-menu-bar="mid"]');
    var barBot = header.querySelector('[data-menu-bar="bot"]');
    var links = header.querySelectorAll("[data-menu-link]");
    var open = false;
    var prevOverflow = "";

    function setOpen(next) {
      open = next;
      header.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : prevOverflow;

      if (btn) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      }
      if (panel) {
        panel.setAttribute("aria-hidden", open ? "false" : "true");
        panel.classList.toggle("pointer-events-auto", open);
        panel.classList.toggle("pointer-events-none", !open);
        panel.classList.toggle("translate-y-0", open);
        panel.classList.toggle("opacity-100", open);
        panel.classList.toggle("-translate-y-2", !open);
        panel.classList.toggle("opacity-0", !open);
      }

      if (barTop) {
        barTop.classList.toggle("top-[6px]", open);
        barTop.classList.toggle("rotate-45", open);
        barTop.classList.toggle("top-0", !open);
        barTop.classList.toggle("rotate-0", !open);
      }
      if (barMid) {
        barMid.classList.toggle("opacity-0", open);
        barMid.classList.toggle("opacity-100", !open);
      }
      if (barBot) {
        barBot.classList.toggle("top-[6px]", open);
        barBot.classList.toggle("-rotate-45", open);
        barBot.classList.toggle("top-[12px]", !open);
        barBot.classList.toggle("rotate-0", !open);
      }

      links.forEach(function (a, i) {
        a.style.transitionDelay = open ? 60 + i * 40 + "ms" : "0ms";
        a.classList.toggle("translate-y-0", open);
        a.classList.toggle("opacity-100", open);
        a.classList.toggle("translate-y-1", !open);
        a.classList.toggle("opacity-0", !open);
      });
    }

    if (btn) {
      btn.addEventListener("click", function () {
        if (!open) prevOverflow = document.body.style.overflow;
        setOpen(!open);
      });
    }

    header.querySelectorAll("[data-menu-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    var mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", function () {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- Nav mega-menus (Treatments / Locations) ---------- */
  function initNavMegas() {
    var root = document.querySelector("[data-nav-megas]");
    if (!root) return;

    var triggers = root.querySelectorAll("[data-mega-trigger]");
    var panels = root.querySelectorAll("[data-mega-panel]");
    if (!triggers.length || !panels.length) return;

    var openKey = null;
    var closeTimer = null;
    var mq = window.matchMedia("(min-width: 768px)");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function panelFor(key) {
      return root.querySelector('[data-mega-panel="' + key + '"]');
    }

    function triggerFor(key) {
      return root.querySelector('[data-mega-trigger="' + key + '"]');
    }

    function setOpen(key) {
      if (!mq.matches) key = null;
      openKey = key;

      panels.forEach(function (panel) {
        var active = key && panel.getAttribute("data-mega-panel") === key;
        panel.classList.toggle("is-open", !!active);
        panel.classList.toggle("pointer-events-auto", !!active);
        panel.classList.toggle("pointer-events-none", !active);
      });

      triggers.forEach(function (trigger) {
        var active = key && trigger.getAttribute("data-mega-trigger") === key;
        trigger.classList.toggle("is-active", !!active);
        trigger.setAttribute("aria-expanded", active ? "true" : "false");
      });

      root.classList.toggle("is-mega-open", !!key);
    }

    function scheduleClose() {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(function () {
        setOpen(null);
      }, reduced ? 0 : 90);
    }

    function cancelClose() {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    function openNow(key) {
      cancelClose();
      setOpen(key);
    }

    triggers.forEach(function (trigger) {
      var key = trigger.getAttribute("data-mega-trigger");
      trigger.addEventListener("mouseenter", function () {
        openNow(key);
      });
      trigger.addEventListener("focusin", function () {
        openNow(key);
      });
      trigger.addEventListener("mouseleave", scheduleClose);
    });

    panels.forEach(function (panel) {
      var key = panel.getAttribute("data-mega-panel");
      panel.addEventListener("mouseenter", function () {
        openNow(key);
      });
      panel.addEventListener("focusin", function () {
        openNow(key);
      });
      panel.addEventListener("mouseleave", scheduleClose);
    });

    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) scheduleClose();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openKey) {
        var t = triggerFor(openKey);
        setOpen(null);
        if (t) t.focus();
      }
    });

    document.addEventListener("pointerdown", function (e) {
      if (!openKey) return;
      if (root.contains(e.target)) return;
      setOpen(null);
    });

    mq.addEventListener("change", function () {
      if (!mq.matches) setOpen(null);
    });
  }

  /* ---------- Reveal ---------- */
  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) {
        n.classList.add("is-inview");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  /* ---------- Hero marquee side length ---------- */
  function initHeroMarquee() {
    var frame = document.querySelector("[data-hero-marquee]");
    if (!frame) return;

    var left = frame.querySelector('[data-marquee-side="left"]');
    var right = frame.querySelector('[data-marquee-side="right"]');
    var topEdge = frame.querySelector(".hero-marquee__edge-x");
    var segmentHtml = "";
    if (topEdge) {
      var seg = topEdge.querySelector(".inline-flex.shrink-0");
      if (seg) segmentHtml = seg.outerHTML;
    }

    function measure() {
      var styles = getComputedStyle(frame);
      var pad =
        parseFloat(styles.getPropertyValue("--hero-marquee-pad")) ||
        parseFloat(styles.paddingTop) ||
        24;
      var sideLen = Math.max(0, frame.clientHeight - pad * 2);
      frame.style.setProperty("--side-len", sideLen + "px");

      if (sideLen > 0 && segmentHtml) {
        if (left) {
          left.innerHTML =
            '<div class="absolute top-0 left-0 flex items-center overflow-hidden" style="width:' +
            sideLen +
            'px;height:var(--hero-marquee-pad, 1.5rem);transform:rotate(-90deg) translateX(-100%);transform-origin:top left">' +
            '<div class="flex w-max items-center whitespace-nowrap text-[10px] font-medium tracking-[0.16em] text-ink-soft/40 uppercase sm:text-[11px] marquee-track-reverse">' +
            segmentHtml +
            segmentHtml +
            "</div></div>";
        }
        if (right) {
          right.innerHTML =
            '<div class="absolute top-0 left-full flex items-center overflow-hidden" style="width:' +
            sideLen +
            'px;height:var(--hero-marquee-pad, 1.5rem);transform:rotate(90deg);transform-origin:top left">' +
            '<div class="flex w-max items-center whitespace-nowrap text-[10px] font-medium tracking-[0.16em] text-ink-soft/40 uppercase sm:text-[11px] marquee-track">' +
            segmentHtml +
            segmentHtml +
            "</div></div>";
        }
      }
    }

    measure();
    var ro = new ResizeObserver(measure);
    ro.observe(frame);
  }

  /* ---------- Hero lock scroll ---------- */
  function initHeroLock() {
    var track = document.querySelector("[data-hero-lock]");
    if (!track) return;

    var sticky = track.querySelector("[data-hero-sticky]");
    var frame = track.querySelector("[data-hero-frame]");
    var marquee = track.querySelector("[data-hero-marquee]");
    var glass = track.querySelector("[data-hero-glass]");
    var cloud = track.querySelector("[data-hero-cloud]");
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    var raf = 0;
    var measured = false;

    function applyReduced() {
      track.style.height = "auto";
      if (sticky) {
        sticky.className = "relative";
      }
      if (frame) {
        frame.removeAttribute("style");
        frame.className = "mx-auto flex min-h-0 w-full flex-col";
      }
      if (marquee) {
        marquee.removeAttribute("style");
        marquee.className = "hero-marquee relative";
      }
      if (glass) {
        glass.style.borderRadius = "";
        glass.className =
          "liquid-glass overflow-hidden bg-mist rounded-[1.35rem] sm:rounded-[1.85rem]";
      }
    }

    function update() {
      raf = 0;
      var vw = window.innerWidth;
      measured = vw > 0;

      if (mq.matches) {
        applyReduced();
        return;
      }

      var rect = track.getBoundingClientRect();
      var range = Math.max(1, track.offsetHeight - window.innerHeight);
      var scrolled = Math.min(range, Math.max(0, -rect.top));
      var progress = easeOutCubic(clamp(scrolled / range));
      var p = progress;
      var mobile = vw < 640;
      var fullBleed = !measured || p < 0.001;

      var sideGutter = mobile ? 12 : 32;
      var settledMax = Math.min(1280, vw - sideGutter * 2);
      var padX = fullBleed ? 0 : lerp(0, sideGutter, p);
      var padTop = fullBleed ? 0 : lerp(0, mobile ? 92 : 112, p);
      var padBottom = fullBleed ? 0 : lerp(0, mobile ? 12 : 32, p);
      var marqueePad = fullBleed ? 0 : lerp(0, mobile ? 12 : 28, p);
      var radiusOuter = fullBleed ? 0 : lerp(0, mobile ? 20 : 33.6, p);
      var radiusInner = fullBleed ? 0 : lerp(0, mobile ? 16 : 29.6, p);
      var maxWidth = fullBleed ? "100%" : lerp(vw, settledMax, p) + "px";
      var marqueeOpacity = fullBleed
        ? 0
        : clamp((p - (mobile ? 0.2 : 0.08)) / (mobile ? 0.55 : 0.4));
      var cloudShiftY = lerp(-4.75, -2.75, fullBleed ? 0 : p);

      if (frame) {
        frame.style.maxWidth = maxWidth;
        frame.style.paddingLeft = padX + "px";
        frame.style.paddingRight = padX + "px";
        frame.style.paddingTop = padTop + "px";
        frame.style.paddingBottom = padBottom + "px";
      }

      if (marquee) {
        marquee.style.setProperty("--hero-marquee-pad", marqueePad + "px");
        marquee.style.setProperty("--hero-marquee-radius", radiusOuter + "px");
        marquee.style.setProperty(
          "--hero-marquee-opacity",
          String(marqueeOpacity)
        );
        marquee.style.setProperty(
          "--hero-marquee-border",
          String(fullBleed ? 0 : 0.08 * p)
        );
      }

      if (glass) {
        glass.style.borderRadius = radiusInner + "px";
        glass.style.height = "100%";
      }

      if (cloud) {
        cloud.style.transform =
          "translate(-50%, calc(-50% + " + cloudShiftY + "rem))";
      }
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    mq.addEventListener("change", onScroll);
  }

  /* ---------- Expanding ripple canvas ---------- */
  function initRipple() {
    var canvas = document.querySelector("[data-ripple-canvas]");
    if (!canvas) return;

    var waveColor = "#dcc4ad";
    var centerOpacity = 0.55;
    var edgeOpacity = 0;
    var waveDensity = 15;
    var edgeRoughness = 0.75;
    var animationSpeed = 0.18;
    var lineThickness = 1;
    var spikeVariation = 0;
    var SEGMENTS = 32;
    var SEG_STEP = (Math.PI * 2) / SEGMENTS;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    var unit = Array.from({ length: SEGMENTS }, function (_, i) {
      var a = i * SEG_STEP;
      return { sin: Math.sin(a), cos: Math.cos(a) };
    });
    var pts = Array.from({ length: SEGMENTS }, function () {
      return { x: 0, y: 0 };
    });

    var raf = 0;
    var time = 0;
    var w = 0;
    var h = 0;
    var dirty = true;

    function drawRing(cx, cy, maxR, radius, t, opacitySpan) {
      var progress = radius / (maxR * 1.5);
      var alpha = centerOpacity + opacitySpan * progress;
      var fade = 1;
      if (t > 0) {
        if (radius < maxR * 0.1) fade = radius / (maxR * 0.1);
        else if (radius > maxR * 1.2) {
          fade = Math.max(0, 1 - (radius - maxR * 1.2) / (maxR * 0.3));
        }
      }

      ctx.beginPath();
      ctx.strokeStyle = waveColor;
      ctx.globalAlpha = alpha * fade;
      ctx.lineWidth = lineThickness;

      var amp = edgeRoughness * 20;
      var spike = spikeVariation;
      var p1 = t * 2;
      var p2 = t * 1.5;
      var p3 = t * 2.5;

      for (var i = 0; i < SEGMENTS; i++) {
        var angle = i * SEG_STEP;
        var u = unit[i];
        var wobble =
          Math.sin(angle * 8 + p1) +
          Math.sin(angle * 3 + p2) * spike +
          Math.sin(angle * 13 - p3) * spike * 0.5;
        var r = Math.max(0, radius + amp * wobble);
        pts[i].x = cx + u.cos * r;
        pts[i].y = cy + u.sin * r;
      }

      var last = pts[SEGMENTS - 1];
      var first = pts[0];
      ctx.moveTo((last.x + first.x) * 0.5, (last.y + first.y) * 0.5);
      for (var j = 0; j < SEGMENTS; j++) {
        var cur = pts[j];
        var next = pts[(j + 1) % SEGMENTS];
        ctx.quadraticCurveTo(
          cur.x,
          cur.y,
          (cur.x + next.x) * 0.5,
          (cur.y + next.y) * 0.5
        );
      }
      ctx.closePath();
      ctx.stroke();
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    }

    function paint(animate) {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      var cx = w * 0.5;
      var cy = h * 0.5;
      var maxR = Math.sqrt(cx * cx + cy * cy);
      var extent = maxR * 1.5;
      var gap = extent / waveDensity;
      var opacitySpan = edgeOpacity - centerOpacity;

      if (!animate || reduced.matches) {
        for (var i = 0; i < waveDensity; i++) {
          drawRing(cx, cy, maxR, (i / waveDensity) * extent, 0, opacitySpan);
        }
        ctx.globalAlpha = 1;
        return;
      }

      time += 0.01 * animationSpeed;
      var offset = (time * maxR * 0.5) % extent;

      for (var k = 0; k < waveDensity; k++) {
        var radius = offset + k * gap;
        if (radius > extent) radius -= extent;
        if (radius < 0 || radius > extent) continue;
        drawRing(cx, cy, maxR, radius, time, opacitySpan);
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      if (dirty) {
        dirty = false;
        resize();
      }
      paint(true);
      raf = requestAnimationFrame(tick);
    }

    resize();
    var ro = new ResizeObserver(function () {
      dirty = true;
    });
    ro.observe(canvas.parentElement || canvas);

    if (reduced.matches) {
      paint(false);
    } else {
      raf = requestAnimationFrame(tick);
    }

    reduced.addEventListener("change", function () {
      cancelAnimationFrame(raf);
      if (reduced.matches) paint(false);
      else raf = requestAnimationFrame(tick);
    });
  }

  /* ---------- Treatments stack ---------- */
  function initTreatmentsStack() {
    var root = document.querySelector("[data-treatments-stack]");
    if (!root) return;

    var cards = Array.prototype.slice.call(
      root.querySelectorAll(".treatments-card")
    );
    var faces = Array.prototype.slice.call(
      root.querySelectorAll(".treatments-card-face")
    );
    if (!cards.length) return;

    var STICKY_TOP_REM = 5.5;
    var STEP_REM = 1.25;
    var SCALE_PER_DEPTH = 0.048;
    var MIN_SCALE = 0.82;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    var raf = 0;
    var packed = false;

    function rem() {
      return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    function applyDepth(face, depth) {
      if (depth <= 0.001) {
        face.style.transform = "none";
        return;
      }
      var scale = Math.max(MIN_SCALE, 1 - depth * SCALE_PER_DEPTH);
      face.style.transform = "scale(" + scale + ")";
    }

    function coverProgress(behindIndex, frontIndex) {
      var behindFace = faces[behindIndex];
      var frontCard = cards[frontIndex];
      if (!behindFace || !frontCard) return 0;

      var behind = behindFace.getBoundingClientRect();
      var frontTop = frontCard.getBoundingClientRect().top;
      var stepPx = rem() * STEP_REM;

      var start = behind.bottom;
      var end = behind.top + stepPx * (frontIndex - behindIndex);
      var range = Math.max(1, start - end);
      var linear = Math.min(1, Math.max(0, (start - frontTop) / range));
      return 1 - Math.pow(1 - linear, 2);
    }

    function isFullyPacked() {
      var last = faces[faces.length - 1];
      if (!last) return false;
      var stickyTopPx = rem() * STICKY_TOP_REM;
      var lastTop = last.getBoundingClientRect().top;
      return (
        lastTop <= stickyTopPx + (faces.length - 1) * rem() * STEP_REM + 4
      );
    }

    function update() {
      raf = 0;

      if (reduced.matches) {
        faces.forEach(function (face) {
          face.style.transform = "none";
        });
        return;
      }

      if (packed || isFullyPacked()) {
        packed = true;
        faces.forEach(function (face, i) {
          applyDepth(face, faces.length - 1 - i);
        });
        var first = faces[0];
        if (first) {
          var firstTop = first.getBoundingClientRect().top;
          var stickyTopPx = rem() * STICKY_TOP_REM;
          if (firstTop > stickyTopPx + 24) packed = false;
        }
        if (packed) return;
      }

      faces.forEach(function (face, i) {
        var depth = 0;
        for (var j = i + 1; j < cards.length; j++) {
          depth += coverProgress(i, j);
        }
        applyDepth(face, depth);
      });
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  function initBeforeAfter() {
    document.querySelectorAll("[data-before-after]").forEach(function (root) {
      var range = root.querySelector("[data-ba-range]");
      var before = root.querySelector("[data-ba-before]");
      var line = root.querySelector("[data-ba-line]");
      if (!range || !before || !line) return;

      function setPos(pct) {
        pct = Math.min(100, Math.max(0, pct));
        before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
        line.style.left = pct + "%";
        range.value = String(Math.round(pct));
      }

      function fromClientX(clientX) {
        var rect = root.getBoundingClientRect();
        setPos(((clientX - rect.left) / rect.width) * 100);
      }

      range.addEventListener("input", function () {
        setPos(Number(range.value));
      });
      range.addEventListener("pointerdown", function (e) {
        if (range.setPointerCapture) range.setPointerCapture(e.pointerId);
        fromClientX(e.clientX);
      });
      range.addEventListener("pointermove", function (e) {
        if (e.buttons === 0) return;
        fromClientX(e.clientX);
      });
    });
  }

  function initReviewTicker() {
    document.querySelectorAll("[data-review-ticker]").forEach(function (wrap) {
      var track = wrap.querySelector("[data-review-track]");
      if (!track) return;
      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var offset = 0;
      var loopAt = 0;
      var paused = false;
      var last = performance.now();

      function measure() {
        loopAt = track.scrollHeight / 2;
      }
      measure();
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(measure).observe(track);
      }

      wrap.addEventListener("mouseenter", function () {
        paused = true;
      });
      wrap.addEventListener("mouseleave", function () {
        paused = false;
      });

      if (reduced) return;

      function tick(now) {
        var dt = Math.min(48, now - last) / 1000;
        last = now;
        if (!paused) {
          offset += 22 * dt;
          if (loopAt > 0 && offset >= loopAt) offset -= loopAt;
          track.style.transform = "translate3d(0, " + -offset + "px, 0)";
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function initReviewsScroller() {
    var SPEED = 28;
    document.querySelectorAll("[data-reviews-scroller]").forEach(function (root) {
      var viewport = root.querySelector("[data-reviews-viewport]");
      var track = root.querySelector("[data-reviews-track]");
      if (!viewport || !track) return;

      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var offset = 0;
      var loopAt = 0;
      var paused = false;
      var drag = { active: false, startX: 0, startOffset: 0, moved: false };
      var last = performance.now();

      function measure() {
        loopAt = track.scrollWidth / 2;
      }
      measure();
      if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(measure).observe(track);
      }

      function wrap(value) {
        if (loopAt <= 0) return value;
        var next = value % loopAt;
        if (next < 0) next += loopAt;
        return next;
      }

      function apply() {
        track.style.transform = "translate3d(" + -offset + "px,0,0)";
      }

      viewport.addEventListener("pointerenter", function () {
        paused = true;
      });
      viewport.addEventListener("pointerleave", function () {
        if (!drag.active) paused = false;
      });
      viewport.addEventListener("pointerdown", function (e) {
        if (e.button !== 0) return;
        paused = true;
        drag = { active: true, startX: e.clientX, startOffset: offset, moved: false };
        if (viewport.setPointerCapture) viewport.setPointerCapture(e.pointerId);
      });
      viewport.addEventListener("pointermove", function (e) {
        if (!drag.active) return;
        var dx = e.clientX - drag.startX;
        if (Math.abs(dx) > 3) drag.moved = true;
        offset = wrap(drag.startOffset - dx);
        apply();
      });
      function endDrag(e) {
        if (!drag.active) return;
        drag.active = false;
        if (viewport.releasePointerCapture && e && e.pointerId != null) {
          try {
            viewport.releasePointerCapture(e.pointerId);
          } catch (err) {}
        }
        window.setTimeout(function () {
          paused = false;
        }, 900);
      }
      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);
      viewport.addEventListener(
        "click",
        function (e) {
          if (drag.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.moved = false;
          }
        },
        true
      );

      if (reduced) return;

      function tick(now) {
        var dt = Math.min(48, now - last) / 1000;
        last = now;
        if (!paused && !drag.active) {
          offset += SPEED * dt;
          if (loopAt > 0 && offset >= loopAt) offset -= loopAt;
          apply();
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function initLoopScroller(viewport, track, cloneAttr, speed) {
    if (!viewport || !track) return;

    var SPEED = speed || 28;
    var mq = window.matchMedia("(max-width: 1023px)");
    var reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    var offset = 0;
    var loopAt = 0;
    var paused = false;
    var inView = true;
    var drag = { active: false, startX: 0, startOffset: 0, moved: false };
    var last = performance.now();

    function originals() {
      return Array.prototype.filter.call(track.children, function (li) {
        return !li.hasAttribute(cloneAttr);
      });
    }

    function clearClones() {
      track.querySelectorAll("[" + cloneAttr + "]").forEach(function (node) {
        node.remove();
      });
    }

    function syncClones() {
      clearClones();
      if (!mq.matches || reducedMq.matches) return;
      originals().forEach(function (li) {
        var clone = li.cloneNode(true);
        clone.setAttribute(cloneAttr, "1");
        clone.setAttribute("aria-hidden", "true");
        var links = clone.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
          links[i].setAttribute("tabindex", "-1");
        }
        track.appendChild(clone);
      });
    }

    function measure() {
      loopAt = mq.matches && !reducedMq.matches ? track.scrollWidth / 2 : 0;
    }

    function wrap(value) {
      if (loopAt <= 0) return value;
      var next = value % loopAt;
      if (next < 0) next += loopAt;
      return next;
    }

    function apply() {
      if (!mq.matches || reducedMq.matches) {
        track.style.transform = "";
        return;
      }
      track.style.transform = "translate3d(" + -offset + "px,0,0)";
    }

    function resetDesktop() {
      paused = false;
      drag.active = false;
      offset = 0;
      clearClones();
      track.style.transform = "";
      viewport.scrollLeft = 0;
    }

    function setupMobile() {
      syncClones();
      measure();
      offset = wrap(offset);
      apply();
    }

    viewport.addEventListener("pointerenter", function () {
      paused = true;
    });
    viewport.addEventListener("pointerleave", function () {
      if (!drag.active) paused = false;
    });
    viewport.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || !mq.matches || reducedMq.matches) return;
      paused = true;
      drag = { active: true, startX: e.clientX, startOffset: offset, moved: false };
      if (viewport.setPointerCapture) viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener("pointermove", function (e) {
      if (!drag.active) return;
      var dx = e.clientX - drag.startX;
      if (Math.abs(dx) > 3) drag.moved = true;
      offset = wrap(drag.startOffset - dx);
      apply();
    });
    function endDrag(e) {
      if (!drag.active) return;
      drag.active = false;
      if (viewport.releasePointerCapture && e && e.pointerId != null) {
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
      window.setTimeout(function () {
        paused = false;
      }, 900);
    }
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener(
      "click",
      function (e) {
        if (drag.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.moved = false;
        }
      },
      true
    );

    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver(
        function (entries) {
          inView = !!(entries[0] && entries[0].isIntersecting);
        },
        { threshold: 0.2 }
      ).observe(viewport);
    }

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(function () {
        if (!mq.matches || reducedMq.matches) return;
        measure();
        offset = wrap(offset);
        apply();
      }).observe(track);
    }

    function tick(now) {
      var dt = Math.min(48, now - last) / 1000;
      last = now;
      if (mq.matches && !reducedMq.matches && inView && !paused && !drag.active) {
        offset = wrap(offset + SPEED * dt);
        apply();
      }
      requestAnimationFrame(tick);
    }

    function onMode() {
      if (!mq.matches || reducedMq.matches) {
        resetDesktop();
        return;
      }
      setupMobile();
    }

    onMode();
    if (mq.addEventListener) mq.addEventListener("change", onMode);
    if (reducedMq.addEventListener) reducedMq.addEventListener("change", onMode);
    requestAnimationFrame(tick);
  }

  function initEcoMachinesScroller() {
    var viewport = document.querySelector("[data-eco-machines]");
    if (!viewport) return;
    initLoopScroller(
      viewport,
      viewport.querySelector("[data-eco-machines-track]"),
      "data-eco-clone",
      28
    );
  }

  function initHubJourneyScroller() {
    var viewport = document.querySelector("[data-hub-journey]");
    if (!viewport) return;
    initLoopScroller(
      viewport,
      viewport.querySelector("[data-hub-journey-track]"),
      "data-journey-clone",
      24
    );
  }

  /* ---------- Custom selects (native menus can’t be themed) ---------- */
  var openCombo = null;
  var openMenuEl = null;

  function closeCombo(combo, restoreFocus) {
    if (!combo) return;
    combo.classList.remove("is-open");
    var trigger = combo.querySelector(".facelit-combo__trigger");
    var menu = combo._menu || combo.querySelector(".facelit-combo__menu");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (menu) {
      menu.classList.remove("is-open", "is-fixed");
      menu.style.top = "";
      menu.style.left = "";
      menu.style.width = "";
      menu.style.maxHeight = "";
      menu.style.transformOrigin = "";
      if (menu.parentElement !== combo) {
        combo.appendChild(menu);
      }
    }
    if (combo._onReposition) {
      window.removeEventListener("resize", combo._onReposition);
      window.removeEventListener("scroll", combo._onReposition, true);
      combo._onReposition = null;
    }
    if (openCombo === combo) {
      openCombo = null;
      openMenuEl = null;
    }
    if (restoreFocus && trigger) trigger.focus();
  }

  function initFormSelects(root) {
    var scope = root || document;
    var selects = scope.querySelectorAll(
      "select.facelit-select, .follow-border-field select"
    );

    function closeAll(except) {
      document.querySelectorAll(".facelit-combo.is-open").forEach(function (combo) {
        if (combo !== except) closeCombo(combo, false);
      });
    }

    if (!document.documentElement.dataset.facelitSelectDoc) {
      document.documentElement.dataset.facelitSelectDoc = "1";
      document.addEventListener("pointerdown", function (e) {
        if (!openCombo) return;
        if (openCombo.contains(e.target)) return;
        if (openMenuEl && openMenuEl.contains(e.target)) return;
        closeCombo(openCombo, false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && openCombo) {
          e.preventDefault();
          closeCombo(openCombo, true);
        }
      });
    }

    selects.forEach(function (select) {
      if (select.dataset.selectReady === "1") return;
      select.dataset.selectReady = "1";
      select.classList.add("facelit-select");

      var wrap = select.closest(".follow-border-inner") || select.parentElement;
      if (!wrap) return;

      var dark = select.classList.contains("text-cream") || !!select.closest(".bg-forest");
      var placeholder = "";
      var options = [];
      Array.prototype.forEach.call(select.options, function (opt) {
        if (opt.disabled && !opt.value) {
          placeholder = opt.textContent.trim();
          return;
        }
        if (opt.disabled) return;
        options.push({
          value: opt.value,
          label: opt.textContent.trim(),
        });
      });
      if (!placeholder) placeholder = select.getAttribute("aria-label") || "Select";

      var combo = document.createElement("div");
      combo.className =
        "facelit-combo " + (dark ? "facelit-combo--dark" : "facelit-combo--light");

      var trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "facelit-combo__trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      if (select.id) trigger.id = select.id + "-trigger";
      if (select.required) trigger.setAttribute("aria-required", "true");

      var labelEl = document.createElement("span");
      labelEl.className = "facelit-combo__label";
      trigger.appendChild(labelEl);

      var chevron = document.createElement("span");
      chevron.className = "facelit-combo__chevron";
      chevron.setAttribute("aria-hidden", "true");
      trigger.appendChild(chevron);

      var menu = document.createElement("div");
      menu.className =
        "facelit-combo__menu " +
        (dark ? "facelit-combo__menu--dark" : "facelit-combo__menu--light");
      menu.setAttribute("role", "listbox");
      menu.id = (select.id || "facelit-select") + "-listbox";
      trigger.setAttribute("aria-controls", menu.id);
      combo._menu = menu;

      options.forEach(function (opt, index) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "facelit-combo__option";
        btn.setAttribute("role", "option");
        btn.setAttribute("data-value", opt.value);
        btn.setAttribute("data-index", String(index));
        btn.tabIndex = -1;

        var text = document.createElement("span");
        text.textContent = opt.label;
        btn.appendChild(text);

        var check = document.createElement("span");
        check.className = "facelit-combo__check";
        check.setAttribute("aria-hidden", "true");
        btn.appendChild(check);

        menu.appendChild(btn);
      });

      combo.appendChild(trigger);
      combo.appendChild(menu);
      wrap.appendChild(combo);

      var activeIndex = -1;

      function syncFromSelect() {
        var value = String(select.value || "");
        var empty = !value;
        combo.classList.toggle("is-empty", empty);
        labelEl.textContent = empty
          ? placeholder
          : (select.options[select.selectedIndex] &&
              select.options[select.selectedIndex].textContent.trim()) ||
            value;

        Array.prototype.forEach.call(
          menu.querySelectorAll(".facelit-combo__option"),
          function (btn, i) {
            var selected = btn.getAttribute("data-value") === value;
            btn.setAttribute("aria-selected", selected ? "true" : "false");
            if (selected) activeIndex = i;
          }
        );
      }

      function setActive(index) {
        var items = menu.querySelectorAll(".facelit-combo__option");
        if (!items.length) return;
        activeIndex = (index + items.length) % items.length;
        items.forEach(function (btn, i) {
          btn.classList.toggle("is-active", i === activeIndex);
        });
        items[activeIndex].scrollIntoView({ block: "nearest" });
      }

      function choose(value) {
        select.value = value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncFromSelect();
        closeCombo(combo, true);
      }

      function positionMenu() {
        var rect = trigger.getBoundingClientRect();
        var gap = 8;
        var width = rect.width;
        var left = rect.left;
        var viewportH = window.innerHeight;
        var spaceBelow = viewportH - rect.bottom - gap;
        var spaceAbove = rect.top - gap;
        var preferBelow = spaceBelow >= Math.min(220, spaceAbove) || spaceBelow >= 140;
        var maxH = Math.min(264, preferBelow ? spaceBelow : spaceAbove, viewportH * 0.5);
        if (maxH < 120) maxH = Math.min(220, Math.max(spaceBelow, spaceAbove));

        menu.classList.add("is-fixed");
        menu.style.width = width + "px";
        menu.style.left = Math.max(8, Math.min(left, window.innerWidth - width - 8)) + "px";
        menu.style.maxHeight = Math.max(120, maxH) + "px";

        if (preferBelow) {
          menu.style.top = rect.bottom + gap + "px";
          menu.style.transformOrigin = "top center";
        } else {
          menu.style.top = Math.max(8, rect.top - gap - Math.max(120, maxH)) + "px";
          menu.style.transformOrigin = "bottom center";
        }
      }

      function openMenu() {
        closeAll(combo);
        combo.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        document.body.appendChild(menu);
        positionMenu();
        menu.classList.add("is-open");
        openCombo = combo;
        openMenuEl = menu;

        if (!combo._onReposition) {
          combo._onReposition = function () {
            if (openCombo === combo) positionMenu();
          };
          window.addEventListener("resize", combo._onReposition);
          window.addEventListener("scroll", combo._onReposition, true);
        }

        var selected = menu.querySelector('.facelit-combo__option[aria-selected="true"]');
        var idx = selected
          ? Number(selected.getAttribute("data-index") || 0)
          : 0;
        setActive(idx);
      }

      function toggle() {
        if (combo.classList.contains("is-open")) closeCombo(combo, false);
        else openMenu();
      }

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        toggle();
      });

      trigger.addEventListener("keydown", function (e) {
        var isOpen = combo.classList.contains("is-open");
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!isOpen) openMenu();
          else setActive(activeIndex + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (!isOpen) openMenu();
          else setActive(activeIndex - 1);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isOpen) {
            openMenu();
            return;
          }
          var items = menu.querySelectorAll(".facelit-combo__option");
          if (items[activeIndex]) {
            choose(items[activeIndex].getAttribute("data-value") || "");
          }
        }
      });

      menu.addEventListener("click", function (e) {
        var btn = e.target.closest(".facelit-combo__option");
        if (!btn || !menu.contains(btn)) return;
        choose(btn.getAttribute("data-value") || "");
      });

      select.addEventListener("change", syncFromSelect);

      var form = select.closest("form");
      if (form && !form.dataset.facelitSelectReset) {
        form.dataset.facelitSelectReset = "1";
        form.addEventListener("reset", function () {
          window.setTimeout(function () {
            form.querySelectorAll("select.facelit-select").forEach(function (s) {
              s.dispatchEvent(new Event("change", { bubbles: true }));
            });
          }, 0);
        });
      }

      syncFromSelect();
    });
  }

  function initLocationsChecker() {
    var form = document.querySelector("[data-locations-checker]");
    if (!form) return;

    var branchSelect = form.querySelector("[data-loc-branch]");
    var doctorSelect = form.querySelector("[data-loc-doctor]");
    var submitBtn = form.querySelector("[data-loc-submit]");
    var statusEl = form.querySelector("[data-loc-status]");
    var resultEl = form.querySelector("[data-loc-result]");
    var cards = document.querySelectorAll("[data-loc-card]");
    var payload = window.facelitLocations || null;

    if (!branchSelect || !doctorSelect || !submitBtn) return;

    initFormSelects(form);

    function parseLocationIds(option) {
      if (!option) return [];
      var raw = option.getAttribute("data-location-ids");
      if (!raw) return [];
      try {
        var parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.map(Number) : [];
      } catch (e) {
        return [];
      }
    }

    function setStatus(message, kind) {
      if (!statusEl || !resultEl) return;
      if (!message) {
        resultEl.hidden = true;
        statusEl.textContent = "";
        statusEl.classList.remove("is-success", "is-error");
        return;
      }
      resultEl.hidden = false;
      statusEl.classList.remove("is-success", "is-error");
      if (kind) statusEl.classList.add(kind);
      statusEl.innerHTML = message;
    }

    function doctorNameFromOption(option) {
      if (!option) return "";
      var named = option.getAttribute("data-doctor-name");
      if (named) return named.trim();
      return option.textContent.trim();
    }

    function branchLabelFromId(branchId) {
      if (payload && payload.locations) {
        var match = payload.locations.find(function (loc) {
          return Number(loc.id) === branchId;
        });
        if (match) {
          return match.district ? match.label + ", " + match.district : match.label;
        }
      }
      if (branchSelect.selectedIndex > -1) {
        return branchSelect.options[branchSelect.selectedIndex].textContent
          .trim()
          .replace(" — ", ", ");
      }
      return "";
    }

    function syncComboVisibility(select) {
      var wrap = select.closest(".follow-border-inner");
      var combo = wrap ? wrap.querySelector(".facelit-combo") : null;
      var menu = combo && combo._menu ? combo._menu : null;
      var trigger = combo ? combo.querySelector(".facelit-combo__trigger") : null;
      if (trigger) trigger.disabled = !!select.disabled;
      if (!menu) return;

      menu.querySelectorAll(".facelit-combo__option").forEach(function (btn) {
        var value = btn.getAttribute("data-value") || "";
        var opt = select.querySelector('option[value="' + value + '"]');
        var show = !!(opt && !opt.hidden && !opt.disabled);
        btn.hidden = !show;
        btn.style.display = show ? "" : "none";
      });
    }

    function doctorIsAvailable(branchId, doctorId) {
      if (payload && Array.isArray(payload.doctors)) {
        var match = payload.doctors.find(function (doc) {
          return Number(doc.id) === doctorId;
        });
        if (match) {
          return (match.locations || []).map(Number).indexOf(branchId) !== -1;
        }
      }
      var opt = doctorSelect.querySelector('option[value="' + doctorId + '"]');
      return parseLocationIds(opt).indexOf(branchId) !== -1;
    }

    function syncDoctorOptions() {
      var branchId = Number(branchSelect.value || 0);
      var hadValue = doctorSelect.value;
      var options = Array.prototype.slice.call(doctorSelect.options);
      var visibleCount = 0;

      options.forEach(function (opt, idx) {
        if (idx === 0) {
          opt.hidden = false;
          opt.disabled = true;
          return;
        }
        var ids = parseLocationIds(opt);
        var show = branchId > 0 && ids.indexOf(branchId) !== -1;
        opt.hidden = !show;
        opt.disabled = !show;
        if (show) visibleCount += 1;
      });

      doctorSelect.disabled = branchId < 1 || visibleCount === 0;
      if (branchId < 1 || visibleCount === 0) {
        doctorSelect.value = "";
      } else if (hadValue) {
        var current = doctorSelect.querySelector('option[value="' + hadValue + '"]');
        if (!current || current.disabled) {
          doctorSelect.value = "";
        }
      }

      doctorSelect.dispatchEvent(new Event("change", { bubbles: true }));
      syncComboVisibility(doctorSelect);
    }

    function syncSubmitState() {
      var ready = Number(branchSelect.value || 0) > 0 && Number(doctorSelect.value || 0) > 0;
      submitBtn.disabled = !ready;
    }

    function highlightCard(branchId) {
      cards.forEach(function (card) {
        var id = Number(card.getAttribute("data-loc-card") || 0);
        card.classList.toggle("is-active", id === branchId);
      });
    }

    branchSelect.addEventListener("change", function () {
      setStatus("", "");
      syncDoctorOptions();
      syncSubmitState();
      highlightCard(Number(branchSelect.value || 0));
    });

    doctorSelect.addEventListener("change", function () {
      setStatus("", "");
      syncSubmitState();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var branchId = Number(branchSelect.value || 0);
      var doctorId = Number(doctorSelect.value || 0);
      if (!branchId || !doctorId) return;

      var branchLabel = branchLabelFromId(branchId);
      var doctorOption =
        doctorSelect.options[doctorSelect.selectedIndex] || null;
      var doctorLabel = doctorNameFromOption(doctorOption);

      if (!doctorIsAvailable(branchId, doctorId)) {
        setStatus(
          (doctorLabel || "This doctor") +
            " is not available at <strong>" +
            branchLabel +
            "</strong>. Choose another branch or doctor.",
          "is-error"
        );
        return;
      }

      var bookUrl =
        (payload && payload.appointmentUrl) || "/appointment/";

      setStatus(
        doctorLabel +
          " is available at <strong>" +
          branchLabel +
          "</strong>. <a href=\"" +
          bookUrl +
          "\">Book a consultation</a>.",
        "is-success"
      );
    });

    syncDoctorOptions();
    syncSubmitState();
  }

  function initBookingForms() {
    var forms = document.querySelectorAll("[data-booking-form]");
    initFormSelects(document);
    if (!forms.length) return;

    var endpoint =
      (window.facelitMailer && window.facelitMailer.bookingUrl) ||
      "/wp-json/facelit/v1/booking";
    var whatsappGoUrl =
      (window.facelitMailer && window.facelitMailer.whatsappGoUrl) ||
      "/wp-json/facelit/v1/whatsapp-go";
    var callGoUrl =
      (window.facelitMailer && window.facelitMailer.callGoUrl) ||
      "/wp-json/facelit/v1/call-go";

    function readBookingPayload(form) {
      var fd = new FormData(form);
      var variant = form.getAttribute("data-booking-variant") || "appointment";
      return {
        formType: String(fd.get("formType") || variant || "appointment").trim(),
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        location: String(fd.get("location") || "").trim(),
        source: form.getAttribute("data-booking-source") || "website",
        pageUrl: window.location.href,
        treatment: String(fd.get("treatment") || "").trim(),
        timing: String(fd.get("timing") || "").trim(),
        message: String(fd.get("message") || "").trim(),
        gender: String(fd.get("gender") || "").trim(),
        regarding: String(fd.get("regarding") || "").trim(),
        website: String(fd.get("website") || "").trim(),
        heardAbout: String(fd.get("heardAbout") || "").trim(),
        medicalHistory: String(fd.get("medicalHistory") || "").trim(),
        existingConditions: String(fd.get("existingConditions") || "").trim(),
        pastSurgeries: String(fd.get("pastSurgeries") || "").trim(),
        priorTreatment: String(fd.get("priorTreatment") || "").trim(),
        adverseReaction: String(fd.get("adverseReaction") || "").trim(),
      };
    }

    function validateBookingPayload(payload) {
      // Consultation intake: name + phone (email optional).
      if (payload.formType === "consultation") {
        if (!payload.name || payload.phone.length < 7) {
          return "Please fill in name and phone.";
        }
        if (payload.email && !isValidEmail(payload.email)) {
          return "Please enter a valid email.";
        }
        return "";
      }
      // Appointment / contact / homepage — same required set as WhatsApp.
      if (
        !payload.name ||
        payload.phone.length < 7 ||
        !payload.treatment ||
        !payload.location
      ) {
        return "Please fill in name, phone, treatment, and location.";
      }
      if (payload.email && !isValidEmail(payload.email)) {
        return "Please enter a valid email.";
      }
      return "";
    }

    function validateWhatsAppPayload(payload) {
      return validateBookingPayload(payload);
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
    }

    function ensureBookingStatus(form) {
      var status = form.querySelector("[data-booking-status]");
      if (status) return status;
      status = document.createElement("p");
      status.setAttribute("data-booking-status", "");
      var onDark = !!form.closest(".bg-forest");
      status.className = onDark
        ? "pt-2 text-sm text-cream/80"
        : "pt-2 text-sm text-ink-soft";
      status.setAttribute("role", "status");
      form.appendChild(status);
      return status;
    }

    function showBookingStatus(form, message) {
      var status = ensureBookingStatus(form);
      status.textContent = message || "";
    }

    function waNumberFromLink(link) {
      var number = String(link.getAttribute("data-wa-number") || "").replace(
        /\D+/g,
        ""
      );
      if (number) return number;
      var hrefMatch = String(link.getAttribute("href") || "").match(
        /(?:wa\.me\/|n=)(\d+)/
      );
      return hrefMatch ? hrefMatch[1] : "";
    }

    /** Tracking redirect — works for left/right/middle click open when enabled. */
    function buildGoHref(baseUrl, number, payload) {
      var params = new URLSearchParams();
      params.set("n", number);
      Object.keys(payload).forEach(function (key) {
        var value = payload[key];
        if (value) params.set(key, String(value));
      });
      var base = String(baseUrl);
      return base + (base.indexOf("?") >= 0 ? "&" : "?") + params.toString();
    }

    function buildWhatsAppGoHref(number, payload) {
      return buildGoHref(whatsappGoUrl, number, payload);
    }

    function buildCallGoHref(number, payload) {
      return buildGoHref(callGoUrl, number, payload);
    }

    function setActionLinkEnabled(link, enabled, baseAttr) {
      var baseClass = link.getAttribute(baseAttr);
      if (!baseClass) {
        baseClass = link.className
          .replace(/\bopacity-50\b/g, "")
          .replace(/\bpointer-events-none\b/g, "")
          .replace(/\scursor-not-allowed\b/g, "")
          .replace(/\s+/g, " ")
          .trim();
        link.setAttribute(baseAttr, baseClass);
      }
      if (enabled) {
        link.className = baseClass;
        link.setAttribute("aria-disabled", "false");
        link.removeAttribute("tabindex");
      } else {
        // Dimmed but still clickable so we can show the missing-fields message.
        link.className = baseClass + " opacity-50 cursor-not-allowed";
        link.setAttribute("aria-disabled", "true");
      }
    }

    function setWhatsAppEnabled(link, enabled) {
      setActionLinkEnabled(link, enabled, "data-wa-base-class");
    }

    function setCallEnabled(link, enabled) {
      setActionLinkEnabled(link, enabled, "data-call-base-class");
    }

    function callNumberForForm(form, link) {
      var mapRaw = link.getAttribute("data-call-numbers") || "";
      var map = null;
      try {
        map = mapRaw ? JSON.parse(mapRaw) : null;
      } catch (err) {
        map = null;
      }
      var location = String(
        (form.querySelector('[name="location"]') || {}).value || ""
      ).trim();
      if (map && location && map[location]) {
        return String(map[location]).replace(/\D+/g, "");
      }
      var fallback = String(
        link.getAttribute("data-call-number") || ""
      ).replace(/\D+/g, "");
      return fallback;
    }

    function syncWhatsAppLinks(form) {
      var links = form.querySelectorAll("[data-booking-whatsapp]");
      if (!links.length) return true;
      var payload = readBookingPayload(form);
      var error = validateWhatsAppPayload(payload);
      var ready = !error;
      links.forEach(function (link) {
        var number = waNumberFromLink(link);
        if (!number) return;
        link.setAttribute("data-wa-number", number);
        if (ready) {
          link.setAttribute("href", buildWhatsAppGoHref(number, payload));
          setWhatsAppEnabled(link, true);
        } else {
          // No usable href until required fields are filled (blocks right-click open).
          link.setAttribute("href", "#");
          link.removeAttribute("target");
          setWhatsAppEnabled(link, false);
        }
      });
      return ready;
    }

    function syncCallLinks(form) {
      var links = form.querySelectorAll("[data-booking-call]");
      if (!links.length) return true;
      var payload = readBookingPayload(form);
      var error = validateWhatsAppPayload(payload);
      var ready = !error;
      links.forEach(function (link) {
        var number = callNumberForForm(form, link);
        if (!number) return;
        link.setAttribute("data-call-number", number);
        if (ready) {
          link.setAttribute("href", buildCallGoHref(number, payload));
          setCallEnabled(link, true);
        } else {
          link.setAttribute("href", "#");
          setCallEnabled(link, false);
        }
      });
      return ready;
    }

    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (form.dataset.submitting === "1") return;

        var btn = form.querySelector('button[type="submit"]');
        var originalLabel = btn ? String(btn.textContent || "").trim() : "";
        var status = form.querySelector("[data-booking-status]");

        function showStatus(message) {
          showBookingStatus(form, message);
        }

        function setBusy(busy) {
          if (!btn) return;
          if (busy) {
            btn.dataset.originalLabel = originalLabel;
            btn.style.minWidth = btn.getBoundingClientRect().width + "px";
            btn.textContent = "Submitting...";
            btn.disabled = true;
            btn.setAttribute("aria-busy", "true");
            return;
          }
          btn.textContent = btn.dataset.originalLabel || originalLabel || "";
          btn.style.minWidth = "";
          btn.disabled = false;
          btn.removeAttribute("aria-busy");
        }

        var payload = readBookingPayload(form);
        var validationError = validateBookingPayload(payload);
        if (validationError) {
          showStatus(validationError);
          return;
        }

        form.dataset.submitting = "1";
        setBusy(true);
        if (status) status.textContent = "";

        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok, data: data };
            });
          })
          .then(function (result) {
            if (!result.ok) {
              var msg =
                (result.data && (result.data.message || result.data.code)) ||
                "Something went wrong. Please try again.";
              showStatus(String(msg));
              return;
            }
            var leadId = result.data && result.data.id ? String(result.data.id) : "";
            var thankYou =
              (window.facelitMailer && window.facelitMailer.thankYouUrl) ||
              "/thank-you/";
            thankYou = String(thankYou).split("#")[0].split("?")[0];
            if (thankYou.charAt(thankYou.length - 1) !== "/") {
              thankYou += "/";
            }
            if (leadId) {
              try {
                window.sessionStorage.setItem("facelit_lead_id", leadId);
              } catch (err2) {}
            }
            form.dataset.redirecting = "1";
            window.location.assign(thankYou);
            return;
            showStatus(
              (result.data && result.data.message) ||
                "Thanks — we'll reach out shortly."
            );
            form.reset();
          })
          .catch(function () {
            showStatus("Network error. Please try again.");
          })
          .finally(function () {
            if (form.dataset.redirecting === "1") return;
            form.dataset.submitting = "0";
            setBusy(false);
          });
      });

      function syncActionLinks() {
        syncWhatsAppLinks(form);
        syncCallLinks(form);
      }

      var waLinks = form.querySelectorAll("[data-booking-whatsapp]");
      var callLinks = form.querySelectorAll("[data-booking-call]");
      if (waLinks.length || callLinks.length) {
        syncActionLinks();
        form.addEventListener("input", syncActionLinks);
        form.addEventListener("change", syncActionLinks);
      }

      if (waLinks.length) {
        waLinks.forEach(function (link) {
          link.addEventListener("click", function (e) {
            var ready = syncWhatsAppLinks(form);
            if (!ready) {
              e.preventDefault();
              var err = validateWhatsAppPayload(readBookingPayload(form));
              showBookingStatus(
                form,
                err || "Please fill in the required fields before WhatsApp."
              );
              return;
            }
            // Restore new-tab behavior once enabled.
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
          });
          link.addEventListener("pointerdown", function () {
            syncWhatsAppLinks(form);
          });
          link.addEventListener("contextmenu", function (e) {
            var ready = syncWhatsAppLinks(form);
            if (!ready) {
              e.preventDefault();
              showBookingStatus(
                form,
                "Please fill in name, phone, treatment, and location before WhatsApp."
              );
            }
          });
        });
      }

      if (callLinks.length) {
        callLinks.forEach(function (link) {
          link.addEventListener("click", function (e) {
            var ready = syncCallLinks(form);
            if (!ready) {
              e.preventDefault();
              var err = validateWhatsAppPayload(readBookingPayload(form));
              showBookingStatus(
                form,
                err || "Please fill in the required fields before calling."
              );
            }
          });
          link.addEventListener("pointerdown", function () {
            syncCallLinks(form);
          });
          link.addEventListener("contextmenu", function (e) {
            var ready = syncCallLinks(form);
            if (!ready) {
              e.preventDefault();
              showBookingStatus(
                form,
                "Please fill in name, phone, treatment, and location before calling."
              );
            }
          });
        });
      }
    });
  }

  /* ---------- Boot ---------- */
  initMobileMenu();
  initNavMegas();
  initReveal();
  initHeroMarquee();
  initHeroLock();
  initRipple();
  initTreatmentsStack();
  initBeforeAfter();
  initReviewTicker();
  initReviewsScroller();
  initEcoMachinesScroller();
  initHubJourneyScroller();
  initLocationsChecker();
  initBookingForms();
})();
