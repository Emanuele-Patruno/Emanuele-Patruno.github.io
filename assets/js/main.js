/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        // 90px: header fisso (4.5rem = 72px) + margine, così la sezione
        // cliccata dalla nav risulta subito attiva
        const sectionTop = current.offsetTop - 90;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
} else if (systemDark.matches) {
  // No saved choice: follow the system preference
  document.body.classList.add(darkTheme)
  themeButton.classList.add(iconTheme)
}

// Keep following the system preference until the user picks a theme manually
systemDark.addEventListener('change', (e) => {
  if (localStorage.getItem('selected-theme')) return
  document.body.classList[e.matches ? 'add' : 'remove'](darkTheme)
  themeButton.classList[e.matches ? 'add' : 'remove'](iconTheme)
})

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== KONAMI CODE / MGS EASTER EGG ====================*/
;(function() {
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let progress = 0
    let active = false
    let codecAudio = null
    let mgsActivated = false

    function t(key) {
        const lang = localStorage.getItem('lang') || 'en'
        return window.translations?.[lang]?.[key] ?? window.translations?.en?.[key] ?? key
    }

    // Build MGS calling screen
    const callingScreen = document.createElement('div')
    callingScreen.className = 'mgs-calling-screen'
    callingScreen.innerHTML = `
        <div class="mgs-calling-inner">
            <div class="mgs-calling-freq">140.85</div>
            <div class="mgs-calling-portrait">
                <img src="assets/img/mgs-portrait.webp" alt="Emanuele">
                <div class="mgs-scan-thick"></div>
            </div>
            <div class="mgs-calling-label">&#9670; INCOMING TRANSMISSION &#9670;</div>
            <div class="mgs-calling-answer">[ press any key to answer ]</div>
        </div>
        <div class="mgs-scanlines"></div>
    `
    document.body.appendChild(callingScreen)

    // Build MGS codec screen
    const codecScreen = document.createElement('div')
    codecScreen.className = 'mgs-codec-screen'
    codecScreen.innerHTML = `
        <div class="mgs-inner">
            <div class="mgs-freq-bar">Codec Frequency &nbsp;&#10073;&nbsp; 140.85</div>
            <div class="mgs-content">
                <div class="mgs-portrait-wrap">
                    <img src="assets/img/mgs-portrait.webp" alt="Emanuele">
                    <div class="mgs-scan-thick"></div>
                    <div class="mgs-portrait-name">EMANUELE</div>
                </div>
                <div class="mgs-dialogue-wrap">
                    <p class="mgs-dialogue-text"></p>
                </div>
            </div>
            <div class="mgs-footer-bar">[ premi un tasto per chiudere ]</div>
        </div>
        <div class="mgs-scanlines"></div>
    `
    document.body.appendChild(codecScreen)

    function typeMessage(text, onDone) {
        const el = codecScreen.querySelector('.mgs-dialogue-text')
        el.textContent = ''
        const cursor = document.createElement('span')
        cursor.className = 'mgs-text-cursor'
        el.appendChild(cursor)
        let i = 0
        ;(function type() {
            if (i < text.length) {
                el.insertBefore(document.createTextNode(text[i++]), cursor)
                setTimeout(type, 38)
            } else {
                cursor.remove()
                if (onDone) onDone()
            }
        })()
    }

    function stopAudio() {
        if (codecAudio) { codecAudio.pause(); codecAudio.currentTime = 0; codecAudio = null }
    }

    function closeCodec() {
        if (!active) return
        active = false
        document.removeEventListener('keydown', closeCodec)
        codecScreen.removeEventListener('click', closeCodec)

        // Audio di chiusura chiamata
        const closeAudio = new Audio('assets/audio/closed-call.mp3')
        closeAudio.volume = 0.8
        closeAudio.play().catch(() => {})

        // Blackout immediato: copre il codec prima ancora che parta l'animazione
        const blackout = document.createElement('div')
        blackout.style.cssText = 'position:fixed;inset:0;background:#020802;z-index:910;pointer-events:none;'
        document.body.appendChild(blackout)

        // Animazione di CHIUSURA: schermo verde che si restringe a una riga
        const shutdown = document.createElement('div')
        shutdown.className = 'screen-shutdown'
        shutdown.style.zIndex = '99992'
        document.body.appendChild(shutdown)

        shutdown.addEventListener('animationend', () => {
            shutdown.remove()
            // Disabilita le transizioni CSS per un hide istantaneo
            codecScreen.style.transition  = 'none'
            callingScreen.style.transition = 'none'
            codecScreen.classList.remove('visible')
            callingScreen.classList.remove('visible')
            // Doppio rAF: assicura che il browser abbia dipinto lo stato nascosto
            // prima di rimuovere il blackout
            requestAnimationFrame(() => requestAnimationFrame(() => {
                blackout.remove()
                codecScreen.style.transition  = ''
                callingScreen.style.transition = ''
                activateMGSMode()
            }))
        })
    }

    function showCodecMessage() {
        callingScreen.classList.remove('visible')

        const blackout = document.createElement('div')
        blackout.style.cssText = 'position:fixed;inset:0;background:#020802;z-index:850;pointer-events:none;'
        document.body.appendChild(blackout)

        // Animazione di APERTURA: riga che si espande a tutto schermo
        const startup = document.createElement('div')
        startup.className = 'screen-startup'
        document.body.appendChild(startup)

        startup.addEventListener('animationend', () => {
            startup.remove()
            codecScreen.classList.add('visible')
            setTimeout(() => {
                codecScreen.querySelector('.mgs-footer-bar').textContent = t('mgs_close')
                blackout.remove()
                typeMessage(t('mgs_message'))
                setTimeout(() => {
                    document.addEventListener('keydown', closeCodec)
                    codecScreen.addEventListener('click', closeCodec)
                }, 1000)
            }, 400)
        })
    }

    function triggerMGS() {
        if (active) return
        active = true

        // Aggiorna testi calling screen con la lingua corrente
        callingScreen.querySelector('.mgs-calling-label').innerHTML  = t('mgs_incoming')
        callingScreen.querySelector('.mgs-calling-answer').textContent = t('mgs_answer')

        // Play codec ringtone
        codecAudio = new Audio('assets/audio/Ring Tone Metal Gear Solid Codec.mp3')
        codecAudio.loop = true
        codecAudio.volume = 0.7
        codecAudio.play().catch(() => {})

        // Show calling screen
        callingScreen.classList.add('visible')

        function answer() {
            document.removeEventListener('keydown', answer)
            callingScreen.removeEventListener('click', answer)
            clearTimeout(autoTimer)
            stopAudio()
            const responseAudio = new Audio('assets/audio/response_call.mp3')
            responseAudio.volume = 0.8
            responseAudio.play().catch(() => {})
            setTimeout(showCodecMessage, 200)
        }

        const autoTimer = setTimeout(answer, 5000)
        setTimeout(() => {
            document.addEventListener('keydown', answer)
            callingScreen.addEventListener('click', answer)
        }, 600)
    }

    function activateMGSMode() {
        if (mgsActivated) return
        mgsActivated = true

        // 1. Tema verde — cambia --hue-color da 250 (viola) a 142 (verde)
        document.documentElement.style.setProperty('--hue-color', '142')

        // 2. Scanlines su tutto il sito
        const scanlines = document.createElement('div')
        scanlines.className = 'site-scanlines'
        document.body.appendChild(scanlines)

        const scanBand = document.createElement('div')
        scanBand.className = 'site-scan-band'
        document.body.appendChild(scanBand)

        if (typeof window.mgsSpawnGuards === 'function' && window.innerWidth > 768) window.mgsSpawnGuards()
    }

    document.addEventListener('keydown', (e) => {
        if (active || mgsActivated) return
        if (e.key === sequence[progress]) {
            progress++
            if (progress === sequence.length) {
                progress = 0
                triggerMGS()
            }
        } else {
            progress = e.key === sequence[0] ? 1 : 0
        }
    })
})()

/*==================== EASTER EGG — PHOTO FLIP KONAMI HINT ====================*/
;(function() {
    const flip = document.querySelector('.about__img-flip')
    if (!flip) return
    flip.addEventListener('click', () => {
        flip.classList.toggle('flipped')
    })
})()

/*==================== EASTER EGG — LONG PRESS LOGO ====================*/
;(function() {
    const quotes = [
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
        { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
        { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    ]

    const overlay = document.createElement('div')
    overlay.className = 'easter-overlay'
    overlay.innerHTML = `
        <p class="easter-quote"></p>
        <span class="easter-author"></span>
        <span class="easter-hint">click anywhere to close</span>
    `
    document.body.appendChild(overlay)

    let pressTimer = null
    const logo = document.querySelector('.nav__logo')

    function triggerEasterEgg() {
        const q = quotes[Math.floor(Math.random() * quotes.length)]
        overlay.querySelector('.easter-quote').textContent = '"' + q.text + '"'
        overlay.querySelector('.easter-author').textContent = '— ' + q.author
        overlay.classList.add('visible')
    }

    function startPress() {
        pressTimer = setTimeout(triggerEasterEgg, 2000)
    }
    function cancelPress() {
        clearTimeout(pressTimer)
    }

    if (logo) {
        logo.addEventListener('mousedown', startPress)
        logo.addEventListener('mouseup', cancelPress)
        logo.addEventListener('mouseleave', cancelPress)
        logo.addEventListener('touchstart', startPress, { passive: true })
        logo.addEventListener('touchend', cancelPress)
    }

    overlay.addEventListener('click', () => overlay.classList.remove('visible'))
})()

/*==================== CUSTOM CURSOR ====================*/
if (window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-custom-cursor')

    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
        dot.style.left = mouseX + 'px'
        dot.style.top = mouseY + 'px'
    })

    ;(function animateRing() {
        ringX += (mouseX - ringX) * 0.12
        ringY += (mouseY - ringY) * 0.12
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
        requestAnimationFrame(animateRing)
    })()
}

/*==================== TYPEWRITER EFFECT ====================*/
const typewriterEl = document.querySelector('.home__subtitle')
let twTimer = null

function startTypewriter(text) {
    if (!typewriterEl) return
    clearTimeout(twTimer)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typewriterEl.textContent = text
        return
    }
    typewriterEl.textContent = ''
    const cursor = document.createElement('span')
    cursor.className = 'typewriter-cursor'
    typewriterEl.appendChild(cursor)
    let i = 0
    ;(function type() {
        if (i < text.length) {
            typewriterEl.insertBefore(document.createTextNode(text[i++]), cursor)
            twTimer = setTimeout(type, 50)
        }
    })()
}

document.addEventListener('languageSet', (e) => {
    const text = window.translations?.[e.detail.lang]?.home_subtitle || ''
    startTypewriter(text)
})

/*==================== SCROLL REVEAL ====================*/
const revealSelectors = [
    '.about__img', '.about__data',
    '.skills__content',
    '.qualification__data',
    '.contact__information', '.contact__form'
]

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

document.querySelectorAll(revealSelectors.join(',')).forEach((el, i) => {
    if (prefersReducedMotion) {
        el.classList.add('reveal', 'reveal--visible')
    } else {
        el.classList.add('reveal')
        el.style.transitionDelay = (i % 4) * 0.1 + 's'
    }
})

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            revealObs.unobserve(entry.target)
        }
    })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

/*==================== HERO PARALLAX ====================*/
;(function() {
    const heroImg = document.querySelector('.home__img')
    if (!heroImg || prefersReducedMotion) return
    window.addEventListener('scroll', () => {
        heroImg.style.transform = `translateY(${window.scrollY * 0.12}px)`
    }, { passive: true })
})()

/*==================== TEXT SPLIT REVEAL ====================*/
;(function initSplitReveal() {
    const SELECTOR = '.section__title'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function splitAndObserve(el) {
        // Skip if already split or inside the hero (typewriter handles that)
        if (el.dataset.split || el.closest('.home')) return
        el.dataset.split = '1'

        // Save plain text for i18n re-splits
        const plainText = el.dataset.splitText || el.textContent.trim()
        el.dataset.splitText = plainText

        if (reduced) return  // skip animation, keep plain text

        // Wrap each word in a .sr-word span containing .sr-char spans
        el.innerHTML = plainText
            .split(' ')
            .map((word, wi) =>
                `<span class="sr-word" aria-hidden="true">${
                    word.split('').map((ch, ci) =>
                        `<span class="sr-char" style="--i:${wi * 6 + ci}">${ch}</span>`
                    ).join('')
                }</span>`
            ).join(' ')

        // Accessible: keep original text for screen readers
        el.setAttribute('aria-label', plainText)
    }

    function revealEl(el) {
        if (el.dataset.revealed) return
        el.dataset.revealed = '1'
        el.querySelectorAll('.sr-char').forEach(ch => ch.classList.add('sr-char--visible'))
    }

    function init() {
        document.querySelectorAll(SELECTOR).forEach(splitAndObserve)

        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) revealEl(e.target) })
        }, {
            rootMargin: '0px 0px -35% 0px',  // triggers only when title is well within viewport
            threshold: 0
        })

        document.querySelectorAll(`${SELECTOR}[data-split]`).forEach(el => observer.observe(el))
    }

    // Re-split on language change (i18n updates textContent)
    function reInit() {
        document.querySelectorAll(SELECTOR).forEach(el => {
            if (!el.closest('.home')) {
                delete el.dataset.split
                delete el.dataset.revealed
            }
        })
        init()
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init)
    } else {
        init()
    }

    // Hook into language toggle buttons
    document.addEventListener('click', e => {
        if (e.target.closest('.lang-btn, [data-lang]')) {
            setTimeout(reInit, 50)
        }
    })
})()

/*==================== MGS GUARDS EASTER EGG ====================*/
;(function initMGSGuards() {
    const FW    = 62
    const SPEED = 60  // px/s

    const placements = [
        { sectionId: 'about',     fraction: 0.35 },
        { sectionId: 'skills',    fraction: 0.55 },
        { sectionId: 'portfolio', fraction: 0.4  },
    ]

    const guards = []

    function rand(min, max) { return min + Math.random() * (max - min) }

    function pickState(s) {
        const r = Math.random()
        if      (r < 0.35) s.moveState = 'walkRight'
        else if (r < 0.70) s.moveState = 'walkLeft'
        else                s.moveState = 'idle'
        s.stateDuration = s.moveState === 'idle'
            ? rand(600, 2200)
            : rand(1200, 3500)
        s.stateElapsed = 0
    }

    function applyClass(s) {
        s.el.classList.remove('mgs-guard--right', 'mgs-guard--left', 'mgs-guard--idle-right', 'mgs-guard--idle-left')
        if      (s.moveState === 'walkRight') s.el.classList.add('mgs-guard--right')
        else if (s.moveState === 'walkLeft')  s.el.classList.add('mgs-guard--left')
        else s.el.classList.add(s.lastDir === 'left' ? 'mgs-guard--idle-left' : 'mgs-guard--idle-right')
    }

    function createGuard({ sectionId, fraction }) {
        const section = document.getElementById(sectionId)
        if (!section) return

        const rect = section.getBoundingClientRect()
        const minX = rect.left + window.scrollX
        const topY = rect.top  + window.scrollY + section.offsetHeight * fraction
        const maxX = minX + section.offsetWidth - FW

        const el = document.createElement('div')
        el.className = 'mgs-guard mgs-guard--right'
        el.setAttribute('aria-hidden', 'true')
        el.style.top  = Math.round(topY) + 'px'
        el.style.left = Math.round(minX) + 'px'

        const state = {
            el, x: minX + (maxX - minX) * Math.random(),
            minX, maxX,
            moveState: 'idle', stateElapsed: 0, stateDuration: rand(400, 1200),
            lastDir: 'right', alerting: false
        }

        el.addEventListener('mouseenter', () => {
            if (state.alerting) return
            state.alerting = true
            el.classList.add('mgs-guard--alert')

            const excl = document.createElement('span')
            excl.className = 'mgs-guard-exclaim'
            excl.textContent = '!'
            // Append to body to escape clip-path, position over guard's head
            excl.style.position = 'absolute'
            excl.style.left = (parseFloat(el.style.left) + el.offsetWidth * 0.6) + 'px'
            excl.style.top  = (parseFloat(el.style.top)  - 38) + 'px'
            document.body.appendChild(excl)

            new Audio('assets/audio/Alert_sound.mp3').play().catch(() => {})

            setTimeout(() => {
                state.alerting = false
                el.classList.remove('mgs-guard--alert')
                excl.remove()
                pickState(state)
                applyClass(state)
            }, 2500)
        })

        document.body.appendChild(el)
        guards.push(state)
    }

    let last = null
    function tick(ts) {
        const dt = last ? Math.min(ts - last, 50) : 0
        last = ts

        guards.forEach(s => {
            if (s.alerting) return

            s.stateElapsed += dt
            if (s.stateElapsed >= s.stateDuration) { pickState(s); applyClass(s) }

            if (s.moveState === 'walkRight') {
                s.x += SPEED * dt / 1000
                if (s.x >= s.maxX) { s.x = s.maxX; pickState(s); applyClass(s) }
                s.lastDir = 'right'
            } else if (s.moveState === 'walkLeft') {
                s.x -= SPEED * dt / 1000
                if (s.x <= s.minX) { s.x = s.minX; pickState(s); applyClass(s) }
                s.lastDir = 'left'
            }

            s.el.style.left = s.x + 'px'
        })
        requestAnimationFrame(tick)
    }

    window.mgsSpawnGuards = function () {
        if (guards.length) return   // already spawned
        placements.forEach(createGuard)
        requestAnimationFrame(tick)
    }
})()

/*==================== ANIMATED COUNTERS ====================*/
const counterEls = document.querySelectorAll('.about__info-title[data-target]')

function scrambleCounter(el, target, onDone, duration = 900) {
    const start = performance.now()
    let frameCount = 0

    function frame(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        frameCount++

        if (progress < 0.5) {
            // Scramble phase: update every 4 frames so numbers feel readable, not frantic
            if (frameCount % 4 === 0) {
                el.textContent = Math.floor(Math.random() * 90 + 10) + '+'
            }
        } else {
            // Settle phase: ease towards target
            const t = (progress - 0.5) / 0.5
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            el.textContent = Math.round(eased * target) + '+'
        }

        if (progress < 1) {
            requestAnimationFrame(frame)
        } else {
            el.textContent = target + '+'
            if (onDone) onDone()
        }
    }

    requestAnimationFrame(frame)
}

window.addEventListener('load', () => {
    let done = false
    const interval = setInterval(() => {
        if (done) { clearInterval(interval); return }
        const info = document.querySelector('.about__info')
        if (!info) return
        const r = info.getBoundingClientRect()
        if (r.bottom > 0 && r.top < window.innerHeight) {
            done = true
            clearInterval(interval)
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            document.querySelectorAll('.about__info-title[data-target]').forEach(el => {
                const t = +el.dataset.target
                if (reduced) { el.textContent = t + '+'; return }
                scrambleCounter(el, t)
            })
        }
    }, 150)
})
