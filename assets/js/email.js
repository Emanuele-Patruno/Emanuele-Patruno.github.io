/*==================== CONTACT FORM ====================*/
;(function () {
    const form = document.getElementById('contact-form')
    if (!form) return

    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const companyInput = document.getElementById('company')
    const messageInput = document.getElementById('message')
    const statusEl = document.getElementById('contact-status')
    const button = form.querySelector('button[type="submit"]')
    const buttonLabel = button.querySelector('[data-i18n]')

    const SERVICE_ID = 'service_frpdiio'
    const TEMPLATE_ID = 'template_r4n7jo8'
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    function t(key) {
        const lang = localStorage.getItem('lang') || 'en'
        return window.translations?.[lang]?.[key] ?? window.translations?.en?.[key] ?? key
    }

    function setStatus(key, type) {
        statusEl.textContent = key ? t(key) : ''
        statusEl.classList.remove('contact__status--error', 'contact__status--success')
        if (type) statusEl.classList.add('contact__status--' + type)
    }

    function markInvalid(input, invalid) {
        input.closest('.contact__content').classList.toggle('contact__content--invalid', invalid)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const message = messageInput.value.trim()
        const emailValid = EMAIL_RE.test(email)

        markInvalid(nameInput, !name)
        markInvalid(emailInput, !emailValid)
        markInvalid(messageInput, !message)

        if (!name || !email || !message) {
            setStatus('contact_error_required', 'error')
            return
        }
        if (!emailValid) {
            setStatus('contact_error_email', 'error')
            return
        }

        button.disabled = true
        buttonLabel.textContent = t('contact_sending')
        setStatus(null, null)

        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            name,
            email,
            company: companyInput.value.trim(),
            message,
        }).then(() => {
            form.reset()
            setStatus('contact_success', 'success')
        }).catch(() => {
            setStatus('contact_error_send', 'error')
        }).finally(() => {
            button.disabled = false
            buttonLabel.textContent = t('contact_send')
        })
    })

    // Clear the invalid mark as soon as the user edits the field
    ;[nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => markInvalid(input, false))
    })
})()
