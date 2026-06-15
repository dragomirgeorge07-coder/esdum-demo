/**
 * ESDUM IT Consulting - AI Chatbot Assistant
 * Name: "Bufnița" (The Owl) - Wise, helpful, always watching
 */

(function() {
    'use strict';

    // Knowledge Base
    const KB = {
        greetings: ['salut', 'bună', 'hello', 'hei', 'hi', 'buna ziua', 'buna seara'],
        services: {
            'servere': 'Administrăm servere Windows și Linux cu monitorizare 24/7, backup automatizat și optimizare performanță.',
            'rețele': 'Design, implementare și optimizare rețele Cisco. VLAN-uri, rutare, troubleshooting avansat.',
            'cisco': 'Suntem experți Cisco - configurare switch-uri, routere, firewall-uri și soluții enterprise.',
            'fortigate': 'Implementăm și administrăm firewall FortiGate - VPN, IPS/IDS, filtrare conținut, protecție avansată.',
            'securitate': 'Oferim audit de securitate, penetration testing, implementare politici de securitate și monitorizare amenințări.',
            'ai': 'Implementăm soluții AI pentru automatizare: chatboți inteligenți, procesare documente, analiză predictivă.',
            'llm': 'LLM Local rulează pe serverele tale - 100% GDPR compliant, datele nu părăsesc compania. Modele precum Llama, Mistral.',
            'training': 'Organizăm workshop-uri și training-uri pentru echipele tehnice. AI, securitate, rețelistică, certificări.',
            'backup': 'Soluții complete de backup și disaster recovery. Protecție împotriva ransomware, restaurare rapidă.',
            'cloud': 'Migrare cloud hibrid - AWS, Azure, on-premise. Arhitectură scalabilă și cost-eficientă.',
            'gdpr': 'Toate soluțiile noastre AI sunt 100% GDPR compliant. Datele rămân în România, în infrastructura ta.'
        },
        pricing: {
            'preț': 'Fiecare proiect este personalizat. Oferim consultanță gratuită pentru evaluare. Contactează-ne la contact@esdum.ro sau prin formularul de contact.',
            'cost': 'Costurile variază în funcție de complexitate. Pentru un audit gratuit de AI readiness sau securitate, programează o discuție.',
            'gratis': 'Oferim consultanță inițială gratuită și două tool-uri gratuite: Security Audit Pro și Network Diagnostics Pro pe site.'
        },
        location: {
            'locație': 'Suntem în Ploiești, județul Prahova, România. Acoperim toată zona Muntenia și oferim suport remote național.',
            'ploiesti': 'Da, sediul nostru este în Ploiești. Lucrăm cu companii din Prahova, București și întreaga țară.',
            'contact': 'Ne poți contacta la contact@esdum.ro sau prin formularul de pe site. Program: Luni-Vineri, 09:00-18:00.'
        },
        tools: {
            'audit': 'Tool-ul nostru Security Audit Pro verifică 20+ puncte de securitate: DNS, SSL, email spoofing, headers, subdomenii. Îl găsești în secțiunea Tools.',
            'network': 'Network Diagnostics Pro testează viteza, latența, DNS-ul și oferă informații complete despre conexiunea ta.',
            'test': 'Poți testa gratuit securitatea site-ului tău cu Security Audit Pro sau diagnosticul rețelei cu Network Diagnostics Pro.'
        },
        default: [
            'Îmi pare rău, nu am înțeles exact. Poți reformula? Sunt aici să te ajut cu serviciile IT, AI sau securitate.',
            'Pot să te ajut cu informații despre administrare servere, rețele Cisco, securitate FortiGate sau soluții AI. Ce te interesează?',
            'Bufnița încă învață! Întreabă-mă despre serviciile noastre IT, AI local, securitate sau folosește butoanele de mai jos.'
        ]
    };

    // Conversation memory
    let context = {
        lastTopic: null,
        messageCount: 0,
        userName: null
    };

    function init() {
        createChatWidget();
        loadThemePreference();
    }

    function createChatWidget() {
        const widget = document.createElement('div');
        widget.id = 'esdum-chat-widget';
        widget.innerHTML = `
            <style>
                #esdum-chat-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 9999;
                    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
                }
                
                .chat-bubble {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 2px 8px rgba(0,0,0,0.2);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                }
                
                .chat-bubble:hover {
                    transform: scale(1.1) rotate(-5deg);
                    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.5);
                }
                
                .chat-bubble:active {
                    transform: scale(0.95);
                }
                
                .chat-bubble svg {
                    width: 32px;
                    height: 32px;
                    fill: white;
                }
                
                .chat-bubble .tooltip {
                    position: absolute;
                    right: 70px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #1e293b;
                    color: white;
                    padding: 8px 14px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 500;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                
                .chat-bubble .tooltip::after {
                    content: '';
                    position: absolute;
                    right: -6px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-width: 6px 0 6px 6px;
                    border-style: solid;
                    border-color: transparent transparent transparent #1e293b;
                }
                
                .chat-bubble:hover .tooltip {
                    opacity: 1;
                }
                
                .chat-panel {
                    position: absolute;
                    bottom: 76px;
                    right: 0;
                    width: 380px;
                    max-width: calc(100vw - 48px);
                    height: 560px;
                    max-height: calc(100vh - 120px);
                    background: rgba(30, 41, 59, 0.95);
                    backdrop-filter: blur(20px) saturate(180%);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 24px;
                    box-shadow: 0 24px 80px rgba(0,0,0,0.4);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                    pointer-events: none;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .chat-panel.open {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    pointer-events: all;
                }
                
                @media (max-width: 480px) {
                    .chat-panel {
                        position: fixed;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        width: 100%;
                        max-width: 100%;
                        height: 80vh;
                        max-height: 80vh;
                        border-radius: 24px 24px 0 0;
                    }
                }
                
                .chat-header {
                    padding: 20px 24px;
                    background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2));
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .chat-header-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .chat-header-avatar svg {
                    width: 26px;
                    height: 26px;
                    fill: white;
                }
                
                .chat-header-info {
                    flex: 1;
                }
                
                .chat-header-name {
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                }
                
                .chat-header-status {
                    font-size: 12px;
                    color: #34d399;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .chat-header-status::before {
                    content: '';
                    width: 7px;
                    height: 7px;
                    background: #34d399;
                    border-radius: 50%;
                    animation: pulse-dot 2s infinite;
                }
                
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .chat-header-close {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                    font-size: 18px;
                }
                
                .chat-header-close:hover {
                    background: rgba(255,255,255,0.2);
                }
                
                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .chat-messages::-webkit-scrollbar {
                    width: 4px;
                }
                
                .chat-messages::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 2px;
                }
                
                .message {
                    max-width: 85%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.5;
                    animation: message-in 0.3s ease-out;
                }
                
                @keyframes message-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .message.bot {
                    align-self: flex-start;
                    background: rgba(255,255,255,0.08);
                    color: #e2e8f0;
                    border-bottom-left-radius: 4px;
                }
                
                .message.user {
                    align-self: flex-end;
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                
                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: 16px;
                }
                
                .typing-indicator span {
                    width: 8px;
                    height: 8px;
                    background: rgba(255,255,255,0.5);
                    border-radius: 50%;
                    animation: typing-bounce 1.4s infinite ease-in-out both;
                }
                
                .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
                .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes typing-bounce {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
                
                .quick-replies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 0 24px 12px;
                }
                
                .quick-reply {
                    padding: 8px 16px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    color: #94a3b8;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                
                .quick-reply:hover {
                    background: rgba(99,102,241,0.2);
                    border-color: rgba(99,102,241,0.4);
                    color: #c7d2fe;
                }
                
                .chat-input-area {
                    padding: 16px 24px 20px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    gap: 10px;
                }
                
                .chat-input {
                    flex: 1;
                    padding: 12px 18px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 24px;
                    color: white;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                
                .chat-input::placeholder {
                    color: #64748b;
                }
                
                .chat-input:focus {
                    border-color: rgba(99,102,241,0.5);
                }
                
                .chat-send {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                    flex-shrink: 0;
                }
                
                .chat-send:hover {
                    transform: scale(1.05);
                }
                
                .chat-send:active {
                    transform: scale(0.95);
                }
            </style>
            
            <button class="chat-bubble" id="chatToggle" aria-label="Deschide chat">
                <span class="owl-mascot">🦉</span>
                <span class="tooltip">Bufnița IT</span>
            </button>
            
            <div class="chat-panel" id="chatPanel">
                <div class="chat-header">
                    <div class="chat-header-avatar">
                        <span style="font-size: 24px;">🦉</span>
                    </div>
                    <div class="chat-header-info">
                        <div class="chat-header-name">Bufnița IT</div>
                        <div class="chat-header-status">Online acum</div>
                    </div>
                    <button class="chat-header-close" id="chatClose">×</button>
                </div>
                
                <div class="chat-messages" id="chatMessages"></div>
                
                <div class="quick-replies" id="quickReplies"></div>
                
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chatInput" placeholder="Scrie un mesaj..." autocomplete="off">
                    <button class="chat-send" id="chatSend">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
        
        // Event listeners
        const toggle = document.getElementById('chatToggle');
        const panel = document.getElementById('chatPanel');
        const close = document.getElementById('chatClose');
        const input = document.getElementById('chatInput');
        const send = document.getElementById('chatSend');
        const messages = document.getElementById('chatMessages');
        const quickReplies = document.getElementById('quickReplies');
        
        let isOpen = false;
        
        function toggleChat() {
            isOpen = !isOpen;
            panel.classList.toggle('open', isOpen);
            if (isOpen && context.messageCount === 0) {
                setTimeout(() => showWelcome(), 300);
            }
        }
        
        toggle.addEventListener('click', toggleChat);
        close.addEventListener('click', toggleChat);
        
        send.addEventListener('click', () => {
            const text = input.value.trim();
            if (text) {
                addUserMessage(text);
                input.value = '';
                processMessage(text);
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                send.click();
            }
        });
        
        function addUserMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'message user';
            msg.textContent = text;
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
            context.messageCount++;
        }
        
        function addBotMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'message bot';
            msg.textContent = text;
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        }
        
        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'typing-indicator';
            typing.id = 'typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            messages.appendChild(typing);
            messages.scrollTop = messages.scrollHeight;
        }
        
        function hideTyping() {
            const typing = document.getElementById('typing');
            if (typing) typing.remove();
        }
        
        function showQuickReplies(replies) {
            quickReplies.innerHTML = replies.map(r => 
                `<button class="quick-reply" data-text="${r}">${r}</button>`
            ).join('');
            
            quickReplies.querySelectorAll('.quick-reply').forEach(btn => {
                btn.addEventListener('click', () => {
                    addUserMessage(btn.dataset.text);
                    processMessage(btn.dataset.text);
                });
            });
        }
        
        function showWelcome() {
            const hour = new Date().getHours();
            const greeting = hour < 12 ? 'Bună dimineața' : hour < 18 ? 'Bună ziua' : 'Bună seara';
            
            addBotMessage(`${greeting}! 🦉 Sunt Bufnița IT, asistentul virtual al ESDUM IT Consulting. Cu ce te pot ajuta astăzi?`);
            
            showQuickReplies([
                'Ce servicii oferiți?',
                'Cât costă?',
                'Sunteți din Ploiești?',
                'Vreau un audit de securitate',
                'Ce e AI Local?'
            ]);
        }
        
        function processMessage(text) {
            showTyping();
            hideQuickReplies();
            
            setTimeout(() => {
                hideTyping();
                const response = generateResponse(text.toLowerCase());
                addBotMessage(response.text);
                if (response.replies) {
                    showQuickReplies(response.replies);
                }
            }, 800 + Math.random() * 600);
        }
        
        function hideQuickReplies() {
            quickReplies.innerHTML = '';
        }
        
        function generateResponse(text) {
            // Check greetings
            if (KB.greetings.some(g => text.includes(g))) {
                return {
                    text: 'Salut! 👋 Cu ce te pot ajuta? Întreabă-mă despre serviciile noastre IT, AI, securitate sau folosește butoanele de mai jos.',
                    replies: ['Ce servicii oferiți?', 'Cât costă?', 'Vreau un audit', 'Ce e AI Local?']
                };
            }
            
            // Check services
            for (const [key, value] of Object.entries(KB.services)) {
                if (text.includes(key)) {
                    context.lastTopic = 'services';
                    return {
                        text: value,
                        replies: ['Mai multe detalii', 'Cât costă?', 'Programează o discuție', 'Altceva']
                    };
                }
            }
            
            // Check pricing
            for (const [key, value] of Object.entries(KB.pricing)) {
                if (text.includes(key)) {
                    return {
                        text: value,
                        replies: ['Vreau consultanță gratuită', 'Ce servicii aveți?', 'Cum vă contactez?']
                    };
                }
            }
            
            // Check location/contact
            for (const [key, value] of Object.entries(KB.location)) {
                if (text.includes(key)) {
                    return {
                        text: value,
                        replies: ['Programare discuție', 'Ce servicii aveți?', 'Mulțumesc!']
                    };
                }
            }
            
            // Check tools
            for (const [key, value] of Object.entries(KB.tools)) {
                if (text.includes(key)) {
                    return {
                        text: value,
                        replies: ['Începe auditul', 'Network diagnostics', 'Mai multe servicii']
                    };
                }
            }
            
            // Context-based follow-ups
            if (context.lastTopic === 'services' && (text.includes('mai mult') || text.includes('detalii'))) {
                return {
                    text: 'Oferim administrare servere Windows/Linux, rețele Cisco, securitate FortiGate, implementare AI local (GDPR compliant), training și workshop-uri. Fiecare soluție este personalizată pentru nevoile afacerii tale.',
                    replies: ['Vreau o ofertă', 'Cum funcționează AI Local?', 'Contact']
                };
            }
            
            if (text.includes('programeaz') || text.includes('discuție') || text.includes('contact')) {
                return {
                    text: 'Perfect! 🗓️ Trimite-ne un email la contact@esdum.ro sau folosește formularul de contact de pe site. Programăm o discuție de 30 minute, gratuită, fără obligații.',
                    replies: ['Ce servicii aveți?', 'Cât costă?', 'Mulțumesc!']
                };
            }
            
            if (text.includes('mulțumesc') || text.includes('mersi') || text.includes('thanks')) {
                return {
                    text: 'Cu plăcere! 🦉 Dacă mai ai întrebări, sunt aici. Sau programează o consultanță gratuită — ne-ar plăcea să discutăm despre proiectul tău!',
                    replies: ['Programează discuție', 'Ce servicii aveți?', 'La revedere']
                };
            }
            
            // Default
            const defaults = KB.default;
            return {
                text: defaults[Math.floor(Math.random() * defaults.length)],
                replies: ['Servicii IT', 'AI Local', 'Securitate', 'Contact']
            };
        }
    }
    
    function loadThemePreference() {
        // Placeholder for theme sync with main site
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
