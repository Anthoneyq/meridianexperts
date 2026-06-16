/* ------------------------------------------------------------------
   Exhibit compare viewer — photograph ⇄ blueprint of the same building.
   Drag the gold divider (or any point once both layers are filled) to
   wipe between the real building and its blueprint. Mode buttons snap
   to Photograph / Compare / Blueprint. Built to host real iGuide stills
   dropped into the two <image-slot> layers.
------------------------------------------------------------------ */
(function () {
  var v = document.getElementById('xviewer');
  if (!v) return;

  var MIN = 4, MAX = 96;          // clamp so a sliver of each layer always shows
  var handle = document.getElementById('xhandle');
  var dragging = false;

  function setSplit(pct, anim) {
    pct = Math.max(MIN, Math.min(MAX, pct));
    v.classList.toggle('is-anim', !!anim);
    v.style.setProperty('--split', pct + '%');
  }

  function splitFromEvent(e) {
    var r = v.getBoundingClientRect();
    setSplit((e.clientX - r.left) / r.width * 100, false);
  }

  function move(e) { if (dragging) splitFromEvent(e); }
  function up() {
    dragging = false;
    v.classList.remove('is-dragging');
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
  }
  function startDrag(e) {
    dragging = true;
    v.classList.add('is-dragging');
    splitFromEvent(e);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    e.preventDefault();
  }

  // The handle always initiates a drag. A press anywhere else on the frame
  // also drags — UNLESS it lands on an unfilled slot, where the press should
  // reach the slot's own "browse files" affordance.
  handle.addEventListener('pointerdown', startDrag);
  v.addEventListener('pointerdown', function (e) {
    if (e.target.closest('#xhandle')) return;            // handled above
    var slot = e.target.closest('image-slot');
    if (slot && !slot.hasAttribute('data-filled')) return; // let the user fill it
    startDrag(e);
  });

  // Keyboard nudge on the handle for accessibility.
  handle.addEventListener('keydown', function (e) {
    var cur = parseFloat(getComputedStyle(v).getPropertyValue('--split')) || 55;
    if (e.key === 'ArrowLeft') { setSplit(cur - 4, true); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setSplit(cur + 4, true); e.preventDefault(); }
  });

  // Mode buttons. Reveal layer (blueprint) is clipped from the LEFT by
  // --split, so a HIGH split = mostly photograph, LOW split = mostly blueprint.
  var btns = Array.prototype.slice.call(document.querySelectorAll('[data-xmode]'));
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var m = b.getAttribute('data-xmode');
      btns.forEach(function (x) { x.classList.toggle('is-active', x === b); });
      setSplit(m === 'photo' ? MAX : m === 'blueprint' ? MIN : 50, true);
    });
  });
})();
